import { autocompletion, CompletionContext, CompletionResult } from '@codemirror/autocomplete';
import inputSchema from '../../input_json_schema.json';

interface SchemaDefinition {
  enum?: string[];
  string?: { enum?: string[] };
  items?: { enum?: string[] };
}

/**
 * Get enum values for a given property from the schema
 */
function getEnumValues(propertyName: string): string[] | null {
  const definitions = inputSchema.definitions as Record<string, SchemaDefinition>;

  if (definitions[propertyName]?.enum) {
    return definitions[propertyName].enum as string[];
  }

  // Special case for nested enums like maintenance.string
  if (definitions[propertyName]?.string?.enum) {
    return definitions[propertyName].string.enum as string[];
  }

  // For arrays, check items.enum (e.g., platforms)
  if (definitions[propertyName]?.items?.enum) {
    return definitions[propertyName].items.enum as string[];
  }

  return null;
}

/**
 * Get all property names from schema definitions
 */
function getAllPropertyNames(): string[] {
  const definitions = inputSchema.definitions as Record<string, SchemaDefinition>;
  return Object.keys(definitions);
}

/**
 * Find the property name for the current array we're in
 */
function findArrayPropertyName(doc: string, pos: number): string | null {
  const textBefore = doc.slice(0, pos);

  // Look backwards for the property that contains this array
  // Match: "propertyName": [
  const match = textBefore.match(/"([^"]+)"\s*:\s*\[[^\]]*$/);
  if (match) {
    return match[1];
  }

  return null;
}

/**
 * JSON Schema autocomplete function
 */
function jsonSchemaCompletion(context: CompletionContext): CompletionResult | null {
  const { state, pos } = context;

  // Get the current line to determine context
  const line = state.doc.lineAt(pos);
  const textBefore = line.text.slice(0, pos - line.from);
  const fullDoc = state.doc.toString();

  // Check if we're inside an array (for array items like platforms)
  const arrayPropertyName = findArrayPropertyName(fullDoc, pos);
  if (arrayPropertyName) {
    const enumValues = getEnumValues(arrayPropertyName);

    if (enumValues) {
      // Check if we're typing a string value in the array
      const arrayValueMatch = textBefore.match(/"?([^",\]]*)$/);
      if (arrayValueMatch) {
        const from = pos - (arrayValueMatch[1]?.length || 0);
        return {
          from,
          options: enumValues.map(value => ({
            label: value,
            type: 'keyword',
            info: `Geldige waarde voor ${arrayPropertyName}`,
          })),
        };
      }
    }
  }

  // Check if we're completing a value (after a colon)
  const valueMatch = textBefore.match(/"([^"]+)"\s*:\s*"?([^"]*)$/);
  if (valueMatch) {
    const propertyName = valueMatch[1];
    const enumValues = getEnumValues(propertyName);

    if (enumValues) {
      const from = pos - (valueMatch[2]?.length || 0);
      return {
        from,
        options: enumValues.map(value => ({
          label: value,
          type: 'keyword',
          info: `Geldige waarde voor ${propertyName}`,
        })),
      };
    }
  }

  // Check if we're completing a property name (after opening brace or comma)
  const propertyMatch = textBefore.match(/[{,]\s*"?([^":]*)$/);
  if (propertyMatch) {
    const partial = propertyMatch[1];
    const from = pos - partial.length;

    const allProperties = getAllPropertyNames();
    const required = inputSchema.required || [];

    return {
      from,
      options: allProperties.map(prop => ({
        label: `"${prop}"`,
        type: 'property',
        apply: `"${prop}": `,
        info: required.includes(prop) ? '(verplicht)' : '(optioneel)',
      })),
    };
  }

  return null;
}

/**
 * Export the autocomplete extension
 */
export const jsonSchemaAutocomplete = autocompletion({
  override: [jsonSchemaCompletion],
  activateOnTyping: true,
});
