import { workshopScript } from "./language/global";

/* const workshopScript */
const parse = (f: string) => workshopScript.tryParse(f);

export {
  parse,
};