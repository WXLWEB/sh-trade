import { createAction } from 'redux-actions';

export const loginRequest = createAction('login request');
export const getAccountInfo = createAction('get account info');
export const loginRequestSuccess = createAction('login request success');
export const registerRequest = createAction('register request');
export const getSmsVcode = createAction('get sms vcode');
export const logout = createAction('logout requested');
