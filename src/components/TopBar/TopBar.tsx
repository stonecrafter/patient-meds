import { useState } from 'react';
import { PageHeader, Button } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import MedicationPanel from 'components/MedicationPanel';
import CreateEditPatient from 'components/CreateEditPatient';

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
        title={<Link to="/">Patient-Medication Records</Link>}
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
      <CreateEditPatient onClose={onModalClose} visible={isModalVisible} />
    </>
  );
};

export default TopBar;
