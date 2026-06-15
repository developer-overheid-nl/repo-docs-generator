/**
 * Single source of truth for where the document templates live.
 * Used by both the web app (TemplateSelector) and the CLI.
 */
export const TEMPLATE_REPO =
  'developer-overheid-nl/repository-template';

export const templateUrl = (templateName: string, ref = 'main'): string =>
  `https://raw.githubusercontent.com/${TEMPLATE_REPO}/refs/heads/${ref}/templates/${templateName}`;

export default templateUrl;
