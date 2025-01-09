export function throttle(callback, delay) {
  let time = 0;
  return (e) => {
    const now = Date.now();
    if (now - time > delay) {
      time = now;
      callback(e);
    }
  }
}

