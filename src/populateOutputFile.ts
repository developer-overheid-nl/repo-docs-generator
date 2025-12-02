import Mustache from 'mustache';

export const parseOutput = (inputJson: string, gitTemplate: string): string => {

      const parsedInput = JSON.parse(inputJson);
      Mustache.escape = (text) => text;
      const renderedOutput = Mustache.render(gitTemplate, parsedInput).toString();
      
      return renderedOutput;
};

export default parseOutput;
