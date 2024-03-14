import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts'] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
