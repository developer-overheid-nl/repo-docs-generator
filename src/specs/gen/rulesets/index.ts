import { Rulesets } from '../../../jsonSchemaLinter';
import generatorSyntax, { GEN_URI } from './generatorSyntax';

const rulesets: Rulesets = {
  [GEN_URI]: generatorSyntax,
};

export default rulesets;
