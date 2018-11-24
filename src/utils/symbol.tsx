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
