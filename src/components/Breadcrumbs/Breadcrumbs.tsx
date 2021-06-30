import React from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@material-ui/core';

import './Breadcrumbs.scss';

interface BreadcrumbsProps {
  items: {
    title: string;
    to?: string;
  }[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <MuiBreadcrumbs className="c-Breadcrumbs" aria-label="breadcrumb">
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
  );
};

export default Breadcrumbs;
