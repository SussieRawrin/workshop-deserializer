import { alt, seq, seqObj, string } from "parsimmon";
import { hardTypes } from "../../../hardtypes";

const boxes = {

  /* "group" */
  group: (x: any) => seqObj(

    /* (ex. "modes", "heroes") */
    (["descriptor", x.mapHeroName] as any),
      x._,
    string('{'),
      x._,

    /* matches any *words* inside a box, also "mapHeroName" empty boxes */
    /* (ex. "{ Secondary Cooldown: 20% }") */
    (["box", alt(
        x.gameSetting,
        x.description,
        x.group,

        /* catches any standalone words (ex. "Deathmatch" w/ no option box) */
        x.mapHeroName.map((m: any) => ({ [m]: {} })),
      )
        .sepBy(x._).skip(seq(x._, string('}')))

        /* merge all individual items into a single object */
        .map((x: any) => x.reduce((_: any, v: any) => ({ ..._, ...v }), {}))

        /* display hardcoded boxes as tuples (ex. "disabled heroes", "disabled maps") */
        .map ((x: any) => ({
          ...x,
          ...Object.entries(x)
            .filter(([k, v]) => hardTypes.listNames.includes(k))
            .map(([k, v]) => ({ [k]: Object.keys(v as any) }))
            .reduce((_: any, v: any) => ({ ..._, ...v }), { })
        }))

    ] as any)
  ).map(

    /* transforms data ({ name: 'x', data: { x } } to { x: x }) */
    (x: any) => ({ [x.descriptor]: x.box })
  ),
}

export {
  boxes,
}