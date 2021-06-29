/* eslint-disable jsx-a11y/label-has-associated-control */
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
  Modal,
  CircularProgress,
} from '@material-ui/core';
import { Add, CreateNewFolder, Attachment } from '@material-ui/icons';
import { createFolder, uploadFile, getStorageData } from '../../store/actions/storage';
import { selectParentId, selectUploudLoader } from '../../store/selectors/storage';

import './NewButton.scss';

const NewButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [folderName, setFolderName] = useState('');
  const parentId = useSelector(selectParentId);
  const uploudPending = useSelector(selectUploudLoader);
  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };

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
      dispatch({ type: 'SET_UPLOADLOADER', loader: false });
    });
  };

  const onUploadFile = async (e) => {
    const { files } = e.target;
    dispatch({ type: 'SET_UPLOADLOADER', loader: true });
    const request = [...files].map((file) => {
      const { size, name } = file;
      return dispatch(uploadFile(name, size, file, parentId));
    });
    multipleAplload(request);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className="c-NewButton">
      <Button
        variant="contained"
        color="primary"
        size="large"
        className="c-NewButton__button"
        startIcon={<Add />}
        aria-describedby={id}
        onClick={handleClick}
      >
        New
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          style: { width: '220px' },
        }}
      >
        <div className="c-NewButton__popoverItems" onClick={handleOpenModal} role="button" onKeyPress={handleOpenModal}>
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
        <div className="c-NewButton__popoverItems">
          <input id="contained-button-file" type="file" multiple onChange={onUploadFile} />
          <label htmlFor="contained-button-file">
            <Attachment /> File upload
          </label>
        </div>
      </Popover>
      <Modal open={uploudPending} className="c-NewButton__modal">
        <div className="c-NewButton__modalContent">
          <CircularProgress />
          <p>File is uplouding...</p>
        </div>
      </Modal>
    </div>
  );
};

export default NewButton;
