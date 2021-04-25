import { List, Button, Tooltip } from 'antd';
import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import { useRouteMatch } from 'react-router-dom';

import { addMedication } from 'store/medicationsSlice';
import {
  addMedicationToPatient,
  removeMedicationFromPatient,
  getPatientById,
  getPatientHasMedication,
} from 'store/patientsSlice';
import { useTypedDispatch, useTypedSelector } from 'store/hooks';

type Props = {
  item: Medication;
};

const MedicationListItem = (props: Props) => {
  const { item } = props;
  const dispatch = useTypedDispatch();
  const match = useRouteMatch('/patient/:patientId');
  // This should really be cleaned up a bit...
  // Maybe useRouteMatch isn't the best way to handle this?
  const { patientId } =
    (match?.params as { patientId?: string }) ?? ({} as { patientId?: string });
  const patient = useTypedSelector((state) =>
    patientId ? getPatientById(state, patientId) : null
  );
  const patientHasMedication = useTypedSelector((state) =>
    patientId ? getPatientHasMedication(state, patientId, item.id) : false
  );

  const handleAddMedication = () => {
    // Should not happen, but just in case
    if (!patientId) return;

    dispatch(addMedication(item));
    dispatch(addMedicationToPatient({ patientId, medicationId: item.id }));
  };

  const handleRemoveMedication = () => {
    // Should not happen, but just in case
    if (!patientId) return;

    dispatch(removeMedicationFromPatient({ patientId, medicationId: item.id }));
  };

  const renderButton = () =>
    patientHasMedication ? (
      <Tooltip title="Remove from current patient" placement="left">
        <Button
          shape="circle"
          icon={<CheckOutlined />}
          onClick={handleRemoveMedication}
        />
      </Tooltip>
    ) : (
      <Tooltip title="Add to current patient" placement="left">
        <Button
          shape="circle"
          icon={<PlusOutlined />}
          onClick={handleAddMedication}
        />
      </Tooltip>
    );

  return (
    <List.Item>
      <List.Item.Meta title={item.nameFormStrength} />
      {!!patient && renderButton()}
    </List.Item>
  );
};

export default MedicationListItem;
