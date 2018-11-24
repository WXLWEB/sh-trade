import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import localesReducer from './locales';
import account from './account';
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
  routing,
  locales,
}>;

export const rootReducer = combineReducers<RootState>({
    routing,
    locales: localesReducer,
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
