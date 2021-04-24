import { List } from 'antd';

type Props = {
  item: Patient;
};

const PatientListItem = (props: Props) => {
  const { item } = props;

  return (
    <List.Item>
      {item.firstName} {item.lastName}
    </List.Item>
  );
};

export default PatientListItem;
