import * as fetch from 'isomorphic-fetch';
import env from '@/constants/env';
import { getToken } from '@/utils/token';

const fetchBase = (endPoint = '/hello', method = 'GET', params = {}) => {
  let url = env.API_URL + endPoint;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Json-Web-Token': getToken()
    },
  };
  if (endPoint === '/api/vcode/sms'){
    delete options.headers['Json-Web-Token']
  }
  if (method === 'GET') {
    const queryString = `?${Object.keys(params).map(k => [k, params[k]].map(encodeURIComponent).join('=')).join('&')}`;
    url += queryString;
  } else {
    (options as any).body = JSON.stringify(params);
  }
  return fetch(url, options).then((res: any) => {
    if (res.status !== 200) {
      return res.json().then((e: any) => Promise.reject(e));
    }
    return res.json();
  });
};

export default fetchBase;
