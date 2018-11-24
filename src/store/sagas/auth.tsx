import { takeLatest } from 'redux-saga';
import cookie from 'react-cookie';
import { call, put, fork } from 'redux-saga/effects';
import * as api from '@/utils/api';

function* login(action: any) {
    try {
        const res = yield call(api.login, action.payload);
        if (res) {
          yield put({ type: 'login request success', payload: res});
        }
    } catch (e) {
         yield put({ type: 'login request failed', payload: e});
    }
}

function* register(action: any) {
    try {
        const res = yield call(api.register, action.payload);
        if (res) {
          yield put({ type: 'register request success', payload: res});
        }
    } catch (e) {
         yield put({ type: 'register request failed', payload: e});
    }
}

function* getSmsVcode(action: any) {
    try {
        const res = yield call(api.getSmsVcode, action.payload);
        if (res) {
          yield put({ type: 'get sms vcode success', payload: res});
        }
    } catch (e) {
        yield put({ type: 'get sms vcode failed', payload: e});
    }
}

export default function* (): any {
    yield fork(takeLatest, 'login request', login);
    yield fork(takeLatest, 'register request', register);
    yield fork(takeLatest, 'get sms vcode', getSmsVcode);
};
