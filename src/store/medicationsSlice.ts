import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

const initialState: MedicationsState = {};

export const medicationsSlice = createSlice({
  name: 'medications',
  initialState,
  reducers: {
    // For now, it is not possible to remove medications once they are
    // added. If a medication is removed from one patient, it's not guaranteed
    // that no other patients need that medication. But there may be a
    // use for removal functionality later.
    addMedication: (state, action: PayloadAction<Medication>) => {
      const { id, nameFormStrength } = action.payload;

      // Don't add it again if it already exists.
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
