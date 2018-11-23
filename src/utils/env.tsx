declare var process: { env: { DEPLOY_ENV: string, NODE_ENV: string } };
// export const enviroment = 'staging';
export const enviroment = process.env.DEPLOY_ENV || 'development';
