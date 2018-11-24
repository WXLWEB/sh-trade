import { Map } from 'immutable';
import * as Immutable from 'immutable';
import { accSub, accMul, accAdd } from '@/utils/calculate';
import { getCoin, getCurrency } from '@/utils/symbol';
import * as _ from 'lodash';

export interface IAccountInfoResponseAction {
    payload: {
        total: number,
        avail: number,
        positions: number,
        Account: string,
    };
    type: string;
};

export class IAccountInfoResponse extends Immutable.Record({
  Account: '',
  BL: [],
  CDL: [],
}) {
  total: number;
  avail: number;
  positions: number;
}


const initialState = new (IAccountInfoResponse);

const getCash = (currency : string, accountInfo : any) => {
  var cash = _.sumBy(_.filter(accountInfo.BL, function(o: any) {
    return o.CR === currency;
  }), 'C');
  return cash;
};

const getCurrencyFromSymbol = (symbol: string, isQuote : boolean) => {
 if (isQuote) {
   return getCurrency(symbol);
 }else {
   return getCoin(symbol);
 }
};

const getInitialMarginByCurrency = (currency : string, positions: any) => {
  let sum = 0;
  _.forEach(positions, function(o : any) {
   if (getCurrencyFromSymbol(o.S, true) === currency) {
     sum = accAdd(o.quoteInitialMargin, sum);
   } else if (getCurrencyFromSymbol(o.S, false) === currency) {
     sum = accAdd(o.baseInitialMargin, sum);
   }
  });
  return sum;
};


const getInitialMarginRequired = (initialMargin : number, profit : number, side : boolean, initialMarginFactor : number) => {
  var volatileMargin = (side || profit >= 0) ? 0 : accMul(profit, initialMarginFactor);
  return accSub(initialMargin, volatileMargin);
};


const updatePositions = (positions : any) => {
 positions = _.map(positions, function(position : any) {
   position.quoteInitialMargin = getInitialMarginRequired(position.QIMR, position.totalProfit, position.OS >= 0, position.IMF);
   position.baseInitialMargin = getInitialMarginRequired(position.BIMR, position.totalProfit, position.OS >= 0, position.IMF);
   return position;
 });
   return positions;
};


const getAccountInfo = (data) => {
  const positions = updatePositions(data.CDL);
  const total_cash = getCash('CNY', data);
  const total_eth = getCash('ETH', data);
  const total_bcc = getCash('BCC', data);
  const frozen_cash = getInitialMarginByCurrency('CNY', positions);
  const frozen_eth = getInitialMarginByCurrency('ETH', positions);
  const frozen_bcc = getInitialMarginByCurrency('BCC', positions);
  return Map({
    total_cash: total_cash,
    frozen_cash: frozen_cash,
    available_cash: accSub(total_cash, frozen_cash),
    ETH_BTC: {
      total_coin: total_eth,
      frozen_coin: frozen_eth,
      available_coin: accSub(total_eth, frozen_eth),
    },
    BCC_BTC: {
      total_coin: total_bcc,
      frozen_coin: frozen_bcc,
      available_coin: accSub(total_bcc, frozen_bcc),
    },
  });
};

export default function acccountInfoResponse(state: IAccountInfoResponse = initialState, action: IAccountInfoResponseAction) {
  switch (action.type) {
    case 'get accountinfo response':
      const newState = getAccountInfo(action.payload);
      return newState;
    case 'clear account info':
      return Map({
        total_cash: '-',
        frozen_cash: '-',
        available_cash: '-',
        ETH_BTC: {
          total_coin: '-',
          frozen_coin: '-',
          available_coin: '-',
        },
        BCC_BTC: {
          total_coin: '-',
          frozen_coin: '-',
          available_coin: '-',
        },
        login: false,
      });
    default:
      return state;
  }
}
