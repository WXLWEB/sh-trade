import { combineReducers } from 'redux';
import { RouterState } from 'connected-react-router';
import { routerReducer } from 'react-router-redux';
import { default as accountReducer, AccountState } from './account';
import { default as localesReducer, LocalesState } from './locales';
import { default as socketReducer, SocketState } from './socket';
import { default as activeContractsReducer, ActiveContractsState } from './activeContracts';
import { default as orderbookReducer, OrderbookState } from './orderbook';
import { default as exectradeReducer, ExectradeState } from './exectrade';
import { default as execReportResponseReducer, ExecReportResponseState } from './execReportResponse';
import { default as accountInfoResponseReducer, AccountInfoResponseState } from './accountInfoResponse';
import { default as feedbackReducer, FeedbackState } from './feedback';
import { default as tickerReducer, TickerState } from './ticker';

export type RootState = Readonly<{
  router: RouterState;
  locales: LocalesState,
  account: AccountState,
  socket: SocketState,
  activeContracts: ActiveContractsState,
  orderbook: OrderbookState,
  exectrade: ExectradeState,
  execReportResponse: ExecReportResponseState,
  acccountInfoResponse: AccountInfoResponseState,
  feedback: FeedbackState,
  ticker: TickerState,
}>;

export const rootReducer = combineReducers<any>({
    router: routerReducer,
    locales: localesReducer,
    account: accountReducer,
    socket: socketReducer,
    activeContracts: activeContractsReducer,
    orderbook: orderbookReducer,
    exectrade: exectradeReducer,
    execReportResponse: execReportResponseReducer,
    accountInfoResponse: accountInfoResponseReducer,
    feedback: feedbackReducer,
    ticker: tickerReducer,
  });
