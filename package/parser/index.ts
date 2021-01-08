import { workshopScript } from "./language/global";

/* const workshopScript */
const getData = (f: string) => workshopScript.tryParse(f);

export {
  getData,
};