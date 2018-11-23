export interface IAccountAction {
    payload: {
        account_key?: string;
        id?: string
    };
    type: string;
};

export interface ILocalesAction {
    payload: {};
    type: string;
};

export interface ILogoutAction {
    payload: {};
    type: string;
};

export interface ITermsAction {
    payload: {
        spotusd_tos_accepted: boolean;
    };
    type: string;
};

export interface ITosAction {
    payload: string;
    type: string;
};
