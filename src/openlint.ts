import { linter } from '@codemirror/lint';
import { Document, RulesetDefinition, OpenLint } from '@openlint/openlint-core';
import { Json } from '@openlint/openlint-parsers';
import { DiagnosticSeverity } from '@stoplight/types';
import { Extension } from '@uiw/react-codemirror';
import { Severity } from './types';

export interface Rulesets {
  [confClass: string]: RulesetDefinition;
}

const mapSeverity = (severity: DiagnosticSeverity): Severity => {
  switch (severity) {
    case DiagnosticSeverity.Warning:
      return 'warning';
    case DiagnosticSeverity.Information:
      return 'info';
    case DiagnosticSeverity.Hint:
      return 'hint';
    default:
      return 'error';
  }
};

export const openLintLinter = (name: string, ruleset: RulesetDefinition): Extension => {
  const openLint = new OpenLint();

  openLint.setRuleset(ruleset);

  return linter(async view => {
    const doc = view.state.doc;
    const document = new Document(doc.toString(), Json);
    const violations = await openLint.run(document);

    return violations.map(violation => ({
      source: name,
      from: doc.line(violation.range.start.line + 1).from + violation.range.start.character,
      to: doc.line(violation.range.end.line + 1).from + violation.range.end.character,
      severity: mapSeverity(violation.severity),
      message: `[${violation.code}] ${violation.message}`,
    }));
  });
};
