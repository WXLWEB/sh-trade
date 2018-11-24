import { Map } from 'immutable';
import * as Immutable from 'immutable';

export class IPremiumAdjustment extends Immutable.Record({
    DailyFrequency: '',
}) {
    readonly DailyFrequency: string;
}


export interface IPremiumAdjustmentAction {
    payload: {
            Last: number;
            Volume24H: number;
            PrevCls: number;
            CCF: number;
            readonly AskPrice: number;
            readonly BidPrice: number;
    };
    type: string;
};

const initialState = new(IPremiumAdjustment);

export default function premiumAdjustment(state: IPremiumAdjustment = initialState, action: IPremiumAdjustmentAction): any {
    switch (action.type) {
        case 'premium ddjustment':
          if (action.payload.CCF === 1) {
            return Map({DailyFrequency: 1 });
          }
          if (action.payload.CCF === 2) {
            return Map({DailyFrequency: 3 });
          }
          break;
        default:
            return state;
    }
}
