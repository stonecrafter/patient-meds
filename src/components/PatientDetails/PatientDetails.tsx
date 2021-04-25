import { useState } from 'react';
import { Descriptions, Result, Button } from 'antd';
import { useParams, useHistory } from 'react-router-dom';

import { useTypedSelector, useTypedDispatch } from 'store/hooks';
import { getPatientById, deletePatient } from 'store/patientsSlice';
import { getMedicationByIds } from 'store/medicationsSlice';
import CreateEditPatient from 'components/CreateEditPatient';

import 'components/HomePage/HomePage.css';
import './PatientDetails.css';

const PatientDetails = () => {
  const history = useHistory();
  const dispatch = useTypedDispatch();
  const { patientId } = useParams<{ patientId: string }>();
  const patient = useTypedSelector((state) => getPatientById(state, patientId));
  const medicationList = useTypedSelector((state) =>
    patient ? getMedicationByIds(state, patient.medications) : []
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onDeleteClick = async () => {
    // Not sure if need await here?
    await dispatch(deletePatient({ id: patientId }));
    goHome();
  };

  // This can be made into a hook
  const showModal = () => {
    setIsModalVisible(true);
  };
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  // This can be moved into utils
  const goHome = () => history.push('/');

  if (!patient) {
    // This could be its own component with customisable subtitle
    return (
      <Result
        className="content patient-not-found"
        status="404"
        title="Not Found"
        subTitle="Sorry, this patient does not exist."
        extra={
          <Button type="primary" onClick={goHome}>
            Back Home
          </Button>
        }
      />
    );
  }

  return (
    <div className="content patient-details">
      <Descriptions
        title="Patient Info"
        column={1}
        extra={
          <Button type="primary" onClick={showModal}>
            Edit
          </Button>
        }
        bordered
      >
        <Descriptions.Item label="First Name">
          {patient.firstName}
        </Descriptions.Item>
        <Descriptions.Item label="Last Name">
          {patient.lastName}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{patient.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{patient.phone}</Descriptions.Item>
        <Descriptions.Item label="Date of Birth">
          {new Date(patient.dateOfBirth).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Medications">
          {medicationList.length > 0
            ? medicationList.map((med) => <div key={med.id}>- {med.name}</div>)
            : 'None'}
        </Descriptions.Item>
      </Descriptions>
      <Button
        className="delete-patient"
        type="primary"
        danger
        onClick={onDeleteClick}
      >
        Delete Patient
      </Button>
      <CreateEditPatient
        onClose={onModalClose}
        visible={isModalVisible}
        patient={patient}
      />
    </div>
  );
};

export default PatientDetails;
