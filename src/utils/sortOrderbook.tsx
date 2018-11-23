import { accAdd } from './calculate';

const sortOrderbookArr = (arr) => {
  const tempArr = [];
  if (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
          tempArr.push([arr[i].Price, arr[i].Quantity]);
      }
  }
  return tempArr;
}

export const sortOrderBookWithoutDepth = (dataArr?: any, count = Number.MAX_VALUE) => {
  const orderArr = [];
  let totalAmount = 0;
  for (let i = 0; i < dataArr.length; i += 1) {
    if (i > dataArr.length - 1) {
      const obj = {
        Price: '-',
        Quantity: '-',
        total: '-',
        id: i,
      };
      orderArr.push(obj);
    } else {
      totalAmount = accAdd(dataArr[i].Quantity || dataArr[i][1], totalAmount);
      let obj = {
        Price: parseFloat(dataArr[i].Price || dataArr[i][0]).toFixed(8),
        Quantity: parseFloat(dataArr[i].Quantity || dataArr[i][1]).toFixed(8),
        total: totalAmount.toFixed(8),
        id: i,
      };
      orderArr.push(obj);
    }
  };
  const tempCount = dataArr.length < count ? dataArr.length : count;
  return orderArr.slice(0, tempCount);
};

export const sortOrderBookWithDepth = (Arr?: any, count?: number, side = 1, depth?: number) => {
  // side : 1 -- 'buy', 2 -- 'sell'
  const dataArr = sortOrderbookArr(Arr);
  const orderArr = [];
  let minAmount = 0;
  if (dataArr.length > 0) {
    let firstPrice = side === 2 ? Math.ceil(dataArr[0][0]) : Math.floor(dataArr[0][0]);
    for (var i = 0; i < dataArr.length; i++) {
      let differencePrice1 = side === 2 ? firstPrice - parseFloat(dataArr[i][0]) : parseFloat(dataArr[i][0]) - firstPrice;
      if (differencePrice1 < depth &&  differencePrice1 >= 0) {
        minAmount += parseFloat(dataArr[i][1]);
      } else {
        if (minAmount !== 0) {
          orderArr.push([firstPrice, minAmount]);
          minAmount = 0;
          if (orderArr.length >= count) {
            break;
          };
        }
        while (true) {
          let differencePrice2 = side === 2 ? firstPrice - parseFloat(dataArr[i][0]) : parseFloat(dataArr[i][0]) - firstPrice;
          if (differencePrice2 < depth && differencePrice2 >= 0) {
            minAmount += parseFloat(dataArr[i][1]);
            break;
          } else {
            if (side === 2) {
              firstPrice += depth;
            } else {
              firstPrice -= depth;
            }
          }
        }
      }
    }
    if (firstPrice !== 0 && orderArr.length < count) {
      orderArr.push([firstPrice, minAmount]);
    }
  }
  if (side === 1) {
      for (let i = 0; i < orderArr.length; i++) {
          if (parseFloat(orderArr[i][0]) <= 0 || parseFloat(orderArr[i][1]) <= 0) {
              orderArr.splice(i, 1);
          }
      }
  }
  return sortOrderBookWithoutDepth(orderArr, count);
};
