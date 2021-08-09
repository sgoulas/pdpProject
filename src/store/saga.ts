/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeEvery, put, spawn } from 'redux-saga/effects';

import { setRunningAction, setOnlineAction } from './actions';

function* setOnline(action: any) {
    const { running } = action.payload;
    yield put(setOnlineAction({ online: running }));
}

function* setOnlineSaga() {
    yield takeEvery(setRunningAction.type, setOnline);
}

function* rootSaga() {
    yield spawn(setOnlineSaga);
}

export default rootSaga;
