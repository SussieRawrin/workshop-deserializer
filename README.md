# @workshopcodes/deserializer
A parser-combinator for Overwatch Workshop Settings (Overwatch Workshop Config -> (TypeScript, JavaScript, JSON)
https://www.npmjs.com/package/@workshopcodes/deserializer

## What is this?
* It takes C++ formatted Overwatch Workshop game settings and converts it to a JSON object. Probably only needed if you want to get data from an overwatch settings text file
* When you copy code using the in-game copy button it saves to your clipboard as text. This package would convert that text into javascript data

## Example Input
![](input.png)

## Example Output
![](output.png)

## Usage Code
* This JavaScript code shows how you could parse and combinate a text file containing an entire copied workshop game code. 
```javascript
const { WorkshopDeserialize } = require('@workshopcodes/workshop-deserializer')

const fs = require('fs');
const path = require('path');

/* expects a file named "ZCEZA" in the project directory */
/* an example file is also in project directory */
const txt = fs.readFileSync(__dirname + path.sep + 'ZCEZA', { encoding: 'utf-8' });

const workshopData = WorkshopDeserialize(txt);

console.dir(workshopData);
console.log(workshopData?.settings?.main?.description);
```


## Other Notes
* Although it will error when unexpected code is found, it is very forgiving. This is not a substitute for an actual game mode parser, instead it's meant to be a fault-tolerant data deserializer grabbing as much data as it can possibly interpret
* As it is a parser combinator which depends on "parsimmon", it's possible to extend this code with a custom parser without needing to fork

thanks! :D
