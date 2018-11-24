import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import * as api from '@/utils/api';
import * as isEmpty from 'lodash.isempty';
function* getChartData(actions: any) {
    try {
        const res = yield call(api.getChartData, (actions as any).payload);
        if (!res.error) {
          if (!isEmpty(res)) {
            yield put({ type: 'get chart data success', payload: res });
          }
        } else {
            yield put({ type: 'get chart data failed', error: res.error });
        }
        // const endTime = Date.now();
        // yield put({type: 'get chart data', payload: {startTime: endTime - 1000, endTime: endTime}});
    } catch (error) {
        console.log('error', error);
        yield put({ type: 'get chart data failed', error: error });
    }
};

function* getIncreaseChartData(actions: any) {
    try {
        const res = yield call(api.getChartData, (actions as any).payload);
        if (!res.error) {
          if (!isEmpty(res)) {
            yield put({ type: 'get increase chart data success', payload: res });
          }
        } else {
            yield put({ type: 'get increase chart data failed', error: res.error });
        }
        // const endTime = Date.now();
        // yield put({type: 'get chart data', payload: {startTime: endTime - 1000, endTime: endTime}});
    } catch (error) {
        console.log('error', error);
        yield put({ type: 'get chart data failed', error: error });
    }
};


export default function* () {
    yield fork(takeLatest, 'get chart data', getChartData);
    yield fork(takeLatest, 'get increase chart data', getIncreaseChartData);
}
