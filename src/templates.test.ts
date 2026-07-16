import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import Mustache from 'mustache';
import { describe, expect, it } from 'vitest';
import schema from '../input_json_schema.json' with { type: 'json' };

const templatesDir = fileURLToPath(new URL('../templates', import.meta.url));
const schemaKeys = new Set(Object.keys(schema.definitions));

const TAG_TYPES_TO_CHECK = new Set(['name', '&', '#', '^']);

/**
 * Collects the mustache tag names referenced directly in the template's root
 * context (i.e. not nested inside a section, since a section's body may be
 * rendered against a different, per-item context that the schema doesn't
 * describe).
 */
const rootLevelVariables = (template: string): string[] => {
  const tokens = Mustache.parse(template);
  const names = new Set<string>();
  for (const [type, value] of tokens) {
    if (!TAG_TYPES_TO_CHECK.has(type) || value === '.') continue;
    // Dotted paths (e.g. "supports.0", used to guard an array-section header)
    // still resolve against the root context, so only the first segment matters.
    names.add(value.split('.')[0]);
  }
  return [...names];
};

describe('template variables', () => {
  const templateFiles = readdirSync(templatesDir).filter((file) => file.endsWith('.mustache'));

  it.each(templateFiles)('%s only references variables defined in input_json_schema.json', (file) => {
    const template = readFileSync(`${templatesDir}/${file}`, 'utf8');
    const variables = rootLevelVariables(template);
    const unknown = variables.filter((name) => !schemaKeys.has(name));

    expect(unknown, `Unknown variable(s) in ${file}: ${unknown.join(', ')}`).toEqual([]);
  });
});
