export function debounce(callback, delay) {
  let timer = null;
  return (props) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(props)
    }, delay)
  }
}