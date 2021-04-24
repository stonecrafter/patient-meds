import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import './MedicationSearch.css';

type Props = {
  query: string;
  setQuery: (q: string) => void;
};

const MedicationSearch = (props: Props) => {
  const { query, setQuery } = props;

  return (
    <Input
      className="medicationSearch"
      allowClear
      placeholder="Search medications database"
      prefix={<SearchOutlined className="site-form-item-icon" />}
      onChange={(e) => setQuery(e.target.value)}
      value={query}
      bordered={false}
    />
  );
};

export default MedicationSearch;
