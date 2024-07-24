import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    user : userReducer
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
  };

const persistReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistReducer,
});

export const persistor = persistStore(store);
