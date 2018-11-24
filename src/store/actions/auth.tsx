import { createAction } from 'redux-actions';

export const loginRequest = createAction('login request');
export const registerRequest = createAction('register request');
export const getSmsVcode = createAction('get sms vcode');
export const setNewLoginRequest = createAction('set new login request');
export const logout = createAction('logout requested');
export const hideGaCode = createAction('hide gacode');
export const agreeTerms = createAction('agree terms requested');
export const closeTerm = createAction('close terms popup');
export const openTerm = createAction('open terms popup');
export const showPopup = createAction('show login popup');
export const showRegisterPopup = createAction('show register popup');
export const closeLoginPopup = createAction('close login popup');
export const closeRegisterPopup = createAction('close register popup');
