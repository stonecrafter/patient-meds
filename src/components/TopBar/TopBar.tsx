import { useState } from 'react';
import { PageHeader, Button } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

import MedicationPanel from 'components/MedicationPanel';
import NewPatient from 'components/NewPatient';

import './TopBar.css';

const TopBar = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };
  const onDrawerClose = () => {
    setIsDrawerVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <PageHeader
        className="topBar"
        title="Patient-Medication Records"
        extra={[
          <Button
            key="new"
            type="primary"
            icon={<PlusOutlined />}
            onClick={showModal}
          >
            New Patient
          </Button>,
          <Button key="search" icon={<SearchOutlined />} onClick={showDrawer}>
            Search Medications
          </Button>,
        ]}
      />
      <MedicationPanel onClose={onDrawerClose} visible={isDrawerVisible} />
      <NewPatient onClose={onModalClose} visible={isModalVisible} />
    </>
  );
};

export default TopBar;
