import { parse } from './parser';

const WorkshopDeserialize = (workshopSettings: string) => parse(workshopSettings);

// test trick
// require('fs').writeFileSync('dist.json', JSON.stringify(WorkshopDeserialize(require('fs').readFileSync('VCC9V', { encoding: 'utf8' })), null, 2));

export default WorkshopDeserialize;

export {
  WorkshopDeserialize,
};
