type Medication = {
  id: string;
  nameFormStrength: string;
};

type PatientCreateForm = {
  firstName: string;
  lastName: string;
  // Stored as timestamp
  dateOfBirth: number;
  email: string;
  phone: string;
};

type PatientEditForm = PatientCreateForm & {
  medications: string[];
};

// Data model stored in redux
type Patient = PatientCreateForm & {
  medications: string[];
  id: string;
};

type PatientState = {
  [id: string]: Patient;
};

type MedicationsState = {
  [id: string]: string;
};
