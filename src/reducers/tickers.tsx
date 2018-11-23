import * as Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import Currency from '../constants/currency';

const ticker = Currency.filter(item => item.currency !== 'CNY').map(item => {
  const symbol = item.currency.toUpperCase() + 'CNY';
  return {
    Symbol: symbol,
    ticker: null,
  };
});
const ITickerRecord = Immutable.Record({ticker: Immutable.fromJS(ticker)});

export class ITicker extends ITickerRecord {}

const initialState = new ITicker();

export default handleActions(
  {
    'get ticker success'(state: ITicker = initialState, action: any) {
      return state.set('ticker', Immutable.fromJS(action.payload));
    },
  },
  initialState
);
