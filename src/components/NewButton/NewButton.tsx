import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import './NewButton.scss';
import UploadPopover from '../UploadPopover';

const NewButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  return (
    <div className="c-NewButton">
      <Button
        variant="contained"
        color="primary"
        size="large"
        className="c-NewButton__button"
        startIcon={<Add />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        New
      </Button>
      <UploadPopover
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: { width: '220px' },
        }}
      />
    </div>
  );
};

export default NewButton;
