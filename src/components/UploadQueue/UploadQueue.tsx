import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { Close, InsertDriveFile as FileIcon, DoneAllOutlined, HighlightOff } from '@material-ui/icons';

import { selectUploudQueue } from '../../store/selectors/storage';
import './UploadQueue.scss';

interface QueueItem {
  name: string;
  status: string;
}

const UploudQueueItem: React.FC<QueueItem> = ({ name, status }) => {
  const statusIcon = () => {
    switch (status) {
      case 'success':
        return <DoneAllOutlined className="success" />;
      case 'rejected':
        return <HighlightOff className="rejected" />;
      default:
        return <CircularProgress className="pending" />;
    }
  };

  return (
    <div className="c-UploadQueue__item">
      <div className="c-UploadQueue__fileName">
        <FileIcon /> {name}
      </div>
      <div>{statusIcon()}</div>
    </div>
  );
};

const UploadQueue: React.FC = () => {
  const uploudQueue = useSelector(selectUploudQueue);
  const dispatch = useDispatch();

  const onCloseQueue = () => {
    dispatch({ type: 'RESTORE_UPLOUD_QUEUE' });
  };

  if (!uploudQueue.length) {
    return <div />;
  }

  return (
    <div className="c-UploadQueue">
      <div className="c-UploadQueue__header">
        <Close onClick={onCloseQueue} />
      </div>
      <div className="c-UploadQueue__wrapper">
        {uploudQueue.map((item) => {
          return <UploudQueueItem name={item.name} status={item.status} key={item.name} />;
        })}
      </div>
    </div>
  );
};

export default UploadQueue;
