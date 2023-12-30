import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';
import chatroomSlice from './chatroomSlice';

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    user: userReducer,
    chatroom: chatroomSlice
});

const persistRedux = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistRedux,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);