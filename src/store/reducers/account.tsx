import { Record } from 'immutable';
import { setToken } from '@/utils/token';
import global from  '@/constants/config'

export interface AccountAction {
    payload: {
        key: string,
        account: string,
        jwt: string,
        mobile: string,
    };
    type: string;
};


export class AccountState extends Record({
  accountKey: '',
  accountID: '',
  mobile: '',
}) {
  accountKey: string;
  accountID: string;
  mobile: string;
}

const initialState = new (AccountState);

export default function accountReducer(state:AccountState = initialState, action: AccountAction){
    switch (action.type) {
        case 'get account info success':
            global.AccountKey = action.payload.key;
            global.AccountID = action.payload.account;
            setToken(action.payload.jwt);
            return state.set('accountKey', action.payload.key)
                        .set('accountID', action.payload.account)
                        .set('mobile', action.payload.mobile);
        case 'logout requested':
            global.AccountKey = '';
            global.AccountID = '';
            return state.set('accountKey', '')
                        .set('accountID', '')
                        .set('mobile', '');
        default:
            return state;
    }
}
