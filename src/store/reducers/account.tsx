import { Map } from 'immutable';
import * as Immutable from 'immutable';

export interface IAccountAction {
    payload: {
        account_key: string,
        id: number,
        mobile: string,
    };
    type: string;
};

export class IAccount extends Immutable.Record({
  accountKey: null,
  accountID: null,
  mobile: null,
}) {
  accountKey: number;
  accountID: number;
  mobile: string;
}


const initialState = new (IAccount);

export default function account(state: IAccount = initialState, action: IAccountAction){
    switch (action.type) {
        case 'get account info success':
            // spotAccountKey = action.payload.account_key;
            // spotAccountID = action.payload.id;
            return state.update('accountKey', v => action.payload.account_key)
                        .update('accountID', v => action.payload.id)
                        .update('mobile', v => action.payload.mobile);
        case 'get account info failed':
            console.error('get account info failed');
            return state;
        case 'logout requested':
            // spotAccountKey = null;
            // spotAccountID = null;
            return state.update('accountKey', v => null)
                        .update('accountID', v => null)
                        .update('mobile', v => null);
        default:
            return state;
    }
}
