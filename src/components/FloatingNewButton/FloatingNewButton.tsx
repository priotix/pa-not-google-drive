import React, { useState } from 'react';

import { Fab } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import './FloatingNewButton.scss';
import UploadPopover from '../UploadPopover';

const FloatingNewButton = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  return (
    <div className="c-FloatingNewButtonContainer">
      <Fab
        color="primary"
        aria-label="add"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        className="c-FloatingNewButton"
      >
        <AddIcon />
      </Fab>
      <UploadPopover
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        PaperProps={{
          style: { width: '220px' },
        }}
      />
    </div>
  );
};

export default FloatingNewButton;
