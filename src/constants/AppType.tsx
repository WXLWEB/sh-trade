import { ITos, ILogout, INavigation} from './ReducerType';
import { ITicker } from '../reducers/ticker';
import { ILocales } from '../reducers/locales';
import { IActiveContracts } from '../reducers/activeContracts';
import { ISocket } from '../reducers/socket';
import { IPlaceOrderResponse } from '../reducers/placeOrderResponse';
import { IExecReportResponse } from '../reducers/execReportResponse';
import { IChartData } from '../reducers/chartData';
import { IAccountInfoResponse } from '../reducers/accountInfoResponse';
import { IAccount } from '../reducers/account';
import { IAuth } from '../reducers/auth';
import { ICaptcha } from '../reducers/captcha';
import { ITerms } from '../reducers/terms';
import { IQueryDealQuoteResponse } from '../reducers/queryDealQuoteResponse';
import { IExecTrade } from '../reducers/exectrade';
import { IPlaceOrderInfo } from '../reducers/placeOrderInfo';
import { IRetrieveTransactionsResponse } from '../reducers/retrieveTransactionsResponse';

export interface IaLLMapState {
    locales: ILocales;
    account: IAccount;
    logoutStatus: ILogout;
    ticker: ITicker;
    tos: ITos;
    terms: ITerms;
    placeOrderResponse: IPlaceOrderResponse;
    socket: ISocket;
    navigation: INavigation;
    activeContracts: IActiveContracts;
    execReportResponse: IExecReportResponse;
    chartData: IChartData;
    accountInfoResponse: IAccountInfoResponse;
    auth: IAuth;
    captcha: ICaptcha;
    queryDealQuoteResponse: IQueryDealQuoteResponse;
    exectrade: IExecTrade;
    placeOrderInfo: IPlaceOrderInfo;
    retrieveTransactionsResponse: IRetrieveTransactionsResponse;
    routing: any;
};

export interface IcontentProps {
    lang: string;
    ticker: ITicker;
    tos: ITos;
    terms: ITerms;
    account: IAccount;
    socket: ISocket;
}

export interface IcontentState {
    showTermOfService: boolean;
};

export interface ItosProps {
    actions?: any;
    closeTerm: () => void;
    terms?: ITerms;
    tos?: ITos;
}

export interface ItosState {
    submitting: boolean;
};

export interface IheaderProps {
    account: IAccount;
    terms: ITerms;
    ticker: ITicker;
    showTerm: () => void;
    response?: IPlaceOrderResponse;
    actions?: any;
}

export interface IheaderState {
}

export interface IContentProps {
}

export interface IContentState {
}

export interface IaffiliateProps {
    lang: string;
}

export interface IaffiliateState {
}

export interface IliquidityProps {
}

export interface IliquidityState {
}

export interface IsupportProps {
}

export interface IsupportState {
}

export interface IdownloadProps {
}

export interface IdownloadState {
}

export interface IappLinkProps {
}

export interface IappLinkState {
    showApp: boolean;
}

export interface IintroduceProps {
}

export interface IintroduceState {
}

export interface ItradeUIProps {
}

export interface ItradeUIState {
}

export interface IfeedbackProps {
  response?: {
        tipSuccess: boolean;
        tipFailed: boolean;
        backSuccess: boolean;
        backFailed: boolean;
        error: boolean;
        failed?: {
            insufficient: boolean;
            incorrectQuantity: boolean;
            otherError: boolean;

        };
  };
  responseError?: boolean;
  actions?: any;
}

export interface IfeedbackState {
}
