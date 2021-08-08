import { createReducer } from '@reduxjs/toolkit';

import type { ActionHandler } from '@core/types';

import setRunning from './actions';
import { SetRunningActionPayload } from './types';

interface AppState {
    running: boolean;
}

const initialState: AppState = {
    running: false,
};

const handleSetRunning: ActionHandler<AppState, SetRunningActionPayload> = (
    state,
    { payload }
) => ({
    ...state,
    running: payload.running,
});

const appReducer = createReducer(initialState, {
    [setRunning.type]: handleSetRunning,
});

export default appReducer;
