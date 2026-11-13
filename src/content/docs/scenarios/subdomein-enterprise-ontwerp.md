---
title: "Ontwerp showcase subdomein binnen enterprise"
---

*Concept. Just enough design: alleen wat duur is om later te veranderen. De rest leren we gaandeweg.*

Hoort bij het scenario [Subdomein binnen enterprise met maatwerksoftware](subdomein-enterprise.md).

## Wat ontwerpen we vooraf, wat niet

Vooraf, omdat het later duur is om te veranderen:
- Naamgeving: organisatie, repositories, teams, services.
- De indeling in deelsystemen en wie eigenaar is.
- Hoe deelsystemen integreren.

Niet vooraf, dat leren we gaandeweg:
- Services binnen een deelsysteem.
- Inhoud van de contracten.
- Tools en techniek binnen de standaard stack.

## Het domein

*Open.* Welke taak voert het subdomein uit, voor welke gebruiker?

Eisen aan het domein:
- Herkenbaar, zonder uitleg te begrijpen.
- Klein genoeg voor een showcase, groot genoeg voor meer dan één deelsysteem.
- Er is iets uit wet of norm dat de pipeline kan afdwingen.

## Deelsystemen en squads

*Open.* Een context map: welke deelsystemen, wat doen ze, wie levert wat aan wie.

| Deelsysteem | Verantwoordelijkheid | Squad | Levert aan |
|---|---|---|---|
| *nog te bepalen* | | | |

Minimaal twee deelsystemen, want de showcase laat de standaard stack en pipeline zien voor meer dan één deelsysteem.

Eén deelsysteem wordt gebouwd door een andere squad, met een eigen Claude Code-abonnement.

## Naamgeving

*Open.* Een patroon, geen losse namen.

- **Product:** Full Circle Delivery (FCD).
- **Organisatie op GitHub:** *nog te bepalen.*
- **Tribe-repository:** *nog te bepalen.*
- **Repository per deelsysteem:** *patroon nog te bepalen.*
- **Team per squad:** *patroon nog te bepalen.*
- **Service binnen een deelsysteem:** *patroon nog te bepalen.*

## Repositories en eigenaarschap

*Voorstel.*

- Een eigen GitHub-organisatie. Daarin squads als teams.
- Deze repository wordt de tribe-repository: verhaal, model, scenario's, ontwerp, contracten, integratie. Verhuizen naar de organisatie, niet opnieuw beginnen.
- Eén repository per deelsysteem. Services zijn mappen daarin.
- Geen git submodules. Deelsystemen verwijzen niet naar elkaars code.
- Een squad heeft schrijfrechten op het eigen deelsysteem en leesrechten op de rest.

## Integratie

*Voorstel.*

- Contracten staan in de tribe-repository. Een wijziging is een pull request, beide squads keuren goed.
- Consumer-driven: de consumer legt vast wat hij verwacht, de provider test daarop in de eigen pipeline.
- Elke squad levert geversioneerde artefacten. Niemand bouwt de code van een andere squad.
- De tribe-repository start de vrijgegeven versies samen en controleert het geheel.

## Werken met Claude Code

*Voorstel.*

- Wat een sessie moet weten, staat in de repositories. Niet in een gesprek.
- Elk deelsysteem heeft een `CLAUDE.md`: doel, contracten, verwijzing naar de afspraken van de tribe.
- Verhaal, artikelen en presentaties staan bij de bron, in de tribe-repository.

## Beslissingen

*Elke beslissing kort: wat, waarom, wat het kost.*

| # | Beslissing | Status |
|---|---|---|
| 1 | Polyrepo: één repository per deelsysteem | voorstel |
| 2 | Geen git submodules | voorstel |
| 3 | Deze repository wordt de tribe-repository | voorstel |
| 4 | Integratie via contracten en geversioneerde artefacten | voorstel |
| 5 | Documentatie, artikelen en presentaties bij de bron | voorstel |

## Bewust nog niet besloten

- Monorepo of polyrepo binnen een deelsysteem met veel services.
- Waar de contracten technisch staan: map in de tribe-repository of een broker.
- Standaard stack en pipeline in detail.

## Open punten

- Domein kiezen.
- Deelsystemen en squads bepalen.
- Naamgevingspatroon kiezen.
- Beslissingen 1 tot en met 5 bevestigen.
