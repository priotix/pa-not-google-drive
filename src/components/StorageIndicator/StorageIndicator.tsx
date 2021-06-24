import React, { useState, useEffect } from 'react';
import { Cloud } from '@material-ui/icons';

import './StorageIndicator.scss';

const StorageIndicator: React.FC = () => {
  const [usedSpase, setUsedSpase] = useState(1000);
  const maxPlace = 10000;

  const changeProgressPercentage = (used) => {
    const progressPercentage = (used * 100) / maxPlace;
    const slider = document.getElementById(`indicator`);
    if (!slider) {
      return;
    }

    slider.style.background = `linear-gradient(to right, #3f51b5 0%, #3f51b5
      ${progressPercentage}%, #e8f0fe
      ${progressPercentage}%, #e8f0fe 100%)`;
  };

  useEffect(() => {
    changeProgressPercentage(usedSpase);
  }, [usedSpase]);

  return (
    <div className="c-StorageIndicator">
      <div className="c-StorageIndicator__cloudBlock">
        <Cloud /> Storage
      </div>
      <div className="c-StorageIndicator__indicator" id="indicator" />
      <div className="c-StorageIndicator__label">{`${usedSpase} MB of ${maxPlace} MB used`}</div>
    </div>
  );
};

export default StorageIndicator;
