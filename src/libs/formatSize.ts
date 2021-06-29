const round = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;

const formatSize = (size: number) => {
  const bytesInKb = 1024;
  const bytesInMb = bytesInKb * 1024;
  const bytesInGb = bytesInMb * 1024;

  if (size < bytesInKb) {
    return `${size} bytes`;
  }

  if (size < bytesInMb) {
    return `${round(size / bytesInKb)} KB`;
  }

  if (size < bytesInGb) {
    return `${round(size / bytesInMb)} MB`;
  }

  return `${round(size / bytesInGb)} GB`;
};

export default formatSize;
