export default function trimLength(string) {
  if (string.length > 1000) {
    const ellipsis = ' ...';
    const cutString = string.slice(0, 996);
    return cutString + ellipsis;
  } else {
    return string;
  }
}
