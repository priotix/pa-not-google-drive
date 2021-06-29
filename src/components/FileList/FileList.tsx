import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FixedSizeList } from 'react-window';
import { useDispatch, useSelector } from 'react-redux';
import { format, differenceInDays, formatDistanceStrict } from 'date-fns';

import {
  Cloud as CloudIcon,
  Folder as FolderIcon,
  Delete as DeleteIcon,
  InsertDriveFile as FileIcon,
  Edit as EditIcon,
} from '@material-ui/icons';

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

import { getStorageData, deleteFile, renameFile, searchFiles } from '../../store/actions/storage';
import { selectStorageData, selectGetStorageDataPending } from '../../store/selectors/storage';

import formatSize from '../../libs/formatSize';

import { getParentId } from '../../libs/getParentId';
import './FileList.scss';

const formatDate = (lastModified: Date) => {
  return differenceInDays(Date.now(), lastModified) >= 1
    ? format(lastModified, 'MMM dd, yyyy hh:mm')
    : formatDistanceStrict(lastModified, Date.now(), { addSuffix: true }).replace('0 seconds ago', 'Just now');
};

const FileList: React.FC = () => {
  const [listHeight, setListHeight] = useState(0);
  const [newName, setNewName] = useState('');
  const [dialogType, setDialogType] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const dispatch = useDispatch();
  const storageData = useSelector(selectStorageData);
  const getDataPending = useSelector(selectGetStorageDataPending);

  const { pathname, search } = useLocation();
  const searchQuery = new URLSearchParams(search).get('search');
  const parentId = getParentId(pathname);

  const getFiles = () => {
    if (searchQuery) {
      dispatch(searchFiles(searchQuery));
    } else {
      dispatch(getStorageData(parentId));
    }
  };

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
    getFiles();
    handleDialogClose();
  };

  const handleDelete = async () => {
    await dispatch(deleteFile(selectedEntry));
    getFiles();
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
    getFiles();
  }, [searchQuery, parentId]);

  if (!storageData.length && !getDataPending) {
    return (
      <div className="c-FileList--empty">
        <div className="c-FileList__emptyContnet">
          <CloudIcon />
          <p>This folder is empty. Please use &quot;New&quot; button for uploading files.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="c-FileList">
      <FixedSizeList height={listHeight} width="100%" itemSize={72} itemCount={storageData.length}>
        {({ index, style }) => {
          const { name, id, type, size, updatedAt, parentIds } = storageData[index];
          const isFile = type === 'file';

          const formattedDate = formatDate(new Date(updatedAt));

          return (
            <ListItem
              key={index}
              classes={{ secondaryAction: 'c-FileList__listItem' }}
              button
              ContainerComponent="div"
              ContainerProps={{ style }}
              component={type === 'dir' ? Link : 'div'}
              to={`${pathname}/${searchQuery && parentIds.length ? `${parentIds.reverse().join('/')}/` : ''}${id}`}
            >
              <ListItemAvatar>
                <Avatar className={!isFile ? 'c-FileList__folderAvatar' : ''}>
                  {isFile ? <FileIcon /> : <FolderIcon />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                classes={{ primary: 'c-FileList__itemName', secondary: 'c-FileList__itemName' }}
                primary={name}
                secondary={`${isFile ? `${formatSize(size)} ●` : ''} ${formattedDate}`}
              />
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
            margin="dense"
            label="New name"
            fullWidth
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && newName && handleRename()}
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
