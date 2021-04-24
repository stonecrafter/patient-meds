import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import './SearchBar.css';

type Props = {
  query: string;
  setQuery: (q: string) => void;
  placeholder: string;
};

const SearchBar = (props: Props) => {
  const { query, setQuery, placeholder } = props;

  return (
    <Input
      className="search-bar"
      allowClear
      placeholder={placeholder}
      prefix={<SearchOutlined className="site-form-item-icon" />}
      onChange={(e) => setQuery(e.target.value)}
      value={query}
      bordered={false}
    />
  );
};

export default SearchBar;
