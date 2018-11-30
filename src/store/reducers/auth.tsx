import * as Immutable from 'immutable';
import { handleActions } from 'redux-actions';

const AuthStateRecord = Immutable.Record({
    data: {},
    showLoginPopup: false,
    showRegisterPopup: false,
    needCaptcha: false,
    needGaCode: false,
    loading: false,
    loaded: false,
    showError: false,
    oldLogin: false,
    error: null,
    smsKey: ''
});

export class AuthState extends AuthStateRecord {
    data: object;
    showLoginPopup: boolean;
    showRegisterPopup: boolean;
    needCaptcha: boolean;
    needGaCode: boolean;
    loading: boolean;
    loaded: boolean;
    showError: boolean;
    oldLogin: boolean;
    error: any;
    smsKey: string;
}

const initialState = new (AuthState);

export default handleActions({
    'show login popup'(state: AuthState = initialState) {
        return state.set('showLoginPopup', true);
    },
    'close login popup'(state: AuthState = initialState) {
        return state.set('showLoginPopup', false);
    },
    'show register popup'(state: AuthState = initialState) {
        return state.set('showRegisterPopup', true);
    },
    'close register popup'(state: AuthState = initialState) {
        return state.set('showRegisterPopup', false);
    },
    // 'login request'(state: AuthState = initialState) {
    //     return state.delete('error').set('loading', true);
    // },
    'old login request'(state: AuthState = initialState) {
        return state.delete('error').set('loading', true);
    },
    'login request success'(state: AuthState = initialState, action: any) {
        return state.set('loading', false)
            .set('loaded', true)
            .set('needCaptcha', false)
            .set('needGaCode', false)
            .set('showLoginPopup', false)
            .set('showRegisterPopup', false)
            .set('error', false)
            .update('data', v => Immutable.fromJS(action.payload));
    },
    'login request failed'(state: AuthState = initialState, action: any) {
        return state.set('loading', false)
            .set('showError', true)
            .merge(Immutable.fromJS({ error: action.payload.message }));
    },
    'register request success'(state: AuthState = initialState, action: any) {
        return state.set('loading', false)
            .set('loaded', true)
            .set('needCaptcha', false)
            .set('needGaCode', false)
            .set('showLoginPopup', false)
            .set('showRegisterPopup', false)
            .set('error', false)
            .update('data', v => Immutable.fromJS(action.payload));
    },
    'register request failed'(state: AuthState = initialState, action: any) {
        return state.set('loading', false)
            .set('showError', true)
            .merge(Immutable.fromJS({ error: action.payload.message }));
    },
    'get sms vcode success'(state: AuthState = initialState, action: any) {
      return state.set('smsKey', action.payload.key);
    },
    'get sms vcode failed'(state: AuthState = initialState, action: any) {
      return state.set('loading', false)
          .set('showError', true)
          .merge(Immutable.fromJS({ error: action.payload.message }));
    },
    'get account info success'(state: AuthState = initialState) {
        return state.set('showLoginPopup', false);
    },
    'set old login request'(state: AuthState) {
        return state.set('oldLogin', true);
    },
    'set new login request'(state: AuthState) {
        return state.set('oldLogin', false);
    },
    'show gacode'(state: AuthState) {
        return state.set('needGaCode', true)
                    .set('needCaptcha', false);
    },
    'hide gacode'(state: AuthState) {
        return state.set('needGaCode', false);
    },
    'logout requested'(state: AuthState) {
        return Immutable.fromJS({
            data: {},
            needCaptcha: false,
            needGaCode: false,
            loading: false,
            loaded: false,
            showError: false,
            oldLogin: false,
            error: null,
            smsKey: '',
        });
    },
}, initialState);
