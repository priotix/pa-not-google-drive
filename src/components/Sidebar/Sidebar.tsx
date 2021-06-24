import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListAlt } from '@material-ui/icons';

import { Hidden, Drawer, Toolbar } from '@material-ui/core';

import StorageIndicator from '../StorageIndicator';

import './Sidebar.scss';

interface SidebarProps {
  open: boolean;
  onClose?: (e: React.SyntheticEvent) => void;
}

const SidebarContent: React.FC = () => {
  return (
    <div className="c-Sidebar__content">
      <nav className="c-SideBar-navigation">
        <ul>
          <li>
            <NavLink to="/">
              <ListAlt />
              My Drive
            </NavLink>
          </li>
        </ul>
      </nav>
      <hr />
      <StorageIndicator />
    </div>
  );
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
