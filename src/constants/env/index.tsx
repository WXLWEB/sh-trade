declare var process;
declare var module;
declare var require;

/* tslint:disable */
const development = require('./development.json');
const staging = require('./staging.json');
const production = require('./production.json');


const env = { development, staging, production }[process.env.DEPLOY_ENV || 'development'] as {
  HOME_URL: string,
  CMS_URL: string,
  API_URL: string,
  API_NEW_URL: string,
  API_TRANSFER_URL: string,
  PROG_HOME: string,
  MOBI_WALLET: string
  USD_EXCHANGE_HOME: string,
  CNY_EXCHANGE_HOME: string,
  PRO_EXCHANGE_HOME: string,
  MINING_POOL_HOME: string,
  JUST_PAY_HOME: string,
  BTCC_MINT_HOME: string,
  BTCC_ACCOUNT_HOME: string,
  USD_EXCHANGE_TRADE: string,
  CNY_EXCHANGE_TRADE: string,
  PRO_EXCHANGE_TRADE: string,
  API_ACCOUNT_URL: string,
  API_TRADE_URL: string,
  API_TOS_URL: string,
  KYC_URl: string,
  API_BTCCHINA_TRANSFER_URL: string,
  BTCCHINA_HOME_URL: string,
  BTCCHINA_ACCOUNT_HOME: string,
  API_ADDRESS_URL: string,
  API_BTCCHINA_URL: string,
  API_WITHDRAW_URL: string,
  BTCCHINA_ETH_TRADE_URL: string,
  BTCCHINA_ETH_URL: string,
  BTCCHINA_POOL_URL: string,
  API_TICKER_URL: string
}

export default env;
