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

// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';
// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// import appReducer from './reducer';
// import rootSaga from './saga';

// // const isClient = typeof window !== 'undefined';

// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
// };

// const sagaMiddleware = createSagaMiddleware();

// const persistedReducer = persistReducer(
//     persistConfig,
//     combineReducers({ app: appReducer })
// );

// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: getDefaultMiddleware =>
//         getDefaultMiddleware({
//             thunk: false,
//             serializableCheck: {
//                 ignoredActions: [
//                     FLUSH,
//                     REHYDRATE,
//                     PAUSE,
//                     PERSIST,
//                     PURGE,
//                     REGISTER,
//                 ],
//             },
//         }).concat(sagaMiddleware),
// });

// sagaMiddleware.run(rootSaga);

// export const persistor = persistStore(store);
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;
