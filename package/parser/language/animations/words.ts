import { seqMap, seqObj, string } from "parsimmon"

const words = {

  /* "description" (Matches >Description: "uwu"<, with any escaped quotes */
  description: (x: any) => seqObj(
    string('Description:'),
    x._,
    (['description', x.quote.map((q: any) => q.quote)] as any),
  ),

  /* "gameSetting" (Matches ["Secondary Cooldown: 9%", "Ecopoint: Antartica", "Max Players: 8") */
  gameSetting: (x: any) => seqMap(
    x.gameSettingName,
    x._,
    string(':'),
    x._,
    x.gameSettingValue,
    (...m: any) => ({ [m[0]]: m[4] }),
  ),
}

export {
  words,
}