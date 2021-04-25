import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

const initialState: PatientState = {};

export const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    createUpdatePatient: (state, action: PayloadAction<Patient>) => {
      const { id } = action.payload;
      state[id] = {
        ...action.payload,
      };
    },
    deletePatient: (state, action: PayloadAction<{ id: string }>) => {
      delete state[action.payload.id];
    },
    addMedicationToPatient: (
      state,
      // These could be made into reusable type definitions
      action: PayloadAction<{ patientId: string; medicationId: string }>
    ) => {
      const { patientId, medicationId } = action.payload;

      const patient = state[patientId];
      state[patientId] = {
        ...patient,
        medications: [...patient.medications, medicationId],
      };
    },
    removeMedicationFromPatient: (
      state,
      action: PayloadAction<{ patientId: string; medicationId: string }>
    ) => {
      const { patientId, medicationId } = action.payload;

      const patient = state[patientId];
      state[patientId] = {
        ...patient,
        medications: patient.medications.filter((id) => id !== medicationId),
      };
    },
  },
});

// Actions
export const {
  createUpdatePatient,
  deletePatient,
  addMedicationToPatient,
  removeMedicationFromPatient,
} = patientsSlice.actions;

// Selectors
export const getAllPatients = (state: RootState) =>
  Object.values(state.patients);
export const getPatientById = (state: RootState, patientId: string) =>
  state.patients[patientId];
export const getPatientHasMedication = (
  state: RootState,
  patientId: string,
  medicationId: string
) => state.patients[patientId]?.medications.includes(medicationId);

export default patientsSlice.reducer;
