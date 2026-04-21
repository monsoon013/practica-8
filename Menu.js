import { carta } from './carta.json' with { type: 'json'} ;
import { Mesa } from './Mesa.js';
import { Restaurante } from './Restaurante.js';

const fs = require('fs/promises');

const rl = readline.createInterface({input, output});

const cons = 'tupper';

console.log(cons.charAt(0).toUpperCase() + cons.slice(1));