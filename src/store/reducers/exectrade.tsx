import { List, Record } from 'immutable';
import { handleActions } from 'redux-actions';

export class ExectradeState extends Record({
    Trades: List([{
      Timestamp: '-',
      Price:  '-',
      Size: '-',
      Side:   '-',
      Symbol: '-',
    }]),
}) {
    Trades: any;
}

export interface TradesResponseAction {
    payload: {
      Trades: any[];
    };
    type: string;
};
export interface TradeAction {
    payload: {
      Timestamp: string;
      Price: string;
      Size: string;
      Side: string;
      Symbol: string;
    };
    type: string;
};

const initialState = new (ExectradeState);

export default handleActions({
    'get trades response' (state: ExectradeState = initialState, action: TradesResponseAction) {
      return state.set('Trades', List(action.payload.Trades));
    },
    'get exectrade' (state: ExectradeState = initialState, action: TradeAction) {
      return state.update('Trades', v => v.splice(0, 0, action.payload).pop());
    },
    'disconnected' (state: ExectradeState = initialState) {
      return state.set('Trades', List([{
        Timestamp: '-',
        Price:  '-',
        Size: '-',
        Side:   '-',
        Symbol: '-',
      }]))
    }
}, initialState);
