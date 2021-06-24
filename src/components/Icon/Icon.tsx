import React from 'react';

const Icons = {};

interface IconProps {
  name: string;
  className?: string;
  [x: string]: any;
}

const Icon: React.FC<IconProps> = ({ name, className, ...otherProps }) => {
  const CustomIcon = Icons[name];
  return CustomIcon ? (
    <CustomIcon className={className} {...otherProps} />
  ) : (
    <img alt="Icon not found" {...otherProps} />
  );
};

export default Icon;
