import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import api from '../utils/api';
import * as actions from '../actions/locales';

function* logout() {
    try {
        const res = yield call(api.logout, (actions as any).payload);
        if (!res.error) {
            yield put({ type: 'logout success', payload: res });
        } else {
            yield put({ type: 'logout failed', error: res.error });
        }
    } catch (error) {
        console.log('error', error);
        yield put({ type: 'logout failed', error: error });
    }
};

function* updateUserConfig(actions: any) {
    try {
        const res = yield call(api.updateUserConfig, (actions as any).payload);
        if (!res.error) {
            yield put({ type: 'update user config success', payload: res });
        } else {
            yield put({ type: 'update user config failed', error: res.error });
        }
    } catch (error) {
        console.log('error', error);
        yield put({ type: 'update user config failed', error: error });
    }
};

export default function* () {
    yield fork(takeLatest, 'logout', logout);
    yield fork(takeLatest, 'update user config', updateUserConfig);
}
