import { enviroment } from './env';

export const enableLog = (enviroment === 'development') || (enviroment === 'staging');
