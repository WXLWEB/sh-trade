import { takeLatest } from 'redux-saga';
import { put, fork } from 'redux-saga/effects';
import wsRequest from '@/utils/wsRequest';

function* getActiveContractsRequest() {
   yield put({ type: 'SENDMESSAGE', payload: wsRequest.createGetActiveContractsRequest() });
}

function* getQuoteRequest(parameter: any) {
    yield put({ type: 'SENDMESSAGE', payload: wsRequest.createQuoteRequest(parameter.payload, '2')});
}

function* getBPIQuoteRequest(parameter: any) {
    yield put({ type: 'SENDMESSAGE', payload: wsRequest.createQuoteRequest(parameter.payload, '2')});
}

function* getTradesRequest(parameter: any) {
    yield put({ type: 'SENDMESSAGE',  payload: wsRequest.createGetTradesRequest(parameter.payload.symbol, parameter.payload.count)});
}

function* loginRequest() {
    yield put({ type: 'SENDMESSAGE', payload: wsRequest.createLoginRequest() });
}

function* logoutRequest() {
    yield put({ type: 'SENDMESSAGE', payload: wsRequest.createLogoutRequest() });
}

function* getAccountinfoRequest() {
    yield put({ type: 'SENDMESSAGE', payload: wsRequest.createGetAccountInfoRequest() });
}

function* subscribeRequest() {
  yield put({ type: 'SENDMESSAGE', payload: wsRequest.createSubscribeRequest() });
}

function* unsubscribeRequest() {
  yield put({ type: 'SENDMESSAGE', payload: wsRequest.createUnsubscribeRequest() });
}

function* getOrdersRequest(parameter: any) {
    yield put({ type: 'SENDMESSAGE', payload: wsRequest.createGetOrdersRequest(parameter.payload, '0', Date.now().toString(), 'A,0,1,2') });
    yield put({ type: 'SENDMESSAGE', payload: wsRequest.createGetOrdersRequest(parameter.payload, (Date.now() - 1000 * 60 * 60 * 24 * 7).toString(), (Date.now() + 1000 * 60 * 60 * 24).toString(), '2,3,4,S' ) });
}

function* startSendPublicRequest(parameter: any) {
    yield put({ type: 'get quote request', payload: parameter.payload});
    yield put({ type: 'get trades request', payload: {symbol: parameter.payload, count: '20'}});
}

function* startSendPrivateRequest(parameter: any) {
    // yield put({ type: 'login request'});
    yield put({ type: 'get accountinfo request'});
    yield put({ type: 'subscribe request'});
    yield put({ type: 'get orders request', payload: parameter.payload});
}

function* placeOrderRequest(order: any) {
  // symbol, side, orderType, quantity, price, stopPrice, exprDate, exprTime
  yield put({ type: 'SENDMESSAGE', payload: wsRequest.createPlaceOrderRequest(order.payload.symbol , order.payload.side, order.payload.orderType, order.payload.quantity, order.payload.price, order.payload.stopPrice)});
}

function* queryDealQuoteRequest(order: any) {
  yield put({ type: 'SENDMESSAGE', payload: wsRequest.createQueryDealQuoteRequest(order.payload.symbol, order.payload.side)});
}

function* executeDealQuoteRequest(order: any) {
  yield put({ type: 'SENDMESSAGE', payload: wsRequest.createExecuteDealQuoteRequest(order.payload.symbol, order.payload.quantity)});
}

function* cancelOrderRequest(parameter: any) {
  yield put({ type: 'SENDMESSAGE', payload: wsRequest.createCancelOrderRequest(parameter.payload.symbol, parameter.payload.OID)});
}

function* cancelReplaceOrderRequest(parameter: any) {
  yield put({ type: 'SENDMESSAGE', payload: wsRequest.createCancelReplaceOrderRequest(parameter.payload.symbol, parameter.payload.OID, parameter.payload.quantity, parameter.payload.price, parameter.payload.stopPrice, parameter.payload.oldQuantity)});
}

function* getRetrieveTransactionsRequest(parameter: any) {
  yield put({ type: 'SENDMESSAGE', payload: wsRequest.createRetrieveTransactionsRequest(parameter.payload.symbol, parameter.payload.start, parameter.payload.end, 'TRADES', parameter.payload.page, parameter.payload.itemsPerPage)});
}

export default function* () {
    yield fork(takeLatest, 'get active contracts request', getActiveContractsRequest);
    yield fork(takeLatest, 'place order request', placeOrderRequest);
    yield fork(takeLatest, 'start send public request', startSendPublicRequest);
    yield fork(takeLatest, 'get quote request', getQuoteRequest);
    yield fork(takeLatest, 'get bpi quote request', getBPIQuoteRequest);
    yield fork(takeLatest, 'get trades request', getTradesRequest);
    yield fork(takeLatest, 'start send private request', startSendPrivateRequest);
    yield fork(takeLatest, 'login request', loginRequest);
    yield fork(takeLatest, 'logout request', logoutRequest);
    yield fork(takeLatest, 'get accountinfo request', getAccountinfoRequest);
    yield fork(takeLatest, 'subscribe request', subscribeRequest);
    yield fork(takeLatest, 'unsubscribe request', unsubscribeRequest);
    yield fork(takeLatest, 'get orders request', getOrdersRequest);
    yield fork(takeLatest, 'query deal quote request', queryDealQuoteRequest);
    yield fork(takeLatest, 'execute deal quote request', executeDealQuoteRequest);
    yield fork(takeLatest, 'cancel order request', cancelOrderRequest);
    yield fork(takeLatest, 'cancel replace order request', cancelReplaceOrderRequest);
    yield fork(takeLatest, 'get retrieve transactions request', getRetrieveTransactionsRequest)
}
