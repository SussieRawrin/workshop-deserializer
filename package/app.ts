
import * as fs from 'fs';
import path from 'path';
import util from 'util';

import { dataTree } from './classes/helpers';

console.clear();
const data = fs.readFileSync(`${__dirname}${path.sep}VCC9V.txt`, { encoding: 'utf-8' });

/*
  finds first "}" not in quotes
  ?? use /g to find multiple
    /}(?=([^"\\]*(\\.|"([^"\\]*\\.)*[^"\\]*"))*[^"]*$)/g

    (}(?=([^"\\]*(\\.|"([^"\\]*\\.)*[^"\\]*"))*[^"]*$))

    this works
    (?<={(?=([^"\\]*(\\.|"([^"\\]*\\.)*[^"\\]*"))*[^"]*$))[^]{0,}?(?=}(?=([^"\\]*(\\.|"([^"\\]*\\.)*[^"\\]*"))*[^"]*$))
*/

const workshopData = dataTree(data) as any;
// console.log(util.inspect(workshopData, false, null, true));
// console.log('\n\n\n\n');

fs.writeFileSync('dist.js', util.inspect(workshopData, false, null, false));

console.log('Description:', [
  workshopData.get('settings').get('main').get('Description'),
]);

console.log('Modes:', [
  ...[...workshopData.get('settings').get('modes').keys()]
    .filter((x: string) => !x.startsWith('disabled ')),
]);

console.log('Heroes:', [
  ...(workshopData.get('settings')).get('heroes').get('General').keys(),
  ...(workshopData.get('settings')).get('heroes')?.get('Team 1').keys(),
  ...(workshopData.get('settings')).get('heroes')?.get('Team 2').keys(),
]);

/* BEWARE object fromEntries() does not work in browesers without es2019 */
console.log('lobby:', Object.fromEntries(workshopData.get('settings').get('lobby').get().entries()));
console.log('other:', [
  // ...workshopData.get('settings').get('lobby').get('Allow Players Who Are In Queue'),
  // ...workshopData.get('settings').get('main').dataText,
]);
