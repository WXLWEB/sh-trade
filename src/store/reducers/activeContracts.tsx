import filter from 'lodash.filter';
import global from  '@/constants/config';
import { getBuyUnit, getSellUnit } from '@/utils/symbol';
export interface ActiveContractsState {
  contracts:{
    CNZ: ReadonlyArray<any>
    ETH: ReadonlyArray<any>
    EOS: ReadonlyArray<any>
  };
  AllContracts: ReadonlyArray<any>;
  currentSymbol: string;
  currentPriceDecimal: number;
  currentQuantityDecimal: number;
  currentPriceUnit: string;
  currentQuantityUnit: string;
}

export interface ActiveContractsAction {
    payload: {
       Contracts: any[]
    };
    type: string;
};

const initialState:ActiveContractsState = {
  contracts:{
    CNZ: [],
    ETH: [],
    EOS: [],
  },
  AllContracts: [],
  currentSymbol: 'ETH_CNZ',
  currentPriceDecimal: 2,
  currentQuantityDecimal: 4,
  currentPriceUnit: 'CNZ',
  currentQuantityUnit: 'ETH',
};

export interface Contract {
  Symbol: string;
  Quantity: number;
};

const matchSymbol = (contracts: any, coin: string) => {
  return filter(contracts, (obj: any) => {
    return obj.Symbol ? obj.Symbol.split('_').indexOf(coin) === 1 : false
  }).map((obj: any) => {
    let o = Object.assign({}, obj);
    o.Coin = obj.Symbol.replace(coin, '').replace('_', '')
    return o;
  })
}

export default function activeContractsReducer(state: ActiveContractsState = initialState, action: ActiveContractsAction): any {
    switch (action.type) {
        case 'get active contracts response':
          let newState = Object.assign({}, state);
          newState.AllContracts = Object.assign({}, action.payload.Contracts);
          newState.contracts.CNZ = matchSymbol(newState.AllContracts, 'CNZ');
          newState.contracts.ETH = matchSymbol(newState.AllContracts, 'ETH');
          newState.contracts.EOS = matchSymbol(newState.AllContracts, 'EOS');
          const contract = filter(newState.AllContracts, {Symbol: global.CurrentSymbol});
          newState.currentPriceDecimal = contract[0].Price.toFixed(18).replace(/\.0+$/, "").replace(/(\.\d+[1-9])0+$/, "$1").split(".")[1].length;
          newState.currentQuantityDecimal = contract[0].Quantity.toFixed(18).replace(/\.0+$/, "").replace(/(\.\d+[1-9])0+$/, "$1").split(".")[1].length;
          newState.currentPriceUnit = getBuyUnit(global.CurrentSymbol)
          newState.currentQuantityUnit = getSellUnit(global.CurrentSymbol)
          return Object.assign({}, newState);
        case 'set current symbol':
          global.CurrentSymbol = action.payload;
          return Object.assign({}, state, {currentSymbol: action.payload});
        default:
            return state;
    }
}
