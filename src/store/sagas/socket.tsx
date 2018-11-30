import { takeLatest } from 'redux-saga';
import { put, fork, select } from 'redux-saga/effects';
import isEmpty from 'lodash.isempty';
import env from '@/constants/env';
import global from  '@/constants/config'

function* connectSocket() {
  yield put({ type: 'clear account info'});
  let wsurl = env.SOCKET_URL;
  const ws = {
    url: wsurl,
  };
  yield put({ type: 'CONNECT', payload: ws });
};

function* closeSocket () {
  yield put({ type: 'DISCONNECT'});
  yield put({ type: 'clear account info'});
};

function* sendMessage (parameter: any) {
  yield put({type: 'SENDMESSAGE', payload: parameter});
};

function* socketConnected () {
  yield put({type: 'get active contracts request'});
  // yield put({type: 'start send public request'});
};

function* receiveMessages(actions: any) {
  const params = (actions as any).payload;
  switch (params.MsgType) {
    case 'GetActiveContractsResponse':
      yield put({type: 'get active contracts response', payload: params});
      break;
    case 'QuoteResponse':
      if (!isEmpty(params.Ticker) && global.CurrentSymbol === params.Ticker.Symbol) {
        yield put({type: 'get symbol ticker', payload: params.Ticker});
      }
      if (!isEmpty(params.Ticker) && global.CurrentSymbol === params.Ticker.Symbol) {
        yield put({type: 'get premium adjustment', payload: params.Ticker});
      }
      if (!isEmpty(params.OrderBook) && global.CurrentSymbol === params.OrderBook.Symbol) {
        yield put({type: 'get full orderbook', payload: params.OrderBook});
      }
      break;
    case 'OrderBook':
      if (Symbol === params.Symbol) {
        const orderbooks = yield select((state: any) => state.orderbook);
        const oldVersion = orderbooks.get('Version');
        if (oldVersion + 1 !== params.Version || params.Version >= 32767) {
          yield put({type: 'start send public request', payload: params.Symbol});
        }else {
          yield put({type: 'get incrementa orderbook', payload: params});
          yield put({type: 'get market depth chart'});
        }
      }
      break;
    case 'GetTradesResponse':
      yield put({type: 'get trades response', payload: params});
      break;
    case 'Ticker':
      if (Symbol === params.Symbol) {
        yield put({type: 'get symbol ticker', payload: params});
      }
      break;
    case 'ExecTrade':
      if (Symbol === params.Symbol) {
        yield put({type: 'get exectrade', payload: params});
      }
      break;
    case 'PremiumAdjustment':
      if (Symbol === params.Symbol) {
        yield put({type: 'get premium adjustment', payload: params});
      }
      break;
    case 'AccountInfo':
      yield put({type: 'get accountinfo response', payload: params});
      break;
    case 'GetAccountInfoResponse':
      yield put({type: 'get accountinfo response', payload: params.AccountInfo});
      break;
    case 'PlaceOrderResponse':
      yield put({type: 'reset feedback tips'});
      yield put({type: 'reset feedback back'});
      yield put({type: 'place order response', payload: params});
      break;
    case 'CancelOrderResponse':
      yield put({type: 'reset feedback tips'});
      yield put({type: 'reset feedback back'});
      yield put({type: 'cancel order response', payload: params});
      break;
    case 'CancelReplaceOrderResponse':
      yield put({type: 'reset feedback tips'});
      yield put({type: 'reset feedback back'});
      yield put({type: 'cancel replace order response', payload: params});
      break;
    case 'QueryDealQuoteResponse':
      yield put({type: 'query deal quote response' , payload: params});
      break;
    case 'ExecuteDealQuoteResponse':
      yield put({type: 'execute deal quote response' , payload: params});
      break;
    case 'GetOrdersResponse':
      if (!isEmpty(params.Orders)) {
        yield put({type: 'exec report order response array', payload: params.Orders});
      };
      break;
    case 'GetAccountInfoResponse':
      yield put({type: 'accountinfo response', payload: params.AccountInfo});
      break;
    case 'Order':
      if (Symbol === params.Symbol) {
        yield put({type: 'exec report order response', payload: params});
      }
      break;
    case 'LoginResponse':
      yield put({type: 'login response', payload: params});
      break;
    case 'RetrieveTransactionsResponse':
      yield put({type: 'retrieve transactions response', payload: params});
      break;
    default:
      console.log('Received unknown message type: ', params.MsgType);
      break;
  }
};

export default function* () {
    yield fork(takeLatest, 'connect socket', connectSocket);
    yield fork(takeLatest, 'close socket', closeSocket);
    yield fork(takeLatest, 'receive messages', receiveMessages);
    yield fork(takeLatest, 'send message', sendMessage);
    yield fork(takeLatest, 'socket connected', socketConnected);
}
