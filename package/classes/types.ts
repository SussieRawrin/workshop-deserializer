
/*  main: {
      xyz: 90%,
      xyz: 90%,
    }
*/
export type Dictionary = Map<string, string | number>;

// {
//   [key: string]: string | number;
// }

/*  variables: {

      global: {
        0: 'test',
        24: 'hello',
      },

      player: {
        99: 'xwx,
      },
    }
*/
export type Variables = Map<string, Map<number, string>>;

// {
//   [key: string]: {
//     [key: number]: string;
//   };
// }

/*  main: [
      'Dorado',
      'Watchpoint: Gibraltar',
    ]
*/
export type Set = Array<string>;

export type CodeBlock = Array<string>;

export type Unknown = Array<string>;

export type Any = Dictionary | Variables | Set | CodeBlock;
