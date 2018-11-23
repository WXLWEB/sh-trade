import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import api from '../utils/api';
import * as actions from '../actions/account';

function* getAccountInfo(): void {
    try {
        const res = yield call(api.getAccountInfo, (actions as any).payload);
        if (!res.error) {
            yield put({ type: 'get account info success', payload: res });
            // yield put({ type: 'is agree term service' });
        } else {
            yield put({ type: 'get account info failed', error: res.error });
        }
    } catch (error) {
        console.log('error', error);
        yield put({ type: 'get account info failed', error: error });
    }
};

export default function* (): void {
    yield fork(takeLatest, 'get account info', getAccountInfo);
}
