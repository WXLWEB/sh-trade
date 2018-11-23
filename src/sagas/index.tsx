import { fork } from 'redux-saga/effects';
// import tos from './tos';
import socket from './socket';
import request from './request';
import chartData from './chartData';
import auth from './auth';

export default function* root(): void {
    // yield fork(tos);
    yield fork(socket);
    yield fork(request);
    yield fork(chartData);
    yield fork(auth);
}
