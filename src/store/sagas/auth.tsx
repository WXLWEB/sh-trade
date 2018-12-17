import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import * as api from '@/utils/api';
import emitter from '@/utils/events';

function* login(action: any) {
    try {
        const res = yield call(api.login, action.payload);
        if (res.succeed) {
          yield put({ type: 'login request success', payload: res});
        }else {
          yield put({ type: 'login request failed', payload: res});
        }
    } catch (e) {
         yield put({ type: 'login request failed', payload: e});
    }
}

function* getAccountInfo(action: any) {
    try {
        const res = yield call(api.getAccountInfo, action.payload);
        if (res.succeed) {
          yield put({ type: 'get account info success', payload: res});
        }else {
          yield put({ type: 'get account info failed', payload: res});
        }
    } catch (e) {
         yield put({ type: 'get account info failed', payload: e});
    }
}

function* register(action: any) {
    try {
        const res = yield call(api.register, action.payload);
        if (res.succeed) {
          yield put({ type: 'register request success', payload: res});
        }else {
          yield put({ type: 'register request failed', payload: res});  
        }
    } catch (e) {
         yield put({ type: 'register request failed', payload: e});
    }
}

function* getSmsVcode(action: any) {
    try {
        const res = yield call(api.getSmsVcode, action.payload);
        if (res.succeed) {
          yield put({ type: 'get sms vcode success', payload: res});
        }
    } catch (e) {
        yield put({ type: 'get sms vcode failed', payload: e});
    }
}

export default function* (): any {
    yield fork(takeLatest, 'login request', login);
    yield fork(takeLatest, 'get account info', getAccountInfo);
    yield fork(takeLatest, 'register request', register);
    yield fork(takeLatest, 'get sms vcode', getSmsVcode);
};
