import { createReducer } from '@reduxjs/toolkit';

import type { ActionHandler } from '@core/types';

import { setRunningAction, setOnlineAction } from './actions';
import { SetOnlineActionPayload, SetRunningActionPayload } from './types';

interface AppState {
    running: boolean;
    online: boolean;
}

const initialState: AppState = {
    running: false,
    online: false,
};

const handleSetRunning: ActionHandler<AppState, SetRunningActionPayload> = (
    state,
    { payload }
) => ({
    ...state,
    running: payload.running,
});

const handleSetOnline: ActionHandler<AppState, SetOnlineActionPayload> = (
    state,
    { payload }
) => ({
    ...state,
    online: payload.online,
});

const appReducer = createReducer(initialState, {
    [setRunningAction.type]: handleSetRunning,
    [setOnlineAction.type]: handleSetOnline,
});

export default appReducer;
