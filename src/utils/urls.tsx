import { enviroment } from './env';

let getUrls = (enviroment) => {
  switch (enviroment) {
    case 'development':
      return {
        HOME_URL: 'https://pro-staging.btcc.com/usd',
        API_URL: 'http://47.99.182.227:8080',
        BASE_URL: 'https://exchange-staging.btcc.com',
        SOCKET_URL: 'ws://47.99.160.177:2012',
        PROXY_URL: 'ws://47.99.160.177:2012',
        CHART_URL: 'https://pro-data-staging.btcc.com',
      };
    case 'staging':
      return {
        HOME_URL: 'https://pro-staging.btcc.com/usd',
        API_URL: 'https://api-staging.btcchina.com',
        BASE_URL: 'https://exchange-staging.btcc.com',
        SOCKET_URL: 'wss://pro-ws-staging.btcc.com:2072',
        PROXY_URL: 'wss://pro-wsp-staging.btcc.com:2076',
        CHART_URL: 'https://pro-data-staging.btcc.com',
      };
    case 'production':
      return {
        HOME_URL: 'https://pro.btcc.com/usd',
        API_URL: 'https://api.btcchina.com',
        BASE_URL: 'https://exchange.btcc.com',
        SOCKET_URL: 'wss://plus-ws.btcchina.com:443',
        PROXY_URL: 'wss://plus-wsp.btcchina.com:443',
        CHART_URL: 'https://plus-data.btcchina.com',
      };
    default:
      return {
        HOME_URL: 'https://pro.btcc.com/usd',
        API_URL: 'https://api.btcchina.com',
        BASE_URL: 'https://exchange.btcc.com',
        SOCKET_URL: 'wss://prog-ws.btcc.com:443',
        PROXY_URL: 'wss://plus-wsp.btcchina.com:443',
        CHART_URL: 'https://plus-data.btcchina.com',
      };
  }
};

export const { API_URL, BASE_URL, HOME_URL, SOCKET_URL, CHART_URL, PROXY_URL } = getUrls(enviroment);
