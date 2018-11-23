// import { takeLatest } from 'redux-saga';
// import { call, put, fork } from 'redux-saga/effects';
// import api from '../utils/api';
// import * as actions from '../actions/tos';
//
// function* getTos(actions: any) {
//     try {
//         const res = yield call(api.getTos, (actions as any).payload);
//         if (!res.error) {
//             yield put({ type: 'get tos success', payload: res });
//         } else {
//             yield put({ type: 'get tos failed', error: res.error });
//         }
//     } catch (error) {
//         console.log('error', error);
//         yield put({ type: 'get tos failed', error: error });
//     }
// };
//
// function* getSpotBalance() {
//     try {
//         const res = yield call(api.getSpotBalance, (actions as any).payload);
//         if (!res.error) {
//             yield put({ type: 'get spot balance success', payload: res });
//         } else {
//             yield put({ type: 'get spot balance failed', error: res.error });
//         }
//     } catch (error) {
//         console.log('error', error);
//         yield put({ type: 'get spot balance failed', error: error });
//     }
// };
//
// function* agreeTos() {
//     try {
//         const res = yield call(api.agreeTos, (actions as any).payload);
//         if (!res.error) {
//             yield put({ type: 'agree tos success', payload: res });
//         } else {
//             yield put({ type: 'agree tos failed', error: res.error });
//         }
//     } catch (error) {
//         console.log('error', error);
//         yield put({ type: 'agree tos failed', error: error });
//     }
// };
//
// export default function* () {
//     yield fork(takeLatest, 'get tos', getTos);
//     yield fork(takeLatest, 'get spot usd balance', getSpotBalance);
//     yield fork(takeLatest, 'agree tos', agreeTos);
// }
