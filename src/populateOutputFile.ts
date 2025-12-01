import Mustache from 'mustache';

export const populateOutputFile = (inputJson: string) => {

  const githubMarkdownTemplateURL =
    'https://raw.githubusercontent.com/developer-overheid-nl/repository-template/refs/heads/main/templates/SECURITY.md';

  return fetch(githubMarkdownTemplateURL)
    .then(response => response.text()) // Convert response to text
    .then(responseText => {
      const parsedInput = JSON.parse(inputJson);
      const renderedOutput = Mustache.render(responseText, parsedInput);
      console.log(renderedOutput);

      return renderedOutput.toString();
    })
    .catch(error => {
      throw new Error(error);
    });

};

export default populateOutputFile;
