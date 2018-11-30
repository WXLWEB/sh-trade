import { List, Record } from 'immutable';
import { accAdd, accSub, accMul } from '@/utils/calculate';

export class OrderbookState extends Record({
    AskData: List([]),
    BidData: List([]),
    AskDataWithDepth: List([]),
    BidDataWithDepth: List([]),
    BidDepth: List([]),
    AskDepth: List([]),
    Version: 0,
    Depth: 0,
}) {
    readonly AskData: any;
    readonly BidData: any;
    readonly AskDataWithDepth: any;
    readonly BidDataWithDepth: any;
    readonly Version: number;
    readonly Depth: number;
}


export interface OrderbookAction {
    payload: any;
    type: string;
};

const initialState = new(OrderbookState);

const OrderBookItemLength = 200;

const sortFullOrderBook = (data: any) => {
  let obj = {
    Version: '',
    askData: List([]),
    bidData: List([])
  };
  if (data.Type === 'F') {
    obj.Version = data.Version;
    obj.askData = List([]);
    obj.bidData = List([]);
    data.List.forEach((id) => {
      if (id.Side === '1') {
        obj.bidData = obj.bidData.push({ Price: id.Price, Quantity: id.Size });
      } else if (id.Side === '2') {
        obj.askData = obj.askData.push({ Price: id.Price, Quantity: id.Size });
      }
    });
    obj.askData = obj.askData.sort((a, b) => a.Price - b.Price);
    let totalPrice1 = 0;
    let totalQty1 = 0;
    obj.askData = obj.askData.map((o) => {
      totalPrice1 = accAdd(totalPrice1, accMul(o.Quantity, o.Price));
      totalQty1 = accAdd(totalQty1, o.Quantity);
      return {Price: o.Price, Quantity: o.Quantity, TotalQty: totalQty1, TotalPrice: totalPrice1};
    });
    obj.bidData = obj.bidData.sort((a, b) => b.Price - a.Price);
    let totalPrice2 = 0;
    let totalQty2 = 0;
    obj.bidData = obj.bidData.map((o) => {
      totalPrice2 = accAdd(totalPrice2, accMul(o.Quantity, o.Price));
      totalQty2 = accAdd(totalQty2, o.Quantity);
      return {Price: o.Price, Quantity: o.Quantity, TotalQty: totalQty2, TotalPrice: totalPrice2};
    });
    return obj;
  }
};

export const sortIncrementalOrderBook = (data, oldOrderbook) => {
  let obj = oldOrderbook;
  if (data.Type === 'I') {
     oldOrderbook = oldOrderbook.update('Version', v => data.Version);
     data.List.forEach((obj) => {
      const idData = obj.Side === '1' ? 'BidData' : 'AskData';
      const arrData = oldOrderbook.get(idData);
      if (arrData.get(OrderBookItemLength) && ((obj.Side === '1' && obj.Price < parseFloat(arrData.get(OrderBookItemLength).Price)) || (obj.Side === '2' && obj.Price > parseFloat(arrData.get(OrderBookItemLength).Price)))) {
        return;
      }
      const key = arrData.findKey(v => v.Price === obj.Price);
      if (key !== undefined) {
        const qty = accAdd(arrData.get(key).Quantity, obj.Size);
        if (qty <= 0) {
          oldOrderbook = oldOrderbook.update(idData, v => v.delete(key));
          if (qty < 0) {
            oldOrderbook = oldOrderbook.update('Version', v => 0);
          }
        }else {
          oldOrderbook = oldOrderbook.update(idData, v => v.set(key, { 'Price': v.get(key).Price, 'Quantity': qty }));
        }
      }else {
        const lastKey = obj.Side === '1' ? arrData.findKey(x => obj.Price > x.Price) : arrData.findKey(x => obj.Price < x.Price );
        if (lastKey !== undefined) {
          oldOrderbook = oldOrderbook.update(idData, v => v.insert(lastKey, { Price: obj.Price, Quantity: obj.Size }));
        }else {
          oldOrderbook = oldOrderbook.update(idData, v => v.push({ Price: obj.Price, Quantity: obj.Size }));
        }
      }
      // const data1 = obj.Side === '1' ? oldOrderbook.get(idData).sort((a, b) => b.Price - a.Price) : oldOrderbook.get(idData).sort((a, b) => a.Price - b.Price)
      // oldOrderbook.set(idData, data1);
      let totalPrice3 = 0;
      let totalQty3 = 0;
      oldOrderbook = oldOrderbook.update(idData, v => v.map((o) => {
        totalPrice3 = accAdd(totalPrice3, accMul(o.Quantity, o.Price));
        totalQty3 = accAdd(totalQty3, o.Quantity);
        return {Price: o.Price, Quantity: o.Quantity, TotalQty: totalQty3, TotalPrice: totalPrice3};
      }));
    });
  }
  return oldOrderbook;
};

