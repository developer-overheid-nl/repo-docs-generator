#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import parseOutput from './populateOutputFile.ts';
import templates from './templates.ts';
import schema from '../input_json_schema.json' with { type: 'json' };
import inputExample from './inputExample.json' with { type: 'json' };

const HELP = `Repository Docs Generator - CLI

Generates the OSS repository documents (${templates.join(', ')})
from a single input JSON file.

Usage:
  generate <input.json> [options]
  generate --init [input.json]

Options:
  -o, --out <dir>        Output directory (default: "output")
  -t, --template <name>  Only generate the given template (repeatable).
                         Defaults to all templates.
      --skip-validation  Do not validate the input against the JSON schema
      --init             Write an example input JSON file and exit
      --force            Overwrite an existing file when used with --init
  -l, --list             List the available templates and exit
  -h, --help             Show this help and exit

Examples:
  generate input.json
  generate input.json -o ./generated
  generate input.json -t README.md -t SECURITY.md
  generate --init
  generate --init my-input.json
`;

const fail = (message: string): never => {
  console.error(`Error: ${message}`);
  process.exit(1);
};

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    out: { type: 'string', short: 'o', default: 'output' },
    template: { type: 'string', short: 't', multiple: true },
    'skip-validation': { type: 'boolean', default: false },
    init: { type: 'boolean', default: false },
    force: { type: 'boolean', default: false },
    list: { type: 'boolean', short: 'l', default: false },
    help: { type: 'boolean', short: 'h', default: false },
  },
});

if (values.help) {
  console.log(HELP);
  process.exit(0);
}

if (values.list) {
  console.log(templates.join('\n'));
  process.exit(0);
}

if (values.init) {
  const target = resolve(positionals[0] ?? 'input.json');
  if (!values.force) {
    const exists = await readFile(target)
      .then(() => true)
      .catch(() => false);
    if (exists) {
      fail(`${target} already exists. Use --force to overwrite.`);
    }
  }
  await writeFile(target, `${JSON.stringify(inputExample, undefined, 2)}\n`, 'utf8');
  console.log(`✓ Example input.json written to ${target}`);
  process.exit(0);
}

const inputPath = positionals[0];
if (!inputPath) {
  fail('no input JSON file provided. Run with --help for usage.');
}

// Determine which templates to generate.
const requested = values.template ?? [];
const unknown = requested.filter((name) => !templates.includes(name));
if (unknown.length > 0) {
  fail(
    `unknown template(s): ${unknown.join(', ')}. Available: ${templates.join(', ')}`,
  );
}
const selected = requested.length > 0 ? requested : templates;

// Read and parse the input.
let inputJson: string;
try {
  inputJson = await readFile(resolve(inputPath as string), 'utf8');
} catch {
  fail(`could not read input file: ${inputPath}`);
}

let parsedInput: unknown;
try {
  parsedInput = JSON.parse(inputJson!);
} catch (err) {
  fail(`input is not valid JSON: ${err instanceof Error ? err.message : err}`);
}

// Validate against the shared input schema (unless skipped).
if (!values['skip-validation']) {
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  // Remove meta-schema properties that AJV doesn't need for validation.
  const schemaForValidation: Record<string, unknown> = { ...schema };
  delete schemaForValidation.$schema;
  delete schemaForValidation.$id;
  const validate = ajv.compile(schemaForValidation);
  if (!validate(parsedInput)) {
    console.error('Input validation failed:');
    for (const error of validate.errors ?? []) {
      console.error(`  ${error.instancePath || '/'} ${error.message}`);
    }
    console.error('\nUse --skip-validation to generate anyway.');
    process.exit(1);
  }
}

// Read each local template, render it and write the result.
const outDir = resolve(values.out);
await mkdir(outDir, { recursive: true });

let failures = 0;
await Promise.all(
  selected.map(async (name) => {
    const templatePath = new URL(`../templates/${name}.mustache`, import.meta.url);
    try {
      const template = await readFile(templatePath, 'utf8');
      const rendered = parseOutput(inputJson!, template);
      const destination = join(outDir, name);
      await writeFile(destination, rendered, 'utf8');
      console.log(`✓ ${name} -> ${destination}`);
    } catch (err) {
      failures += 1;
      console.error(`✗ ${name}: ${err instanceof Error ? err.message : err}`);
    }
  }),
);

if (failures > 0) {
  fail(`${failures} of ${selected.length} document(s) failed to generate.`);
}

console.log(`\nDone. Generated ${selected.length} document(s) in ${outDir}`);
