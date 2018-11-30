// declare var process;
// declare var module;
// declare var require;

/* tslint:disable */
const development = require('./development.json');
const staging = require('./staging.json');
const production = require('./production.json');

const env = { development, staging, production }[process.env.DEPLOY_ENV || 'development'] as {
  ENV: string;
  API_URL: string;
  SOCKET_URL: string;
  CHART_URL: string;
}

export default env;
