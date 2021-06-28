/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Popover, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { Add, CreateNewFolder, Attachment } from '@material-ui/icons';
import { createFolder, uploudFile } from '../../store/actions/storage';

import './NewButton.scss';

const NewButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [folderName, setFolderName] = useState('');
  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const onChangeFolderName = (value) => {
    setFolderName(value);
  };

  const onCreateFolder = () => {
    dispatch(createFolder(folderName));
    handleCloseModal();
  };

  const onUploudFile = (e) => {
    const file = e.target.files[0];
    const { size, name } = file;
    dispatch(uploudFile(name, size, file));
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
          style: { width: '250px' },
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
          <input id="contained-button-file" type="file" onChange={onUploudFile} />
          <label htmlFor="contained-button-file">
            <Attachment /> File upload
          </label>
        </div>
      </Popover>
    </div>
  );
};

export default NewButton;
