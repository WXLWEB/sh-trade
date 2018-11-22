import { Map } from 'immutable';
import * as Immutable from 'immutable';

export interface IQueryDealQuoteResponseAction {
    payload: {
        ExpirationTime: number,
        Price: number,
        RC: string,
    };
    type: string;
};

export class IQueryDealQuoteResponse extends Immutable.Record({
  ExpirationTime: 0,
  Price: 0,
  Side: '',
  DealModal: false,
  resetInput: false,
}) {
  ExpirationTime: number;
  Price: number;
  Side: string;
  DealModal: boolean;
  resetInput: boolean;
}

const initialState = new (IQueryDealQuoteResponse);

export default function queryDealQuoteResponse(state: IQueryDealQuoteResponse = initialState, action: IQueryDealQuoteResponseAction) {
  switch (action.type) {
    case 'query deal quote response':
      if (action.payload.RC === '0') {
        return state.update('ExpirationTime', v => action.payload.ExpirationTime)
                    .update('Price', v => action.payload.Price)
                    .update('DealModal', v => true)
                    .update('resetInput', v => false);
      } else {
        return state.update('DealModal', v => false);
      };
      break;
    case 'execute deal quote response':
      return state.update('ExpirationTime', v => 0)
                  .update('DealModal', v => false)
                  .update('resetInput', v => true);
    case 'query deal quote request':
      return state.update('Side', v => action.payload.side);
    default:
      return state;
  }
}
