import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Hidden, Typography, AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { userLogout } from '../../store/actions/auth';

import Search from '../Search';

import './Header.scss';

interface HeaderProps {
  onMenuToggle?: (e: React.SyntheticEvent) => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const [searchQuery, setSearchQuery] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery != null) {
      // make search request
    }
  }, [searchQuery]);

  return (
    <div className="c-Header">
      <AppBar position="fixed" classes={{ root: 'c-Header' }}>
        <Toolbar className="c-Header__toolbar">
          <Hidden smUp>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuToggle}>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6">Files</Typography>
          <Search value={searchQuery} onChange={(query) => setSearchQuery(query)} />
          <Button
            color="inherit"
            className="c-Header__logoutButton"
            onClick={() => {
              dispatch(userLogout());
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
