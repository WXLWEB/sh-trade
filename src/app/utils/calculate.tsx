// 加
const accAdd = (arg1, arg2) => {
  var decimals = 100000000;
  var a = arg1 * decimals;
  var b = arg2 * decimals;
  return Math.round(a + b) / decimals;
};

// 减
const accSub = (arg1, arg2) => {
  var decimals = 100000000;
  var a = arg1 * decimals;
  var b = arg2 * decimals;
  return Math.round(a - b) / decimals;
};

// 除
const accDiv = (arg1, arg2) => {
  var decimals = 100000000;
  var a = arg1 * decimals;
  var b = arg2 * decimals;
  return Math.round(a / b);
};

// 乘
const accMul = (arg1, arg2) => {
  var decimals = 100000000;
  var a = arg1 * decimals;
  var b = arg2 * decimals;
  return Math.round(a * b) / (decimals * decimals);
};

// floor
const accFloor = (arg, decimal) => {
  const arg2 = Math.pow(10, decimal);
  return Math.floor(arg * arg2) / arg2;
};

export {
  accAdd,
  accSub,
  accMul,
  accDiv,
  accFloor,
};
