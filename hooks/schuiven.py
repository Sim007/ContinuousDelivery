"""Tekent de assen als schuiven.

Regels in de markdown in deze vorm worden een schuif:
  - **Naam:** pool — pool → *opinie* · soort      (randvoorwaarde)
  - **pool — pool** → *opinie* (soort)            (startingpoint)
Soort: knock-out, profiel, en. Opinie "vormend" = geen opinie.
Op een pagina met schuiven wordt de afbeelding assen.svg vervangen door de legenda.
"""
import html
import re

RAND = re.compile(r"^- \*\*(?P<naam>[^:*]+):\*\* (?P<l>.+?) — (?P<r>.+?) → \*(?P<op>.+?)\*(?: · (?P<tag>.+))?$")
START = re.compile(r"^- \*\*(?P<l>[^*]+?) — (?P<r>[^*]+?)\*\* → \*(?P<op>.+?)\*(?: \((?P<tag>.+)\))?$")
LIJST = re.compile(r"^(- |\d+\. )")
AFBEELDING = re.compile(r"^!\[[^\]]*\]\(assen\.svg\)\s*$", re.M)

LEGENDA = ('<div class="legenda"><span><i class="fader"></i>mijn opinie</span>'
           '<span><i class="fader open"></i>per laag anders</span>'
           '<span><i class="streep"></i>vormend, geen opinie</span>'
           '<span class="en">en staat in het midden: beide, geen compromis</span></div>')


def schuif(l, r, op, tag, naam=None):
    e = html.escape
    tag = (tag or "").strip()
    if op.strip() == "vormend":
        spoor, onder = '<div class="spoor vormend"></div>', "vormend, geen opinie"
    elif tag == "profiel":
        spoor = '<div class="spoor">' + "".join(
            f'<span class="fader open" style="left:{p}%"></span>' for p in (20, 55, 90)) + "</div>"
        onder = f"profiel: {e(op)}"
    elif tag == "en":
        spoor = '<div class="spoor"><span class="fader" style="left:50%"></span></div>'
        onder = f"en: {e(op)}"
    else:
        spoor = '<div class="spoor"><span class="fader" style="left:100%"></span></div>'
        onder = e(op) + (f", {e(tag)}" if tag else "")
    klasse = "onder en" if tag == "en" else "onder"
    kop = f'<div class="asnaam">{e(naam)}</div>' if naam else ""
    return (f'<div class="as">{kop}<div class="polen"><span>{e(l)}</span><span>{e(r)}</span></div>'
            f'{spoor}<span class="{klasse}">{onder}</span></div>')


def on_page_markdown(markdown, page, config, files):
    regels, uit, blok = markdown.split("\n"), [], []

    def sluit():
        if blok:
            uit.extend(["", '<div class="assen">' + "".join(blok) + "</div>", ""])
            blok.clear()

    for regel in regels:
        m, n = RAND.match(regel), START.match(regel)
        if m:
            blok.append(schuif(m["l"], m["r"], m["op"], m["tag"], m["naam"]))
            continue
        if n:
            blok.append(schuif(n["l"], n["r"], n["op"], n["tag"]))
            continue
        sluit()
        vorige = uit[-1] if uit else ""
        if LIJST.match(regel) and vorige.strip() and not re.match(r"^(- |\d+\. |\s)", vorige):
            uit.append("")
        uit.append(regel)
    sluit()
    tekst = "\n".join(uit)
    if 'class="as"' in tekst:
        tekst = AFBEELDING.sub(LEGENDA, tekst)
    return tekst
