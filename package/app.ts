const fs = require('fs');
const path = require('path');
const util = require('util');


import { blueBright, greenBright, magentaBright, redBright, yellowBright } from 'chalk';
import { parse } from './parser';
import { workshopScript } from './parser/language/global';

enum Mode {
  develop,
  production,
}


const execute = (mode: Mode, file: string) => {
  console.clear();
  console.log('\n\n\n\n');

  /* parse file */
  const data = fs.readFileSync(`${__dirname}${path.sep}${file}`, { encoding: 'utf-8' })
  const workshopData = parse(data.trim());
 
  /* output js */
  /* fs.writeFileSync('dist.js', util.inspect(workshopData, false, null, false)); */
  /* console.log(util.inspect(workshopData, false, null, true)) */

  /* output json (minify code for production) */
  fs.writeFileSync('dist.json', (mode !== Mode.production) ? JSON.stringify(workshopData, null, 2) : JSON.stringify(workshopScript));

  return workshopData;
}

const workshopData = execute(
  Mode.develop,
  'VCC9V.txt',
);

const display = (workshopData: any) => {

  const gameData = workshopData?.settings;
  const variables = workshopData?.variables;
  
  /* description */
  console.log(
    redBright('•'),
    'description', 
    `"${
      redBright(
        gameData?.main?.description,
      )
    }"\n`
  )

  /* lobby */
  console.log(
    yellowBright('•'),
    'lobby',
    yellowBright(
      JSON.stringify(
        gameData?.lobby,
        null, 2
      )
    ),
    '\n',
  )

  /* modes */
  console.log(
    greenBright('•'),
    'modes',
    `"${
      Object.keys(gameData?.modes)
        .filter((m: any) => !m.startsWith('disabled'))
        .map((m: any) => greenBright(m))
        .join('", "')
    }"\n`
  )

  /* heroes */
  console.log(
    blueBright('•'),
    'heroes',
    `"${ gameData?.heroes?.General?.["enabled heroes"]
      .map((m: any) => blueBright(m))
      .join('", "')
    }"\n`
  )

  /* variables */
  console.log(
    magentaBright('•'),
    `variables ${ magentaBright('{') }\n\n  `,
    magentaBright('•'),
    `global "${
      Object.values(variables?.global)
        .map((m: any) => magentaBright(m))
        .join('", "')
    }"\n\n  `,
    magentaBright('•'),
    `player "${Object.values(variables?.player)
      .map((m: any) => magentaBright(m))
      .join('", "')
    }"\n`,
    magentaBright('}'),
  )
        
}

display(workshopData);
// console.dir(workshopData);


// todo: minify without spaces for production

// console.log('Description:', [
//   workshopData.get('settings').get('main').get('Description'),
// ]);

// console.log('Modes:', [
//   ...[...workshopData.get('settings').get('modes').keys()]
//     .filter((x: string) => !x.startsWith('disabled ')),
// ]);

// console.log('Heroes:', [
//   ...(workshopData.get('settings')).get('heroes').get('General').keys(),
//   ...(workshopData.get('settings')).get('heroes')?.get('Team 1').keys(),
//   ...(workshopData.get('settings')).get('heroes')?.get('Team 2').keys(),
// ]);

// /* BEWARE object fromEntries() does not work in browesers without es2019 */
// console.log('lobby:', Object.fromEntries(workshopData.get('settings').get('lobby').get().entries()));
// console.log('other:', [
//   // ...workshopData.get('settings').get('lobby').get('Allow Players Who Are In Queue'),
//   // ...workshopData.get('settings').get('main').dataText,
// ]);
