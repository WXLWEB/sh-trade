import * as SYMBOLS from '../constants/Symbol.json';
import * as CURRENCIES from '../constants/Currencies.json';

const getCoin = (Symbol) => {
  const arr = Symbol.split('_')
  return arr[0];
};

const getCurrency = (Symbol) => {
  const arr = Symbol.split('_')
  return arr[1];
};

export {
  getCoin,
  getCurrency,
};
