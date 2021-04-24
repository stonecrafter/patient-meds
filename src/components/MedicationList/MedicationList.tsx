import { List } from 'antd';

import MedicationListItem from 'components/MedicationListItem';

type Props = {
  medications: Medication[];
};

const MedicationList = (props: Props) => {
  const { medications } = props;

  return (
    <List
      className="medicationList"
      dataSource={medications}
      renderItem={(item) => <MedicationListItem item={item} />}
    />
  );
};

export default MedicationList;
