export const getParentId = (pathname) => {
  const parentIds = pathname.split('/');
  if (parentIds.length === 2) {
    return null;
  }
  return parentIds[parentIds.length - 1];
};
