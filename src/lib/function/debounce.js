export function debounce(callback, delay) {
  let timer = null;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback()
    }, delay)
  }
}