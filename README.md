# ContinuousDelivery

De site: https://sim007.github.io/ContinuousDelivery/

Markdown is de bron. De site wordt er automatisch van gemaakt.

Licentie: [MIT](LICENSE).

## Bewerken

- De tekst staat in `docs/`, één markdown-bestand per pagina.
- Push naar `main` en de site staat vanzelf live.
- Nieuwe pagina: een bestand in `docs/` en een regel onder `nav` in `mkdocs.yml`.

## De schuiven

Regels in deze vorm worden als schuif getekend:

```
- **Naam:** pool — pool → *opinie* · soort      randvoorwaarde
- **pool — pool** → *opinie* (soort)            startingpoint
```

Soort: `knock-out`, `profiel` of `en`. Opinie `vormend` betekent geen opinie. Wijkt een regel af van deze vorm, dan wordt hij gewone tekst.

## Engels

Zet naast `pagina.md` een `pagina.en.md`. Ontbreekt die, dan toont de Engelse site de Nederlandse tekst.

## Eerste keer publiceren

1. Maak op GitHub een lege, publieke repository `ContinuousDelivery` — zonder README of .gitignore.
2. In deze map, in de terminal:
   ```
   git init
   git add .
   git commit -m "Eerste versie"
   git branch -M main
   git remote add origin https://github.com/Sim007/ContinuousDelivery.git
   git push -u origin main
   ```
3. Kies in de repository bij Settings → Pages als bron: GitHub Actions.
4. Actions → Publiceer site → Run workflow.

## Lokaal bekijken

```
pip install -r requirements.txt
mkdocs serve
```

## Eigen domein, later

Een bestand `docs/CNAME` met de domeinnaam, de DNS-instelling bij je provider, en `site_url` in `mkdocs.yml` aanpassen naar het nieuwe adres.

## Versies

De versies in `requirements.txt` staan bewust vast. MkDocs 2.0 is niet uitwisselbaar met de huidige plugins; niet zomaar upgraden.
