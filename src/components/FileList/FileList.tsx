import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FixedSizeList } from 'react-window';
import { useDispatch } from 'react-redux';

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
  GetApp as DownloadIcon,
  Edit as EditIcon,
} from '@material-ui/icons';

import { getStorageData } from '../../store/actions/storage';

import './FileList.scss';

interface FileListProps {
  data?: {
    type: string;
    slug: string;
    name: string;
  }[];
}

const sampleData = [
  {
    type: 'folder',
    slug: 'folder-1',
    name: 'Folder 1 aaaaaaaa aaaaaaa aaaa aaaaaa aaaaa aaaa',
  },
  {
    type: 'folder',
    slug: 'folder-2',
    name: 'Folder 2',
  },
  {
    type: 'folder',
    slug: 'folder-3',
    name: 'Folder 3',
  },
  {
    type: 'folder',
    slug: 'folder-4',
    name: 'Folder 4',
  },
  {
    type: 'file',
    slug: 'file-1',
    name: 'File 1 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  },
  {
    type: 'file',
    slug: 'file-2',
    name: 'File 2',
  },
  {
    type: 'file',
    slug: 'file-3',
    name: 'File 3',
  },
  {
    type: 'file',
    slug: 'file-4',
    name: 'File 4',
  },
  {
    type: 'file',
    slug: 'file-5',
    name: 'File 5',
  },
  {
    type: 'file',
    slug: 'file-6',
    name: 'File 6',
  },
  {
    type: 'file',
    slug: 'file-7',
    name: 'File 7',
  },
  {
    type: 'file',
    slug: 'file-8',
    name: 'File 8',
  },
];

const FileList: React.FC<FileListProps> = ({ data = sampleData }) => {
  const [listHeight, setListHeight] = useState(0);
  const [newName, setNewName] = useState('');
  const [dialogType, setDialogType] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleDialogOpen = (type: string, index: number) => {
    setDialogType(type);
    setSelectedEntry(index);
    setNewName(data[index].name);
  };

  const handleDialogClose = () => {
    setDialogType(null);
    setNewName('');
  };

  const handleRename = () => {
    // rename selectedEntry
    handleDialogClose();
  };

  const handleDelete = () => {
    // delete selectedEntry
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
    dispatch(getStorageData());
  }, [location.pathname, dispatch]);

  return (
    <div className="c-FileList">
      <FixedSizeList height={listHeight} width="100%" itemSize={56} itemCount={sampleData.length}>
        {({ index, style }) => {
          const { name, slug, type } = data[index];
          const isFile = type === 'file';
          return (
            <ListItem
              key={index}
              classes={{ secondaryAction: isFile ? 'c-FileList__listItem--largePadding' : 'c-FileList__listItem' }}
              // TODO: remove when material-ui error is fixed in the next release
              // @ts-expect-error: Type 'boolean' is not assignable to type 'true'
              button={type === 'folder'}
              ContainerComponent="div"
              ContainerProps={{ style }}
              component={type === 'folder' ? Link : 'div'}
              to={`${location.pathname}/${slug}`}
            >
              <ListItemAvatar>
                <Avatar className={!isFile ? 'c-FileList__folderAvatar' : ''}>
                  {isFile ? <FileIcon /> : <FolderIcon />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText classes={{ primary: 'c-FileList__itemName' }} primary={name} />
              <ListItemSecondaryAction>
                {isFile && (
                  <IconButton edge="end" aria-label="download">
                    <DownloadIcon />
                  </IconButton>
                )}
                <IconButton
                  color="primary"
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleDialogOpen('rename', index)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="secondary"
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDialogOpen('delete', index)}
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
          <Button onClick={handleRename} color="primary">
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
