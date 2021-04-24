import { List } from 'antd';

import { useTypedSelector } from 'store/hooks';
import { getAllPatients } from 'store/patientsSlice';
import PatientListItem from 'components/PatientListItem';

import './PatientList.css';

const PatientList = () => {
  const patients = useTypedSelector(getAllPatients);

  return (
    <List
      className="patientList"
      header="Patient List"
      dataSource={patients}
      renderItem={(item) => <PatientListItem item={item} />}
    />
  );
};

export default PatientList;
