import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

const initialState: MedicationsState = {};

export const medicationsSlice = createSlice({
  name: 'medications',
  initialState,
  reducers: {
    addMedication: (state, action: PayloadAction<Medication>) => {
      const { id, nameFormStrength } = action.payload;

      if (!state[id]) {
        state[id] = nameFormStrength;
      }
    },
  },
});

// Actions
export const { addMedication } = medicationsSlice.actions;

// Selectors
export const getMedicationById = (state: RootState, medicationId: string) =>
  state.medications[medicationId];
export const getMedicationByIds = (state: RootState, medicationIds: string[]) =>
  medicationIds.map((id) => ({ id, name: state.medications[id] }));

export default medicationsSlice.reducer;
