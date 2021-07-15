export function getPageIndex(url: string) {
  if (!url) return -1;
  const identity = 'page=';
  const indexOfPage = url.indexOf(identity) + identity.length;
  return parseInt(url.slice(indexOfPage, indexOfPage + 1));
}
