import {
  blueBright, greenBright, magentaBright, redBright, yellow, yellowBright,
} from 'chalk';
import { makeFailure, makeSuccess, Parser } from 'parsimmon';

import { parse } from './parser';

const WorkshopDeserialize = (workshopSettings: string) => parse(workshopSettings);

export default WorkshopDeserialize;

export {
  WorkshopDeserialize,
};
