import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Cloud } from '@material-ui/icons';
import { selectFreePlace, selectTotalPlace } from '../../store/selectors/storage';

import './StorageIndicator.scss';

const StorageIndicator: React.FC = () => {
  const free = useSelector(selectFreePlace);
  const total = useSelector(selectTotalPlace);

  const changeProgressPercentage = () => {
    const progressPercentage = ((total - free) * 100) / total;
    const slider = document.getElementById(`indicator`);
    if (!slider) {
      return;
    }

    slider.style.background = `linear-gradient(to right, #3f51b5 0%, #3f51b5
      ${progressPercentage}%, #e8f0fe
      ${progressPercentage}%, #e8f0fe 100%)`;
  };

  useEffect(() => {
    changeProgressPercentage();
  }, [free]);

  return (
    <div className="c-StorageIndicator">
      <div className="c-StorageIndicator__cloudBlock">
        <Cloud /> Storage
      </div>
      <div className="c-StorageIndicator__indicator" id="indicator" />
      {free && <div className="c-StorageIndicator__label">{`${total - free} MB of ${total} MB used`}</div>}
    </div>
  );
};

export default StorageIndicator;
