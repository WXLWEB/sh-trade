export interface IConnectIntlState {
    locales: {
        lang: string,
        messages: string
    };
};

export interface IConnectIntlReturn {
    locale: string;
    messages: string;
};
