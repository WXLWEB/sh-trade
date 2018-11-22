import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import Currency from '../constants/currency';
import * as api from '../utils/api';

function* getTermsContent(action: any) {
    try {
        const res = yield call(api.getTermsContent, action.payload);
        if (!res.error) {
            yield put({ type: 'get terms content success', payload: res });
        } else {
            yield put({ type: 'get terms content failed', error: res });
        }
    } catch (e) {
        yield put({ type: 'get terms content failed', payload: e });
    }
}

function* getTicker(action: any) {
  try {
    const res = yield Currency.filter(item => item.currency !== 'CNY').map( item => {
      const symbol = item.currency + 'CNY';
      return call(api.getTicker, symbol);
    });
    yield put({ type: 'get ticker success', payload: res });
    yield put({ type: 'get innovative balance' });
  } catch (e) {
    yield put({ type: 'get ticker failed', payload: e });
  }
}

export default function* (): void {
    yield fork(takeLatest, 'get terms content', getTermsContent);
    yield fork(takeLatest, 'get ticker', getTicker);
};
