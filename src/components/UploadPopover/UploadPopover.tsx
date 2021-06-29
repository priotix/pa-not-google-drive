import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Popover,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  PopoverProps,
} from '@material-ui/core';
import { CreateNewFolder, InsertDriveFile } from '@material-ui/icons';
import { createFolder, uploadFile, getStorageData } from '../../store/actions/storage';
import { selectParentId } from '../../store/selectors/storage';

import './UploadPopover.scss';

const UploadPopover: React.FC<Omit<PopoverProps, 'open'>> = ({ anchorEl, onClose, ...otherProps }) => {
  const [openModal, setOpenModal] = useState(false);
  const [folderName, setFolderName] = useState('');
  const parentId = useSelector(selectParentId);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFolderName('');
  };

  const onChangeFolderName = (value) => {
    setFolderName(value);
  };

  const onCreateFolder = async () => {
    interface Request {
      name: string;
      parent?: string;
    }
    const requestData: Request = { name: folderName };
    parentId ? (requestData.parent = parentId) : '';
    await dispatch(createFolder(requestData));
    await dispatch(getStorageData(parentId));
    handleCloseModal();
  };

  const multipleAplload = (request) => {
    Promise.allSettled(request).then(() => {
      dispatch(getStorageData(parentId));
    });
  };

  const onUploadFile = async (e) => {
    const { files } = e.target;
    const request = [...files].map((file) => {
      const { size, name } = file;
      return dispatch(uploadFile(name, size, file, parentId));
    });
    multipleAplload(request);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={onClose} {...otherProps} className="c-UploadPopover">
        <div className="c-UploadPopover__item" onClick={handleOpenModal} role="button" onKeyPress={handleOpenModal}>
          <CreateNewFolder /> Folder
        </div>
        <Dialog open={openModal} onClose={handleCloseModal} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Folder</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Folder Name"
              type="text"
              fullWidth
              value={folderName}
              onChange={(e) => onChangeFolderName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && folderName && onCreateFolder()}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cancel
            </Button>
            <Button onClick={onCreateFolder} color="primary" disabled={!folderName}>
              Create
            </Button>
          </DialogActions>
        </Dialog>
        <div className="c-UploadPopover__item">
          <input id="contained-button-file" type="file" multiple onChange={onUploadFile} />
          {/*  eslint-disable-next-line jsx-a11y/label-has-associated-control  */}
          <label htmlFor="contained-button-file">
            <InsertDriveFile /> File upload
          </label>
        </div>
      </Popover>
    </>
  );
};

export default UploadPopover;
