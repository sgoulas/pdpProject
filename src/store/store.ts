import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import appReducer from './reducer';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        app: appReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
