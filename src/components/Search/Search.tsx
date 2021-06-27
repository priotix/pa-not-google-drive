import React, { useEffect, useState } from 'react';

import InputBase from '@material-ui/core/InputBase';
import { Search as SearchIcon } from '@material-ui/icons';

import './Search.scss';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (inputValue !== value) {
      const timeoutId = setTimeout(() => onChange(inputValue), 500);
      return () => clearTimeout(timeoutId);
    }
  }, [value, inputValue, onChange]);

  return (
    <div className="c-Search">
      <div className="c-Search__icon">
        <SearchIcon />
      </div>
      <InputBase
        value={inputValue || ''}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search..."
        className="c-Search__input"
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
};

export default Search;
