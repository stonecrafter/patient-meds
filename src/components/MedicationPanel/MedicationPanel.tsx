import { useEffect, useState, useCallback } from 'react';
import { Drawer, Spin } from 'antd';
import debounce from 'lodash/debounce';
import axios from 'axios';

import SearchBar from 'components/SearchBar';
import MedicationList from 'components/MedicationList';
import { SEARCH_API_URL } from 'utils';

import './MedicationPanel.css';

type Props = {
  onClose: () => void;
  visible: boolean;
};

const MedicationPanel = (props: Props) => {
  const { onClose, visible } = props;
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Medication[]>([]);

  useEffect(() => {
    onSearchChange();

    return onSearchChange.cancel;
  }, [query]);

  const onSearchChange = useCallback(
    debounce(async () => {
      // No need to display spinner when clearing
      if (query) {
        setIsSearching(true);
      }

      const { data } = await axios.get(`${SEARCH_API_URL}?q=${query}`);

      // At the moment we don't care about any other properties
      // as we only need to solve the use case of adding medication
      // to a patient
      const transformedResults = data.data.map(
        ({ id, nameFormStrength }: Medication) => ({
          id,
          nameFormStrength,
        })
      );

      setSearchResults(transformedResults);
      setIsSearching(false);
    }, 300),
    [query]
  );

  const handleClose = () => {
    // Reset everything
    setQuery('');
    setSearchResults([]);
    onClose();
  };

  return (
    <Drawer
      width={500}
      title={
        <SearchBar
          query={query}
          setQuery={setQuery}
          placeholder="Search medications database"
        />
      }
      placement="right"
      closable={false}
      onClose={handleClose}
      visible={visible}
      destroyOnClose
    >
      {isSearching ? (
        <Spin className="spinner" />
      ) : (
        <MedicationList medications={searchResults} />
      )}
    </Drawer>
  );
};

export default MedicationPanel;
