import React from 'react';

import { Hidden, Drawer, Toolbar } from '@material-ui/core';

import './Sidebar.scss';

interface SidebarProps {
  open: boolean;
  onClose?: (e: React.SyntheticEvent) => void;
}

const SidebarContent: React.FC = () => {
  return <div className="c-Sidebar__content">Sidebar</div>;
};

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <>
      <Hidden smUp>
        <Drawer anchor="left" open={open} onClose={onClose}>
          <SidebarContent />
        </Drawer>
      </Hidden>

      <Hidden xsDown>
        <Drawer variant="permanent" open classes={{ root: 'c-Sidebar', paper: 'c-Sidebar__drawer' }}>
          <Toolbar />
          <SidebarContent />
        </Drawer>
      </Hidden>
    </>
  );
};

export default Sidebar;
