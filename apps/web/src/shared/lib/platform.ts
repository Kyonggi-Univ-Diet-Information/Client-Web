export const isIos = () => {
  if (typeof navigator === 'undefined') return false;
  console.log(navigator.userAgent);
  return /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent);
};

export const isAndroid = () => {
  if (typeof navigator === 'undefined') return false;
  return /Android/i.test(navigator.userAgent);
};
