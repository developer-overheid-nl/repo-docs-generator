/**
 * Local, bundled document templates. Imported at build time so the web app
 * never needs to fetch templates from an external source.
 */
import publiccodeYml from '../templates/publiccode.yml.mustache?raw';
import securityMd from '../templates/SECURITY.md.mustache?raw';
import codeOfConductMd from '../templates/CODE_OF_CONDUCT.md.mustache?raw';
import licenseMd from '../templates/LICENSE.md.mustache?raw';
import readmeMd from '../templates/README.md.mustache?raw';
import changelogMd from '../templates/CHANGELOG.md.mustache?raw';
import contributingMd from '../templates/CONTRIBUTING.md.mustache?raw';

const templateContents: Record<string, string> = {
  'publiccode.yml': publiccodeYml,
  'SECURITY.md': securityMd,
  'CODE_OF_CONDUCT.md': codeOfConductMd,
  'LICENSE.md': licenseMd,
  'README.md': readmeMd,
  'CHANGELOG.md': changelogMd,
  'CONTRIBUTING.md': contributingMd,
};

export default templateContents;
