import env from '@/constants/env';

const enableLog = (env.ENV === 'development') || (env.ENV === 'staging');

export default (store: any) => (next: any) => (action: any) => {
  if (enableLog && (action.type !== 'receive messages') && (action.type !== 'get symbol ticker')) {
    console.log(action);
  }
  return next(action);
};
