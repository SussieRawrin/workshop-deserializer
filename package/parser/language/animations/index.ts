import { createLanguage, optWhitespace, whitespace } from "parsimmon";
import { boxes } from "./boxes";
import { values } from "./values";
import { words } from "./words";

const parsers = {

  /* values (digits, integer) */
  ...values,

  /* minor syntax*/
  ...words,
  
  /* boxes */
  ...boxes,

  ...{
    /* main parser */
    /* workshop: (x: any) => x.workshopScript, */
    workshopScript: (x: any) => x.group,
    ws: (x: any) => x.workshopScript,
  },

  ...{

    /* optional whitespace */
    _: () => optWhitespace,

    /* can do necessary whitespace too */
    __: () => whitespace,
  }
}

export {
  parsers,
}