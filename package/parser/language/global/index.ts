import { createLanguage } from 'parsimmon';
import { parsers } from '../animations';

const { workshopScript } = createLanguage(parsers);

export {
  workshopScript,
};
