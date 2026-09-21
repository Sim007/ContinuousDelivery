# ContinuousDelivery

De site: https://sim007.github.io/ContinuousDelivery/

Markdown is de bron. De site wordt er automatisch van gemaakt, met
[Astro](https://astro.build) en [Starlight](https://starlight.astro.build).

Licentie: de tekst [CC BY 4.0](LICENSE-docs), de code [MIT](LICENSE) — zie onderaan.

## Bewerken

- De tekst staat in `src/content/docs/`, één markdown-bestand per pagina.
- Elke pagina begint met een frontmatter-blok met de titel:
  ```
  ---
  title: "Het model"
  ---
  ```
- Push naar `main` en de site staat vanzelf live.
- Nieuwe pagina: een bestand in `src/content/docs/` en een regel onder `sidebar`
  in `astro.config.ts`.
- Links naar een andere pagina schrijf je naar het bestand — `model.md`,
  `../model.md` — net als voorheen. Afbeeldingen staan in `public/` en beginnen
  met een schuine streep: `![De assen](/assen.svg)`.

## De schuiven

Regels in deze vorm worden als schuif getekend:

```
- **Naam:** pool — pool → *opinie* · soort      randvoorwaarde
- **pool — pool** → *opinie* (soort)            startingpoint
```

Soort: `knock-out`, `profiel` of `en`. Opinie `vormend` betekent geen opinie. Wijkt een regel af van deze vorm, dan wordt hij gewone tekst. Staat er een soort die niet bestaat, dan waarschuwt de build en wordt de schuif als gewone opinie getekend.

Dit gebeurt in [`src/plugins/schuiven.ts`](src/plugins/schuiven.ts).

## Engels

Zet een bestand onder `src/content/docs/en/` op dezelfde plek als de Nederlandse
pagina. Ontbreekt die, dan toont de Engelse site de Nederlandse tekst.

De namen in het menu vertaal je bij `sidebar` in `astro.config.ts`, met
`translations`.

## Lokaal bekijken

```
npm install
npm run dev
```

`npm run build` bouwt de site naar `dist/`, `npm run check` controleert de types.

## Eigen domein, later

Een bestand `public/CNAME` met de domeinnaam, de DNS-instelling bij je provider,
en in `astro.config.ts` de `site` aanpassen naar het nieuwe adres. Staat de site
dan in de hoofdmap van dat domein, dan kan `base` weg.

## Versies

Node 24. De versies staan vast in `package-lock.json`; de workflow installeert met
`npm ci`, zodat de build reproduceerbaar is.

## Licentie

De tekst en de code hebben elk hun eigen licentie.

- Alles in `src/content/docs/` en `public/` — het model, de scenario's, de teksten
  en de afbeeldingen — staat onder [CC BY 4.0](LICENSE-docs). Hergebruiken,
  bewerken en verspreiden mag, ook commercieel, mits met naamsvermelding.
- De code — `src/plugins/`, `src/components/`, `src/styles/`, `.github/`,
  `astro.config.ts` — staat onder [MIT](LICENSE).

Naamsvermelding, bijvoorbeeld: Johannes Sim, *Continuous delivery*,
https://sim007.github.io/ContinuousDelivery/, CC BY 4.0.
