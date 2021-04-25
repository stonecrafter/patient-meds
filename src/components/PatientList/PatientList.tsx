import { useState, useEffect } from 'react';
import { Menu, Empty } from 'antd';
import SearchBar from 'components/SearchBar';
import { useHistory, useParams } from 'react-router-dom';

import { useTypedSelector } from 'store/hooks';
import { getAllPatients } from 'store/patientsSlice';

import './PatientList.css';

const PatientList = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const patients = useTypedSelector(getAllPatients);
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState(patients);

  useEffect(() => {
    if (!searchQuery) {
      // No need to iterate through the list
      setFilteredList(patients);
    } else {
      const filtered = patients.filter((patient) => {
        // Case-insensitive comparison
        const fullName = `${patient.firstName} ${patient.lastName}`.toLocaleLowerCase();
        return fullName.indexOf(searchQuery.toLocaleLowerCase()) > -1;
      });
      setFilteredList(filtered);
    }
  }, [searchQuery, patients]);

  // TODO: not sure what is the correct type to put here, antd documentation
  // has not been helpful...
  const onPatientSelect = (item: any) => {
    const selectedPatient = item.key;

    // If another patient was selected, navigate to their view
    if (selectedPatient !== patientId) {
      history.push(`/patient/${selectedPatient}`);
    }
  };

  return (
    <div className="patient-list">
      <SearchBar
        query={searchQuery}
        setQuery={setSearchQuery}
        placeholder="Search by patient name"
      />
      <Menu
        className="patient-list__menu"
        selectedKeys={patientId ? [patientId] : undefined}
      >
        {filteredList.length > 0 ? (
          filteredList.map((item) => (
            <Menu.Item key={item.id} onClick={onPatientSelect}>
              {item.firstName} {item.lastName}
            </Menu.Item>
          ))
        ) : (
          <div className="patient-list__empty">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>No Patients</span>}
            />
          </div>
        )}
      </Menu>
    </div>
  );
};

export default PatientList;
