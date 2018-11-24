import { createAction } from 'redux-actions';

export const startSendPublicRequest = createAction('start send public request');
export const getQuoteRequest = createAction('get quote request');
export const getBPIQuoteRequest = createAction('get bpi quote request');
export const getTradesRequest = createAction('get trades request');
export const startSendPrivateRequest = createAction('start send private request');
export const getAccountinfoRequest = createAction('get accountinfo request');
export const subscribeRequest = createAction('subscribe request');
export const unsubscribeRequest = createAction('unsubscribe request');
export const getOrdersRequest = createAction('get orders request');
export const loginRequest = createAction('login request');
export const logoutRequest = createAction('logout request');
export const placeOrderRequest = createAction('place order request');
export const queryDealQuoteRequest = createAction('query deal quote request');
export const executeDealQuoteRequest = createAction('execute deal quote request');
export const cancelOrderRequest = createAction('cancel order request');
export const cancelReplaceOrderRequest = createAction('cancel replace order request');
export const getRetrieveTransactionsRequest = createAction('get retrieve transactions request');