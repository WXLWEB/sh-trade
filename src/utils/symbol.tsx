const getBuyUnit = (Symbol: string) => {
  const arr = Symbol.split('_')
  return arr[0];
};

const getSellUnit = (Symbol: string) => {
  const arr = Symbol.split('_')
  return arr[1];
};

export {
  getBuyUnit,
  getSellUnit,
};
