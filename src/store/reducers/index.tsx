import { combineReducers } from 'redux';
import { RouterState } from 'connected-react-router';
import { routerReducer } from 'react-router-redux';
import { default as accountReducer, AccountState } from './account';
import { default as localesReducer, LocalesState } from './locales';
import { default as socketReducer, SocketState } from './socket';
import { default as activeContractsReducer, ActiveContractsState } from './activeContracts';
import { default as orderbookReducer, OrderbookState } from './orderbook';
import { default as exectradeReducer, ExectradeState } from './exectrade';
// import { default as authReducer, AuthState } from './auth';
import ticker from './ticker';
import tos from './tos';
import terms from './terms';
import logoutStatus from './logout';
import socketAccount from './socketAccount';
import feedback from './feedback';
import execReportResponse from './execReportResponse';
// import activeContracts from './activeContracts';
// import socket from './socket';
import queryDealQuoteResponse from './queryDealQuoteResponse';
import chartData from './chartData';
import acccountInfoResponse from './accountInfoResponse';
import premiumAdjustment from './premiumAdjustment';
// import auth from './auth';
// import orderbook from './orderbook';
// import exectrade from './exectrade';
import placeOrderInfo from './placeOrderInfo';
import captcha from './captcha';
import retrieveTransactionsResponse from './retrieveTransactionsResponse';
import localStorage from './localStorage';
import tickers from './tickers';

export type RootState = Readonly<{
  router: RouterState;
  locales: LocalesState,
  account: AccountState,
  socket: SocketState,
  activeContracts: ActiveContractsState,
  orderbook: OrderbookState,
  exectrade: ExectradeState,
}>;

export const rootReducer = combineReducers<any>({
    router: routerReducer,
    locales: localesReducer,
    account: accountReducer,
    socket: socketReducer,
    activeContracts: activeContractsReducer,
    orderbook: orderbookReducer,
    exectrade: exectradeReducer,
  }
);

// const rootReducer = combineReducers({
//   routing,
//   locales,
//   // account,
//   // ticker,
//   // tos,
//   // terms,
//   // logoutStatus,
//   // socketAccount,
//   // feedback,
//   // execReportResponse,
//   // activeContracts,
//   // socket,
//   // queryDealQuoteResponse,
//   // chartData,
//   // acccountInfoResponse,
//   premiumAdjustment,
//   auth,
//   orderbook,
//   exectrade,
//   placeOrderInfo,
//   captcha,
//   retrieveTransactionsResponse,
//   localStorage,
//   tickers,
// });
//
// export default rootReducer;
