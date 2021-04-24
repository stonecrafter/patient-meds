type Medication = {
  id: string;
  nameFormStrength: string;
};

type PatientForm = {
  firstName: string;
  lastName: string;
  // Stored as timestamp
  dateOfBirth: number;
  email: string;
};

// Data model stored in redux
type Patient = PatientForm & {
  medications: Medication[];
  id: string;
};

type PatientState = {
  [id: string]: Patient;
};
