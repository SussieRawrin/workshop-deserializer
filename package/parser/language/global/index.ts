import { createLanguage } from "parsimmon";
import { parsers } from "../animations";

const workshopScript = createLanguage(parsers).workshopScript;

export {
  workshopScript,
}