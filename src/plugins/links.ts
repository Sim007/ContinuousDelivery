/**
 * Zet links naar markdownbestanden om in adressen op de site.
 *
 * In de markdown blijf je schrijven naar het bestand — `model.md`,
 * `../model.md`, `scenarios/index.md` — precies zoals in MkDocs. Deze plugin
 * maakt daar `/ContinuousDelivery/model/` van, zodat de link ook klopt vanaf
 * een pagina die een map dieper staat.
 */
import path from "node:path";
import type { Root } from "mdast";
import type { Plugin } from "unified";
import type { VFile } from "vfile";
import { visit } from "unist-util-visit";

interface Opties {
  /** Het pad waaronder de site staat, bijvoorbeeld "/ContinuousDelivery". */
  base: string;
}

const DOCS = path.join("src", "content", "docs");

/** De map van de huidige pagina binnen de docs, bijvoorbeeld "scenarios". */
function mapVan(file: VFile): string | null {
  const pad = file.path ?? file.history.at(-1);
  if (!pad) return null;
  const i = pad.lastIndexOf(DOCS);
  if (i === -1) return null;
  return path.posix.dirname(pad.slice(i + DOCS.length + 1));
}

export function remarkLinks({ base }: Opties): ReturnType<Plugin<[Opties], Root>> {
  const schoon = base.replace(/\/$/, "");

  return (tree: Root, file: VFile) => {
    const map = mapVan(file);
    if (map === null) return;

    visit(tree, "link", (node) => {
      const [doel, anker] = node.url.split("#");
      if (!doel?.endsWith(".md")) return;
      if (/^[a-z]+:/i.test(doel)) return;

      let slug = path.posix.normalize(path.posix.join(map, doel)).replace(/\.md$/, "");
      slug = slug.replace(/(^|\/)index$/, "");
      slug = slug.replace(/^\.\//, "").replace(/^\/+/, "");

      node.url = `${schoon}/${slug}${slug ? "/" : ""}${anker ? `#${anker}` : ""}`;
    });

    // Afbeeldingen staan in public/ en beginnen met een /; de base komt ervoor.
    visit(tree, "image", (node) => {
      if (!node.url.startsWith("/") || node.url.startsWith("//")) return;
      if (node.url.startsWith(`${schoon}/`)) return;
      node.url = `${schoon}${node.url}`;
    });
  };
}
