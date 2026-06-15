# Repo generator

This repository contains a web-app which generates different files that are needed for a healthy and accessible repository.

URL: https://developer-overheid-nl.github.io/repo-docs-generator/

## Development

Prepare your local environment:

- Install project dependencies: `pnpm install`
- Install VSCode extensions: Prettier, ESLint, Tailwind CSS IntelliSense
- Set VSCode default formatter to `esbenp.prettier-vscode`

Start the development server:

```bash
pnpm run dev
```

## CLI

Naast de web-app kun je de documenten ook vanaf de command line genereren op
basis van een input-JSON-bestand. De CLI gebruikt dezelfde templates en
validatie als de web-app.

> Vereist Node 24 (`nvm use 24`), zodat het TypeScript-bestand direct uitgevoerd
> kan worden.

```bash
# Genereer alle documenten op basis van een input-bestand
pnpm generate input.json

# Naar een specifieke output-map
pnpm generate input.json -o ./generated

# Alleen een subset van documenten
pnpm generate input.json -t README.md -t SECURITY.md
```

Opties:

| Optie | Omschrijving |
| --- | --- |
| `-o, --out <dir>` | Output-map (default: `output`) |
| `-t, --template <name>` | Genereer alleen het opgegeven template (herhaalbaar) |
| `--ref <branch>` | Branch/ref van de template-repository (default: `main`) |
| `--skip-validation` | Sla de schema-validatie van de input over |
| `-l, --list` | Toon de beschikbare templates |
| `-h, --help` | Toon de helptekst |

Het input-bestand wordt gevalideerd tegen `input_json_schema.json`. Zie
`src/inputExample.json` voor een voorbeeld.
