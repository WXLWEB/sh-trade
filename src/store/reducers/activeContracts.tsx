import filter from 'lodash.filter';

export interface ActiveContractsState {
  contracts:{
    CNZ: ReadonlyArray<any>
    ETH: ReadonlyArray<any>
    EOS: ReadonlyArray<any>
  }
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
  }
};

export interface Contract {
  Symbol: string;
  Quantity: number;
};

const matchSymbol = (arr: any, coin: string) => {
  return filter(arr, (obj: any) => {
    return obj.Symbol ? obj.Symbol.indexOf(coin) !== -1 : false
  })
}

export default function activeContractsReducer(state: ActiveContractsState = initialState, action: ActiveContractsAction): any {
    let newState: ActiveContractsState = {
      contracts:{
        CNZ: [],
        ETH: [],
        EOS: [],
      }
    }
    switch (action.type) {
        case 'get active contracts response':
          newState.contracts.CNZ = matchSymbol(action.payload.Contracts, 'CNZ');
          newState.contracts.ETH = matchSymbol(action.payload.Contracts, 'ETH');
          newState.contracts.EOS = matchSymbol(action.payload.Contracts, 'EOS');
          return Object.assign({}, state, newState);
        default:
            return state;
    }
}
