import { Record } from 'immutable';
import CryptoJS from "crypto-js";
import { setToken } from '@/utils/token';
import global from  '@/constants/config'

export interface AccountAction {
    payload: {
        key: string,
        account: string,
        jwt: string,
        mobile: string,
        data: any,
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

const decryptAes = (key: string, data: string) => {
  key = CryptoJS.enc.Utf8.parse(key)
  let encryptedHexStr = CryptoJS.enc.Base64.parse(data);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: CryptoJS.enc.Utf8.parse(''), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString()
}

const initialState = new (AccountState);

export default function accountReducer(state:AccountState = initialState, action: AccountAction){
    switch (action.type) {
        case 'login request success':
            const AccountKey = decryptAes('yfdt5rh4tntes68y', action.payload.key);
            global.AccountKey = AccountKey;
            global.AccountID = action.payload.account;
            setToken(action.payload.jwt);
            return state.set('accountKey', AccountKey)
                        .set('accountID', action.payload.account)
                        .set('mobile', action.payload.mobile);
        case 'get account info success':
            const key = decryptAes('yfdt5rh4tntes68y', action.payload.data.account_key);
            global.AccountKey = key;
            global.AccountID = action.payload.data.engine_account;
            return state.set('accountKey', key)
                        .set('accountID', action.payload.data.engine_account)
                        .set('mobile', action.payload.data.mobile);
            return state;
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
