import { DragEvent } from 'react';

export function throttle(callback: (e: DragEvent<HTMLUListElement> | null) => void, delay: number) {
  let time = 0;
  return (e: DragEvent<HTMLUListElement> | null) => {
    const now = Date.now();
    if (now - time > delay) {
      time = now;
      callback(e);
    }
  };
}

export function debounce(callback: () => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, delay);
  };
}
