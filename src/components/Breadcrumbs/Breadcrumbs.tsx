import React from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumbs as MuiBreadcrumbs, Typography, IconButton } from '@material-ui/core';

import './Breadcrumbs.scss';
import { ArrowBack as ArrowBackIcon, ListAlt as ListAltIcon } from '@material-ui/icons';

interface BreadcrumbsProps {
  items: {
    title: string;
    to?: string;
  }[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div className="c-BreadcrumbsContainer">
      <div className="c-BreadcrumbsContainer__backButton">
        {items.length > 1 ? (
          <Link color="inherit" to={items.slice(-2)[0].to}>
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </Link>
        ) : (
          <IconButton>
            <ListAltIcon />
          </IconButton>
        )}
      </div>

      <MuiBreadcrumbs classes={{ root: 'c-Breadcrumbs', ol: 'c-Breadcrumbs__ol' }} aria-label="breadcrumb">
        {items.map(({ title, to }, index) =>
          index === items.length - 1 ? (
            <Typography key={index.toString()} color="textPrimary">
              {title}
            </Typography>
          ) : (
            <Link key={index.toString()} color="inherit" to={to}>
              {title}
            </Link>
          )
        )}
      </MuiBreadcrumbs>
    </div>
  );
};

export default Breadcrumbs;
