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
import appointmentSlice from './features/appointmentSlice';
import scheduleSlice from './features/scheduleSlice';
import userSlice from './features/userSlice';

const reducers = combineReducers({
  appointment: appointmentSlice,
  schedule: scheduleSlice,
  user: userSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['appointment', 'schedule'],
};

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
