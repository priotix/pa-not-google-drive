import React, { useEffect, useState } from 'react';

import { InputBase, IconButton } from '@material-ui/core';
import { Search as SearchIcon, Clear as ClearIcon } from '@material-ui/icons';

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
  }, [inputValue, onChange]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="c-Search">
      <SearchIcon className="c-Search__searchIcon" />
      <InputBase
        value={inputValue || ''}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search..."
        className="c-Search__input"
        inputProps={{ 'aria-label': 'search' }}
      />
      {inputValue && (
        <IconButton size="small" onClick={() => setInputValue('')}>
          <ClearIcon className="c-Search__clearIcon" />
        </IconButton>
      )}
    </div>
  );
};

export default Search;
