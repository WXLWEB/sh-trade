import { combineReducers } from 'redux';
import { RouterState } from 'connected-react-router';
import { default as accountReducer, AccountState } from './account';
import { default as localesReducer, LocalesState } from './locales';
import ticker from './ticker';
import tos from './tos';
import terms from './terms';
import logoutStatus from './logout';
import socketAccount from './socketAccount';
import feedback from './feedback';
import execReportResponse from './execReportResponse';
import activeContracts from './activeContracts';
import socket from './socket';
import queryDealQuoteResponse from './queryDealQuoteResponse';
import chartData from './chartData';
import acccountInfoResponse from './accountInfoResponse';
import premiumAdjustment from './premiumAdjustment';
import auth from './auth';
import orderbook from './orderbook';
import exectrade from './exectrade';
import placeOrderInfo from './placeOrderInfo';
import captcha from './captcha';
import retrieveTransactionsResponse from './retrieveTransactionsResponse';
import localStorage from './localStorage';
import tickers from './tickers';

export type RootState = Readonly<{
  router: RouterState;
  locales: LocalesState,
  account: AccountState,
}>;

export const rootReducer = combineReducers<any>({
    locales: localesReducer,
    account: accountReducer,
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
