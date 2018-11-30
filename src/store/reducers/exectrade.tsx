import * as Immutable from 'immutable';
import { List } from 'immutable';
import isEmpty from 'lodash.isempty';

export class ExectradeState extends Immutable.Record({
    Trades: Immutable.List([{
      ShortTime: '-',
      Price:  '-',
      Quantity: '-',
      Side:   '-',
      Symbol: '-',
    }]),
}) {
    Trades: any;
}


export interface ExectradeAction {
    payload: {
      Trades: any;
      Timestamp: string;
      Price: string;
      Size: string;
      Side: string;
      Symbol: string;
    };
    type: string;
};

const initialState = new(ExectradeState);

export default function exectradeReducer(state: ExectradeState = initialState, action: ExectradeAction): any {
    switch (action.type) {
        case 'get trades response':
          if (isEmpty(action.payload.Trades)) {
            return state.set('Trades', Immutable.List([{
              ShortTime: '-',
              Price:  '-',
              Quantity: '-',
              Side:   '-',
              Symbol: '-',
            }]));
          }
          const newState = action.payload.Trades.map((trade: any) => {
            return {ShortTime: trade.Timestamp, Price: trade.Price, Quantity: trade.Size, Side: trade.Side, Symbol: trade.Symbol};
          });
          return state.set('Trades', List(newState));
        case 'get exectrade':
          const newTrade = action.payload;
          return state.update('Trades', v => state.get('Trades').unshift({ShortTime: newTrade.Timestamp, Price: newTrade.Price, Quantity: newTrade.Size, Side: newTrade.Side, Symbol: newTrade.Symbol}).slice(0, 10));
        default:
            return state;
    }
}
