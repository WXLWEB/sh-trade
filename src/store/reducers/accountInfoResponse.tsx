import { Record, Map } from 'immutable';
import sumBy from 'lodash.sumby';
import filter from 'lodash.filter';
import { accSub } from '@/utils/calculate';
import Currency from '@/constants/currency';

const balanceArr = Currency.map(item => {
  return {
    currency: item,
    available: 0,
    frozen: 0,
    total: 0,
  };
});

const AccountInfoResponseRecord = Record({
  balanceArr: balanceArr,
  chiefBalance: '-',
  total: '-'
});

export class AccountInfoResponseState extends AccountInfoResponseRecord {
  balanceArr: any;
  chiefBalance: any;
  main: any;
  total: any;
}

const initialState = new AccountInfoResponseState();

export interface AccountInfoResponseAction {
  payload: {
    BL: any[];
    CDL: any[];
  }
  type: string;
}

const getTotal = (currency : string, accountInfo : any) => {
  var cash = sumBy(filter(accountInfo.BL, function(o: any) {
    return o.CR === currency;
  }), 'B');
  return cash;
};

const getForzen = (currency : string, accountInfo: any) => {
  var cash = sumBy(filter(accountInfo.BL, function(o: any) {
    return o.CR === currency;
  }), 'F');
  return cash;
};

const getAccountInfo = (accountInfo: any, state: AccountInfoResponseState) => {
  const balanceArr = state.get('balanceArr').map(item => {
    const currency = item.currency;
    const total = getTotal(currency, accountInfo);
    const frozen = getForzen(currency, accountInfo);
    return {
      currency: item.currency,
      available: accSub(total, frozen),
      frozen: frozen,
      total: total,
    };
  });
  return state.set('balanceArr', balanceArr);
};


export default function acccountInfoResponseReducer(state: AccountInfoResponseState = initialState, action: AccountInfoResponseAction) {
  switch (action.type) {
    case 'get accountinfo response':
      const newState = getAccountInfo(action.payload, state);
      return newState;
    case 'logout requested':
      const newState = Map({
        balanceArr: balanceArr,
        chiefBalance: '-',
        total: '-'
      })
      return newState;
    default:
      return state;
  }
}
