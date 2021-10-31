import {
    configureStore,
    combineReducers,
    ConfigureStoreOptions,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { cartReducer } from '@hooks';

import appReducer from './reducer';
import rootSaga from './saga';
import { checkoutReducer } from '../pages/checkout/store';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const makeStore = (
    initialState?: ConfigureStoreOptions['preloadedState']
) => {
    const persistConfig = {
        key: 'root',
        version: 1,
        storage,
    };

    const persistedReducer = persistReducer(
        persistConfig,
        combineReducers({
            app: appReducer,
            cart: cartReducer,
            checkout: checkoutReducer,
        })
    );

    const sagaMiddleware = createSagaMiddleware();

    const store = configureStore({
        reducer: persistedReducer,
        preloadedState: initialState,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                thunk: false,
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }).concat(sagaMiddleware),
    });

    sagaMiddleware.run(rootSaga);

    return store;
};

const store = makeStore();
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