export const sortOrderBookWithDepth = (dataArr?: any, count?: number, side = 1, depth?: number) => {
  let orderArr = List([]);
  let minAmount = 0;
  let totalAmount = 0;
  let totalPrice = 0;
  if (dataArr.size > 0) {
    let firstPrice = side === 2 ? Math.ceil(dataArr.get(0).Price) : Math.floor(dataArr.get(0).Price);
    for (var i = 0; i < dataArr.size || orderArr.size > count; i++) {
      let differencePrice1 = side === 2 ? accSub(firstPrice, parseFloat(dataArr.get(i).Price)) : accSub(parseFloat(dataArr.get(i).Price), firstPrice);
      if (differencePrice1 < depth &&  differencePrice1 >= 0) {
        minAmount += parseFloat(dataArr.get(i).Quantity);
        totalAmount = parseFloat(dataArr.get(i).TotalQty);
        totalPrice = parseFloat(dataArr.get(i).TotalPrice);
      } else {
        if (minAmount !== 0) {
          orderArr = orderArr.push({Price : firstPrice, Quantity: minAmount, TotalQty: totalAmount, TotalPrice: totalPrice});
          minAmount = 0;
          totalAmount = 0;
          if (orderArr.size >= count) {
            break;
          };
        }
        while (true) {
          let differencePrice2 = side === 2 ? accSub(firstPrice, parseFloat(dataArr.get(i).Price)) : accSub(parseFloat(dataArr.get(i).Price), firstPrice);
          if (differencePrice2 < depth && differencePrice2 >= 0) {
            minAmount = accAdd(minAmount, parseFloat(dataArr.get(i).Quantity));
            totalAmount = parseFloat(dataArr.get(i).TotalQty);
            totalPrice = parseFloat(dataArr.get(i).TotalPrice);
            break;
          } else {
            if (side === 2) {
              firstPrice = accAdd(firstPrice, depth);
            } else {
              firstPrice = accSub(firstPrice, depth);
              firstPrice = firstPrice < 0 ? 0 : firstPrice;
            }
          }
        }
      }
    }
    if (orderArr.size < count) {
      orderArr = orderArr.push({Price: firstPrice, Quantity: minAmount, TotalQty: totalAmount, TotalPrice: totalPrice});
    }
  }
  if (side === 1) {
      for (let i = 0; i < orderArr.size; i++) {
          if (parseFloat(dataArr.get(i).Price) <= 0 || parseFloat(dataArr.get(i).Quantity) <= 0) {
              orderArr = orderArr.splice(i, 1);
          }
      }
  }
  return orderArr;
};

export const getMaketDepth = (dataArr?: any, count?: number) => {
  const max = dataArr.maxBy(x => x.Quantity);
  const orderArr = dataArr.map(obj => {
    return obj.Quantity / max.Quantity;
  });
  return orderArr;
};

export default function orderbookReducer(state: OrderbookState = initialState, action: OrderbookAction): any {
    switch (action.type) {
        case 'get full orderbook':
          const data = sortFullOrderBook(action.payload);
          const bidDepth = getMaketDepth(data.bidData, 8);
          const askDepth = getMaketDepth(data.askData, 8);
          // getMaketDepth(data.bidData, 10, 1);
          return state.set('AskData', data.askData)
                      .set('BidData', data.bidData)
                      .set('Version', action.payload.Version)
                      .set('BidDepth', bidDepth)
                      .set('AskDepth', askDepth)
                      .set('Depth', 0);
        case 'get incrementa orderbook':
          const data1 = sortIncrementalOrderBook(action.payload, state);
          if (state.get('Depth') > 0) {
            const ask = sortOrderBookWithDepth(data1.get('AskData'), 8, 2, state.get('Depth'));
            const bid = sortOrderBookWithDepth(data1.get('BidData'), 8, 1, state.get('Depth'));
            return state.set('AskData', data1.get('AskData'))
                        .set('BidData', data1.get('BidData'))
                        .set('Version', data1.get('Version'))
                        .set('AskDataWithDepth', ask)
                        .set('BidDataWithDepth', bid);
          }
          return state.set('AskData', data1.get('AskData'))
                      .set('BidData', data1.get('BidData'))
                      .set('Version', data1.get('Version'));
        case 'set depth':
          if (action.payload) {
            const data2 = sortOrderBookWithDepth(state.get('AskData'), 8, 2, action.payload);
            const data3 = sortOrderBookWithDepth(state.get('BidData'), 8, 1, action.payload);
            return state.set('Depth', action.payload)
                        .set('AskDataWithDepth', data2)
                        .set('BidDataWithDepth', data3);
          } else {
            return state.set('Depth', 0);
          };
          break;
        case 'get market depth chart':
          let bidDepth1 = List([]);
          let askDepth1 = List([]);
          // if (!!state.get('BidData')) {
          //   bidDepth1 = getMaketDepth(state.get('BidData'), showOrderBookLength);
          // }
          // if (!!state.get('AskData')) {
          //   askDepth1 = getMaketDepth(state.get('AskData'), showOrderBookLength);
          // }
          return state.set('BidDepth', bidDepth1)
                      .set('AskDepth', askDepth1);
        default:
            return state;
    }
}
