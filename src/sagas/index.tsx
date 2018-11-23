import { fork } from 'redux-saga/effects';
import locales from './locales';
import account from './account';
import tos from './tos';
import socket from './socket';
import request from './request';
import chartData from './chartData';
import auth from './auth';
import static from './static';

export default function* root(): void {
    yield fork(locales);
    yield fork(account);
    yield fork(tos);
    yield fork(socket);
    yield fork(request);
    yield fork(chartData);
    yield fork(auth);
    yield fork(static);
}
