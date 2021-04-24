import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import patientsReducer from 'store/patientsSlice';
import medicationsReducer from 'store/medicationsSlice';

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
    medications: medicationsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
