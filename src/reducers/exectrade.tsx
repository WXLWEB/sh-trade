import * as Immutable from 'immutable';
import { List } from 'immutable';
import * as _ from 'lodash';

export class IExectrade extends Immutable.Record({
    Trades: Immutable.List([{
      ShortTime: '-',
      Price:  '-',
      Quantity: '-',
      Side:   '-',
      Symbol: '-',
    }]),
}) {
    Trades: Immutable.List<>;
}


export interface IExectradeAction {
    payload: {

    };
};

const initialState = new(IExectrade);

export default function activeContracts(state: IExectrade = initialState, action: IExectradeAction): any {
    switch (action.type) {
        case 'get trades response':
          if (_.isEmpty(action.payload.Trades)) {
            return state.set('Trades', Immutable.List([{
              ShortTime: '-',
              Price:  '-',
              Quantity: '-',
              Side:   '-',
              Symbol: '-',
            }]));
          }
          const newState = action.payload.Trades.map(trade => {
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
