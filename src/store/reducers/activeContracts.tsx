import { Map, List } from 'immutable';
import * as Immutable from 'immutable';

export class IActiveContracts extends Immutable.Record({
    Contracts: Immutable.Map({
      'ETH_BTC': {
        Fee: 0.002,
      },
      'BCC_BTC': {
        Fee: 0.002,
      },
    }),
}) {
    Contracts: any;
}


export interface IActiveContractsAction {
    payload: {
       Contracts: any
    };
    type: string;
};

const initialState = new(IActiveContracts);

export default function activeContracts(state: IActiveContracts = initialState, action: IActiveContractsAction): any {
    switch (action.type) {
        case 'get active contracts response':
          // const newState = Map();
          // action.payload.Contracts.forEach(contract => {
          //    newState = newState.update(contract.Symbol, v => contract);
          // });
          return state;
        default:
            return state;
    }
}
