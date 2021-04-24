import { List } from 'antd';

type Props = {
  item: Medication;
};

const MedicationListItem = (props: Props) => {
  const { item } = props;

  return <List.Item>{item.nameFormStrength}</List.Item>;
};

export default MedicationListItem;
