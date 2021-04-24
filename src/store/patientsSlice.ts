import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { RootState } from 'store/store';

const initialState: PatientState = {};

export const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    createPatient: (state, action: PayloadAction<PatientForm>) => {
      // It is also possible to make email the unique identifier
      // but for deep linking to a specific user profile, it might
      // be better to use a uuid, though it is less descriptive
      // In the real world, one email does not necessarily always
      // belong to one person, either...
      const id = uuid();
      state[id] = {
        ...action.payload,
        id,
        medications: [],
      };
    },
  },
});

// Actions
export const { createPatient } = patientsSlice.actions;

// Selectors
export const getAllPatients = (state: RootState) =>
  Object.values(state.patients);

export default patientsSlice.reducer;
