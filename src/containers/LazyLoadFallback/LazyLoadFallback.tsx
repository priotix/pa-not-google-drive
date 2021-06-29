import React from 'react';

import { CircularProgress } from '@material-ui/core';

import './LazyLoadFallback.scss';

const LazyLoadFallback = () => {
  return (
    <div className="c-Lazyload">
      <div className="c-Lazyload__progressContainer">
        <CircularProgress />
      </div>
    </div>
  );
};

export default LazyLoadFallback;
