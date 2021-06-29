import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListAlt } from '@material-ui/icons';

import { Hidden, Drawer, Toolbar, List, ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core';

import StorageIndicator from '../StorageIndicator';
import NewButton from '../NewButton';

import './Sidebar.scss';

interface SidebarProps {
  open: boolean;
  onClose?: (e: React.SyntheticEvent) => void;
}

const navigationItems = [{ title: 'My Drive', href: '/storage', Icon: ListAlt }];

const SidebarContent: React.FC<Omit<SidebarProps, 'open'>> = ({ onClose }) => {
  return (
    <div className="c-Sidebar__content">
      <NewButton />
      <List>
        {navigationItems.map((item) => {
          const { title, href, Icon } = item;
          return (
            <ListItem
              onClick={onClose}
              key={href}
              button
              component={NavLink}
              to={href}
              activeClassName="c-Sidebar__navItem--active"
            >
              <ListItemIcon className="c-Sidebar__navItem__icon">
                <Icon />
              </ListItemIcon>
              <ListItemText classes={{ primary: 'c-Sidebar__navItem__text' }} primary={title} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <StorageIndicator />
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <>
      <Hidden smUp>
        <Drawer anchor="left" open={open} onClose={onClose}>
          <SidebarContent onClose={onClose} />
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
