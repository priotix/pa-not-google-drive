import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FixedSizeList } from 'react-window';
import { useDispatch, useSelector } from 'react-redux';

import {
  TextField,
  Button,
  IconButton,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';

import {
  Folder as FolderIcon,
  Delete as DeleteIcon,
  InsertDriveFile as FileIcon,
  Edit as EditIcon,
} from '@material-ui/icons';

import { getStorageData, deleteFile, renameFile } from '../../store/actions/storage';
import { selectStorageData, selectParentId } from '../../store/selectors/storage';
import './FileList.scss';

const FileList: React.FC = () => {
  const [listHeight, setListHeight] = useState(0);
  const [newName, setNewName] = useState('');
  const [dialogType, setDialogType] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const storageData = useSelector(selectStorageData);
  const parentId = useSelector(selectParentId);

  const handleDialogOpen = (type: string, index: string) => {
    setDialogType(type);
    setSelectedEntry(index);
    setNewName(storageData.find((item) => item.id === index).name);
  };

  const handleDialogClose = () => {
    setDialogType(null);
    setNewName('');
  };

  const handleRename = async () => {
    await dispatch(renameFile(selectedEntry, newName));
    await dispatch(getStorageData(parentId));
    handleDialogClose();
  };

  const handleDelete = async () => {
    await dispatch(deleteFile(selectedEntry));
    await dispatch(getStorageData(parentId));
    handleDialogClose();
  };

  const updateListHeight = () => {
    const mainContainerHeight = document.getElementById('main-container')?.clientHeight || 0;
    setListHeight(mainContainerHeight);
  };

  useEffect(() => {
    updateListHeight();
    window.addEventListener('resize', updateListHeight);
    return () => window.removeEventListener('resize', updateListHeight);
  }, []);

  useEffect(() => {
    dispatch(getStorageData(parentId));
  }, [parentId]);

  return (
    <div className="c-FileList">
      <FixedSizeList height={listHeight} width="100%" itemSize={56} itemCount={storageData.length}>
        {({ index, style }) => {
          const { name, id, type } = storageData[index];
          const isFile = type === 'file';
          return (
            <ListItem
              key={index}
              classes={{ secondaryAction: isFile ? 'c-FileList__listItem--largePadding' : 'c-FileList__listItem' }}
              button
              ContainerComponent="div"
              ContainerProps={{ style }}
              component={type === 'dir' ? Link : 'div'}
              to={`${location.pathname}/${id}`}
            >
              <ListItemAvatar>
                <Avatar className={!isFile ? 'c-FileList__folderAvatar' : ''}>
                  {isFile ? <FileIcon /> : <FolderIcon />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText classes={{ primary: 'c-FileList__itemName' }} primary={name} />
              <ListItemSecondaryAction>
                <IconButton color="primary" edge="end" aria-label="edit" onClick={() => handleDialogOpen('rename', id)}>
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="secondary"
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDialogOpen('delete', id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        }}
      </FixedSizeList>
      <Dialog open={dialogType === 'rename'} onClose={handleDialogClose} aria-labelledby="rename-dialog-title">
        <DialogTitle id="rename-dialog-title">Rename</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            margin="dense"
            label="New name"
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRename} color="primary" disabled={!newName}>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dialogType === 'delete'}
        onClose={handleDialogClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FileList;
