import { Map } from 'immutable';
import * as Immutable from 'immutable';

export interface IExecuteDealQuoteResponseAction {
    payload: {
        ExpirationTime: number,
        Price: number,
        RC: string,
    };
    type: string;
};

export class IExecuteDealQuoteResponse extends Immutable.Record({
  ExpirationTime: 0,
  Price: 0,
}) {
  ExpirationTime: number;
  Price: number;
}

const initialState = new (IExecuteDealQuoteResponse);

export default function executeDealQuoteResponse(state: IExecuteDealQuoteResponse = initialState, action: IExecuteDealQuoteResponseAction) {
  switch (action.type) {
    case 'execute deal quote response':
      if (action.payload.RC === '0') {
        return Map({
          ExpirationTime: action.payload.ExpirationTime,
          Price: action.payload.Price,
        });
      } else {
        return state;
      };
      break;
    default:
      return state;
  }
}
