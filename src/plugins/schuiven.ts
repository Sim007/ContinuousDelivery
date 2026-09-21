/**
 * Tekent de assen als schuiven.
 *
 * Regels in de markdown in deze vorm worden een schuif:
 *   - **Naam:** pool — pool → *opinie* · soort      (randvoorwaarde)
 *   - **pool — pool** → *opinie* (soort)            (startingpoint)
 * Soort: knock-out, profiel, en. Opinie "vormend" = geen opinie.
 * Op een pagina met schuiven wordt de afbeelding assen.svg vervangen door de legenda.
 */
import type { Html, List, ListItem, Root, RootContent } from "mdast";
import type { Plugin } from "unified";
import type { VFile } from "vfile";
import { SKIP, visit } from "unist-util-visit";

const RAND =
  /^- \*\*(?<naam>[^:*]+):\*\* (?<l>.+?) — (?<r>.+?) → \*(?<op>.+?)\*(?: · (?<tag>.+))?$/;
const START =
  /^- \*\*(?<l>[^*]+?) — (?<r>[^*]+?)\*\* → \*(?<op>.+?)\*(?: \((?<tag>.+)\))?$/;

/** De soorten die een eigen tekening krijgen. Al het andere komt als tekst achter de opinie. */
const SOORTEN = ["knock-out", "profiel", "en"] as const;
type Soort = (typeof SOORTEN)[number];

const isSoort = (t: string): t is Soort => (SOORTEN as readonly string[]).includes(t);

interface Velden {
  l: string;
  r: string;
  op: string;
  tag?: string;
  naam?: string;
}

const LEGENDA =
  '<div class="legenda"><span><i class="fader"></i>mijn opinie</span>' +
  '<span><i class="fader open"></i>per laag anders</span>' +
  '<span><i class="streep"></i>vormend, geen opinie</span>' +
  '<span class="en">en staat in het midden: beide, geen compromis</span></div>';

function e(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function schuif({ l, r, op, tag, naam }: Velden): string {
  const soort = (tag ?? "").trim();
  let spoor: string;
  let onder: string;

  if (op.trim() === "vormend") {
    spoor = '<div class="spoor vormend"></div>';
    onder = "vormend, geen opinie";
  } else if (soort === "profiel") {
    spoor =
      '<div class="spoor">' +
      [20, 55, 90]
        .map((p) => `<span class="fader open" style="left:${p}%"></span>`)
        .join("") +
      "</div>";
    onder = `profiel: ${e(op)}`;
  } else if (soort === "en") {
    spoor = '<div class="spoor"><span class="fader" style="left:50%"></span></div>';
    onder = `en: ${e(op)}`;
  } else {
    spoor = '<div class="spoor"><span class="fader" style="left:100%"></span></div>';
    onder = e(op) + (soort ? `, ${e(soort)}` : "");
  }

  const klasse = soort === "en" ? "onder en" : "onder";
  const kop = naam ? `<div class="asnaam">${e(naam)}</div>` : "";
  return (
    `<div class="as">${kop}<div class="polen"><span>${e(l)}</span><span>${e(r)}</span></div>` +
    `${spoor}<span class="${klasse}">${onder}</span></div>`
  );
}

/** De brontekst van één lijstregel, zodat dezelfde patronen werken als op de markdown zelf. */
function bron(item: ListItem, file: VFile): string {
  const { start, end } = item.position ?? {};
  if (start?.offset === undefined || end?.offset === undefined) return "";
  return String(file.value).slice(start.offset, end.offset).trimEnd();
}

function lees(item: ListItem, file: VFile): Velden | null {
  const regel = bron(item, file);
  const m = RAND.exec(regel) ?? START.exec(regel);
  if (!m?.groups) return null;
  const { naam, l, r, op, tag } = m.groups;
  if (!l || !r || !op) return null;

  const soort = (tag ?? "").trim();
  if (soort && !isSoort(soort) && op.trim() !== "vormend") {
    file.message(
      `Onbekende soort "${soort}" — verwacht ${SOORTEN.join(", ")}. De schuif wordt als gewone opinie getekend.`,
      item,
    );
  }
  return { naam, l, r, op, tag };
}

type Reeks =
  | { soort: "schuiven"; velden: Velden[] }
  | { soort: "tekst"; items: ListItem[] };

/** Splitst een lijst in aaneengesloten stukken schuiven en stukken gewone lijst. */
function reeksen(list: List, file: VFile): Reeks[] {
  const uit: Reeks[] = [];
  for (const item of list.children) {
    const velden = lees(item, file);
    const laatste = uit.at(-1);
    if (velden) {
      if (laatste?.soort === "schuiven") laatste.velden.push(velden);
      else uit.push({ soort: "schuiven", velden: [velden] });
    } else {
      if (laatste?.soort === "tekst") laatste.items.push(item);
      else uit.push({ soort: "tekst", items: [item] });
    }
  }
  return uit;
}

export function remarkSchuiven(): ReturnType<Plugin<[], Root>> {
  return (tree: Root, file: VFile) => {
    let getekend = false;

    visit(tree, "list", (list: List, index, parent) => {
      if (!parent || index === undefined) return;
      const delen = reeksen(list, file);
      if (!delen.some((d) => d.soort === "schuiven")) return;
      getekend = true;

      const nieuw: RootContent[] = delen.map((deel) =>
        deel.soort === "schuiven"
          ? ({
              type: "html",
              value: `<div class="assen">${deel.velden.map(schuif).join("")}</div>`,
            } satisfies Html)
          : ({ ...list, children: deel.items } satisfies List),
      );

      parent.children.splice(index, 1, ...nieuw);
      return [SKIP, index + nieuw.length];
    });

    if (!getekend) return;

    // Op een pagina met schuiven is de legenda informatiever dan de afbeelding.
    visit(tree, "paragraph", (node, index, parent) => {
      if (!parent || index === undefined) return;
      const kind = node.children[0];
      if (node.children.length !== 1 || kind?.type !== "image") return;
      if (!/(^|\/)assen\.svg$/.test(kind.url)) return;
      parent.children.splice(index, 1, { type: "html", value: LEGENDA } satisfies Html);
      return [SKIP, index + 1];
    });
  };
}
