import * as fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';
import env from '../constants/env';
import { API_URL } from './urls';

const updateJWT = (recToken) => {
  if (recToken.indexOf('.') > -1) {
    const jwtInfoBase64 = recToken.split('.')[1];
    const jwtInfo = JSON.parse(atob(jwtInfoBase64));
    const isKeepLogin = Date.now() / 1000 < jwtInfo.exp - 86400;
    const jwtOption = {
      domain: 'btcc.com',
      path: '/',
      secure: true,
    };
    const jwtOption2 = {
      domain: 'btcc.com',
      path: '/',
      secure: true,
    };
    if (isKeepLogin) {
      (jwtOption as any).expires = new Date(Date.now() + (30 * 1000));
    }
    cookie.save('btcchina_jwt', recToken, jwtOption);
    cookie.save('btcchina_jwt', recToken, jwtOption2);
  }
};

const fetchBase = (endPoint = '/hello', method = 'GET', params = {}) => {
  let url = API_URL + endPoint;
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  if (method === 'GET') {
    const queryString = `?${Object.keys(params).map(k => [k, params[k]].map(encodeURIComponent).join('=')).join('&')}`;
    url += queryString;
  } else {
    (options as any).body = JSON.stringify(params);
  }
  return fetch(url, options).then((res) => {
    if (!res.ok) {
      return res.json().then(e => Promise.reject({ message: e }));
    }
    return res.json();
  });
};

export default fetchBase;
