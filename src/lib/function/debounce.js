export function debounce(callback, delay) {
  let timer = null;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log('process', callback)
      callback()
    }, delay)
  }
}