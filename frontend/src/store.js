import { combineReducers, configureStore } from '@reduxjs/toolkit';
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
import userReducer from './features/userSlice';
import scheduleReducer from './features/scheduleSlice';
import scheduleSlice from './features/scheduleSlice';
import userSlice from './features/userSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({ schedule: scheduleSlice, user: userSlice });

const persistedReducer = persistReducer(persistConfig, reducers);

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
