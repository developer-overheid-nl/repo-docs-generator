# Repo generator

Genereer de bestanden die nodig zijn voor een gezonde, toegankelijke en open
source repository: `README.md`, `LICENSE`, `SECURITY.md`, `CODE_OF_CONDUCT.md`,
`CONTRIBUTING.md`, `CHANGELOG.md`, `publiccode.yml` en meer.

## Drie tools in één repository

Dit project bevat **drie tools**. Ze gebruiken alle drie dezelfde
[templates](./templates) en dezelfde validatie, dus de uitkomst is gelijk,
welke je ook kiest.

| # | Tool | Voor wie | Hoe gebruik je het |
| --- | --- | --- | --- |
| 1 | [**Web-UI**](#1-web-ui) | Mensen die een formulier willen invullen in de browser | <https://developer-overheid-nl.github.io/repo-docs-generator/> |
| 2 | [**CLI**](#2-cli) | Ontwikkelaars en CI-pipelines | `npx github:developer-overheid-nl/repo-docs-generator input.json` |
| 3 | [**Agent Skill**](#3-agent-skill) | AI-assistenten (Claude Code, Cursor, …) | `claude plugin install developer-overheid-open-source-repo@overheid-plugins` |

```text
            templates/  +  input_json_schema.json
                         │
      ┌──────────────────┼──────────────────┐
      ▼                  ▼                  ▼
  1. Web-UI           2. CLI  ◄──────  3. Agent Skill
  (browser)       (command line)     (roept de CLI aan)
```

---

## 1. Web-UI

Een web-app waarin je via een formulier de gegevens van je project invult en
de bestanden direct downloadt.

**URL:** <https://developer-overheid-nl.github.io/repo-docs-generator/>

De broncode staat in [`src/`](./src). Zie [Development](#development) om de
web-app lokaal te draaien.

---

## 2. CLI

Genereer de documenten vanaf de command line op basis van een
input-JSON-bestand. De CLI gebruikt dezelfde templates en validatie als de
web-UI. De broncode staat in [`src/cli.ts`](./src/cli.ts).

### Via npx (zonder clonen)

Je kunt de generator direct vanaf GitHub draaien met `npx`:

```bash
# Genereer eerst een voorbeeld input.json om als startpunt te gebruiken
npx github:developer-overheid-nl/repo-docs-generator --init

npx github:developer-overheid-nl/repo-docs-generator input.json -o ./generated
```

Dit werkt op elke Node-versie (>= 18): npm haalt de repo op, bouwt de CLI
(`prepare`-script) en voert hem uit.

### Lokaal (vanuit deze repo)

```bash
# Genereer alle documenten op basis van een input-bestand
pnpm generate input.json

# Naar een specifieke output-map
pnpm generate input.json -o ./generated

# Alleen een subset van documenten
pnpm generate input.json -t README.md -t SECURITY.md
```

> De `pnpm generate`-variant draait het TypeScript-bestand rechtstreeks en
> vereist Node 24 (`nvm use 24`). De npx-variant bouwt eerst een bundel en
> heeft die eis niet.

### Opties

| Optie | Omschrijving |
| --- | --- |
| `-o, --out <dir>` | Output-map (default: `output`) |
| `-t, --template <name>` | Genereer alleen het opgegeven template (herhaalbaar) |
| `--skip-validation` | Sla de schema-validatie van de input over |
| `--init` | Schrijf een voorbeeld input-bestand weg (default `input.json`) |
| `--force` | Overschrijf een bestaand bestand bij gebruik van `--init` |
| `-l, --list` | Toon de beschikbare templates |
| `-h, --help` | Toon de helptekst |

Het input-bestand wordt gevalideerd tegen `input_json_schema.json`. Gebruik
`--init` om een voorbeeldbestand te genereren, of bekijk `src/inputExample.json`.

---

## 3. Agent Skill

Een Agent Skill waarmee een AI-assistent een repository klaar kan maken voor
open source. De skill leest het project uit, vult `input.json` en draait de
[CLI](#2-cli); het formaat van de bestanden blijft daarmee volledig bepaald
door de templates in deze repo.

Installeren via de marketplace van developer.overheid.nl:

```bash
claude plugin marketplace add developer-overheid-nl/skills-marketplace
claude plugin install developer-overheid-open-source-repo@overheid-plugins
```

De skill zelf staat in [`skills/open-source-repo/`](./skills/open-source-repo).

Het plugin-manifest staat in drie varianten: `.plugin/plugin.json` is de bron van
waarheid, `.claude-plugin/plugin.json` en `.cursor-plugin/plugin.json` zijn daarvan
afgeleid (Cursor vraagt een extra `displayName`). Werk je de versie of beschrijving
bij, pas dan alle drie aan; de marketplace controleert of ze bestaan.

---

## Templates

De gegenereerde bestanden zijn gebaseerd op de templates in de
[`templates/`](./templates) map van deze repository. Een wijziging in een
template geldt direct voor alle drie de tools.

## Development

Prepare your local environment:

- Install project dependencies: `pnpm install`
- Install VSCode extensions: Prettier, ESLint, Tailwind CSS IntelliSense
- Set VSCode default formatter to `esbenp.prettier-vscode`

Start the development server:

```bash
pnpm run dev
```
