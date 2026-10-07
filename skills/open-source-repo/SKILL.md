---
name: open-source-repo
description: >-
  Maak een repository klaar voor open source: genereer README, LICENSE,
  SECURITY.md, CODE_OF_CONDUCT.md, CONTRIBUTING.md, CHANGELOG.md en
  publiccode.yml met de repo-docs-generator CLI. Gebruik deze skill wanneer de
  gebruiker een repository open source wil publiceren, ontbrekende bestanden wil
  toevoegen, een publiccode.yml wil aanmaken of bijwerken, of een project wil
  klaarmaken voor publieke bijdragen. Voorbeelden: "maak dit project open
  source", "open source checklist", "publiccode.yml genereren", "voeg een
  SECURITY.md toe", "voeg een licentie toe", "Standard for Public Code".
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash(gh api *)
  - Bash(gh repo view *)
  - Bash(git *)
  - Bash(npx *)
  - Bash(curl *)
  - Bash(find *)
  - WebFetch(*)
  - AskUserQuestion
---

# Maak een repository klaar voor open source

Deze skill hoort bij de `repo-docs-generator` in deze repository. De generator
is de bron van waarheid voor het formaat van de bestanden: de templates in
[`templates/`](../../templates) bepalen hoe ze eruitzien, en
[`input_json_schema.json`](../../input_json_schema.json) bepaalt welke velden
er bestaan.

**Schrijf de bestanden dus niet zelf.** Jouw taak is het `input.json` vullen met
informatie uit de repository en daarna de CLI draaien. Dat scheelt niet alleen
werk, het voorkomt ook dat een met de hand geschreven `publiccode.yml` afwijkt
van wat de officiële tool oplevert.

## Stap 1: maak een voorbeeld-input

```bash
npx github:developer-overheid-nl/repo-docs-generator --init
```

Dit schrijft `input.json` met alle velden die het schema kent. Lees het bestand
en gebruik het als checklist voor wat je moet uitzoeken.

## Stap 2: vul het in met informatie uit het project

Zoek de volgende bestanden op en lees ze uit:

- `README.md` voor de naam, korte en lange beschrijving, en het doel
- `package.json` / `pom.xml` / `pyproject.toml` / `Cargo.toml` / `go.mod` voor
  naam, versie en licentie
- een `openapi.json` of `openapi.yaml`, als die er is, voor de beschrijving van
  de API
- een bestaande `publiccode.yml`: werk die bij in plaats van hem te overschrijven
- de git-remote voor de `url`

Vul aan via de remote:

- `maintenance.contacts[].name` en `legal.mainCopyrightOwner`: gebruik de
  weergavenaam van de organisatie zoals die op de GitHub-organisatiepagina
  staat (`https://github.com/<org>`), niet de slug uit de URL
- `landingURL`: zoek een live URL waar de software draait (in de README, in
  CI/CD-configuratie, of in GitHub Pages-instellingen). Gebruik die URL **niet**
  voor de `longDescription`

Bepaal `softwareType` in deze volgorde:

1. Bevat het project een plugin-manifest (`plugin.json`, `.claude-plugin/`,
   `.vscode/`) of is het expliciet een extensie voor een andere applicatie?
   `addon`
2. Bestaat het uitsluitend uit configuratiebestanden zonder uitvoerbare code?
   `configurationFiles`
3. Is het een herbruikbare library zonder UI of entrypoint? `library`
4. Heeft het een webinterface? `standalone/web`

Voor `legal.license`: bepaal de SPDX-identifier van de licentie die er al is.
Is er geen licentie, gebruik dan `EUPL-1.2`. De generator schrijft de volledige
licentietekst, dus maak zelf geen `LICENSE` aan.

Vraag de gebruiker om input als je een verplicht veld niet uit de repository
kunt halen. Het `securityEmail` voor `SECURITY.md` is daarvan het duidelijkste
voorbeeld: dat staat zelden in de code.

## Stap 3: genereer de bestanden

```bash
npx github:developer-overheid-nl/repo-docs-generator input.json -o ./generated
```

De CLI valideert `input.json` tegen het schema en stopt bij een fout. Los de
fout op in `input.json` en draai opnieuw; gebruik `--skip-validation` niet om
een melding te omzeilen.

Wil je maar één bestand, gebruik dan `-t`:

```bash
npx github:developer-overheid-nl/repo-docs-generator input.json -t publiccode.yml
```

Vergelijk het resultaat met wat er al in de repository staat voordat je iets
overschrijft, en leg de gegenereerde bestanden daarna op hun plek in de root.

## Referenties

- [publiccode.yml schemadocumentatie](https://yml.publiccode.tools/schema.core.html)
- [Categorielijst](https://yml.publiccode.tools/categories-list.html)
- [SPDX licentie-identifiers](https://spdx.org/licenses/)
- [Standard for Public Code](https://standard.publiccode.net/)
