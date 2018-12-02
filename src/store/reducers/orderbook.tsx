import { List, Record } from 'immutable';
import { accAdd, accSub, accMul } from '@/utils/calculate';
import filter from 'lodash.filter';
const OrderBookItemLength = 20;
export class OrderbookState extends Record({
    AskList: List([]),
    BidList: List([]),
    AskDataWithDepth: List([]),
    BidDataWithDepth: List([]),
    BidDepth: List([]),
    AskDepth: List([]),
    Version: 0,
    Depth: 0,
}) {
    readonly AskList: List<any>;
    readonly BidList: List<any>;
    readonly AskDataWithDepth: any;
    readonly BidDataWithDepth: any;
    readonly Version: number;
    readonly Depth: number;
}

export interface Order {
  Price: number;
  Size: number;
  Side: string;
}

export interface OrderbookAction {
    payload: {
      List: any[],
      Version: number,
      Type: string,
    };
    type: string;
};

const initialState = new(OrderbookState);

const getSortedList: any = (list: any) => {
  let totalPrice1 = 0;
  let totalQty1 = 0;
  const newList = list.map((o: any) => {
    totalPrice1 = accAdd(totalPrice1, accMul(o.Size, o.Price));
    totalQty1 = accAdd(totalQty1, o.Size);
    return {Price: o.Price, Size: o.Size, TotalQty: totalQty1, TotalPrice: totalPrice1};
  });
  return newList
}

const sortFullOrderBook: any = (data: any) => {
    let askList = List(filter(data.List, {Side: '1'}));
    let bidList = List(filter(data.List, {Side: '2'}));
    askList = askList.sort((a: any, b: any) => b.Price - a.Price);
    const newAskList = getSortedList(askList);
    bidList = bidList.sort((a: any, b: any) => a.Price - b.Price);
    const newBidList = getSortedList(bidList);
    return {
      askList: newAskList,
      bidList: newBidList
    };
};

export const getUpdateList: any = (inList: any, oldList: any, side: string) => {
  let newList:any
  let isNeedResend = false;
  inList.forEach((value: any) => {
    if(value.Size <= 0){
      const index = oldList.findIndex((v: any) => v.Price === value.Price);
      newList = oldList.delete(index);
      if (value.Size < 0) {
        isNeedResend = true;
      }
    }else {
      const index1 = oldList.findIndex((v: any) => v.Price === value.Price);
      if(index1 >= 0){
        newList = oldList.splice(index1, 1, value);
      }else {
        const index2 = side === '1' ? oldList.findLastIndex((v: any) => value.Price < v.Price) :
        oldList.findLastIndex((v: any) => value.Price > v.Price);
        newList = oldList.insert(index2+1, value)
      }
    }
  })
  newList = getSortedList(newList)
  return {
    newList: newList,
    isNeedResend: isNeedResend
  }
};

export default function orderbookReducer(state: OrderbookState = initialState, action: OrderbookAction): any {
    switch (action.type) {
        case 'get full orderbook':
          const data = sortFullOrderBook(action.payload);
          return state.set('AskList', data.askList)
                      .set('BidList', data.bidList)
                      .set('Version', action.payload.Version)
        case 'get incrementa orderbook':
          const inAskList = List(filter(action.payload.List, {Side: '1'}));
          const inBidList = List(filter(action.payload.List, {Side: '2'}));
          let newAskList = state.get('AskList')
          let newBidList = state.get('BidList')
          let version = action.payload.Version
          if(inAskList.size > 0){
            const ask = getUpdateList(inAskList, state.get('AskList'), '1');
            newAskList = ask.newList;
            version = ask.isNeedResend ? 0 : version
          }
          if(inBidList.size > 0){
            const bid = getUpdateList(inBidList, state.get('BidList'), '2');
            newBidList = bid.newList;
            version = bid.isNeedResend || version === 0 ? 0 : version
          }
          return state.set('AskList', newAskList)
                      .set('BidList', newBidList)
                      .set('Version', version)
        default:
            return state;
    }
}
