import * as fetch from 'isomorphic-fetch';
import * as es6promise from 'es6-promise';
import env from '../constants/env';

es6promise.polyfill();
import cookie from 'react-cookie';
import { API_URL } from './urls';
import { enableLog } from './log';
import * as uuid from 'uuid4';

interface IJwtOption {
    domain: string;
    path: string;
    secure: boolean;
    expires?: string;
}

const jsonrpcFetch = (path = '', method = '', params = {}) => {
    return fetch(API_URL + path, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Json-Web-Token': cookie.load('btcchina_jwt') || '',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            method: method,
            id: uuid(),
            params: params,
        }),
    }).then((response) => {
        if (response.status === 200 && response.headers['Last-Modified']) {
            const recToken = response.headers.get('Last-Modified');
            if (recToken.indexOf('.') > -1) {
                let jwtInfoBase64 = recToken.split('.')[1];
                let jwtInfo = JSON.parse(atob(jwtInfoBase64));
                let isKeepLogin = (+new Date) / 1000 < jwtInfo.exp - 86400;
                let jwtOption: IJwtOption = {
                    domain: '.btcc.com',
                    path: '/',
                    secure: true,
                };
                let jwtOption2 = {
                    domain: '.btcchina.com',
                    path: '/',
                    secure: true,
                };
                if (isKeepLogin) {
                    jwtOption.expires = (new Date(Date.now() + 30 * 1000)).toString();
                }
                cookie.save('btcchina_jwt', recToken, jwtOption);
                cookie.save('btcchina_jwt', recToken, jwtOption2);
            }
        }
        return response.json();
    }).then((response) => {
        if (typeof response === 'object' && response.result) {
            return response.result;
        }
        return response;
    }).catch((error) => {
        console.log('error:', error);
        if (enableLog) {
            console.log(error);
        }
    });
};

const queryString = ({ captcha, twofactorpwd, keepLogin }) => {
    let qs = '';
    if (captcha) { qs += `captcha=${captcha}`; }
    if (twofactorpwd) { qs += `&twofactorpwd=${twofactorpwd}`; }
    if (keepLogin) { qs += `&keepLogin=${keepLogin}`; }
    return qs;
};

const loginRequest = ({ mobile, password, captcha, twofactorpwd, keepLogin }) => fetch(`${env.API_URL}/api/v1/login/mobile`, {
    method: 'POST',
    headers: {
        Authorization: `Basic ${btoa(unescape(encodeURIComponent(`${mobile}:${password}`)))}`,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: queryString({ captcha, twofactorpwd, keepLogin }),
}).then((res: any) => {
    if (res.status === 200 && res.headers.get('Last-Modified')) {
        const token = res.headers.get('Last-Modified');
        if (token.indexOf('.') > -1) {
            const jwtInfoBase64 = token.split('.')[1];
            const jwtInfo = JSON.parse(atob(jwtInfoBase64));
            const isKeepLogin = (Date.now()) / 1000 < jwtInfo.exp - 86400;
            const jwtOption = {
                domain: 'btcc.com',
                path: '/',
                expires: new Date(Date.now() + (3600 * 1000 * 24 * 365)),
            };
            const jwtOption2 = {
                domain: 'btcchina.com',
                path: '/',
                expires: new Date(Date.now() + (3600 * 1000 * 24 * 365)),
            };
            if (isKeepLogin) {
                (jwtOption as any).expires = new Date(Date.now() + (30 * 1000));
            }
            cookie.save('btcchina_jwt', token, jwtOption);
            cookie.save('btcchina_jwt', token, jwtOption2);
        }
        return { token };
    }
    return res.text().then(e => Promise.reject({ message: e }));
});

export {
    jsonrpcFetch,
    loginRequest,
}
