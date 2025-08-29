import { DragEvent } from 'react';

/**
 * 지정된 시간(delay) 동안 함수 호출을 한 번으로 제한하는 throttle 함수를 생성합니다.
 *
 * @param {(e: DragEvent<HTMLUListElement> | null) => void} callback - 실행할 콜백 함수.
 * @param {number} delay - throttle 지연 시간 (밀리초).
 * @returns {(e: DragEvent<HTMLUListElement> | null) => void} - throttle이 적용된 새로운 함수.
 */
export function throttle(
  callback: (e: DragEvent<HTMLUListElement> | null) => void,
  delay: number
): (e: DragEvent<HTMLUListElement> | null) => void {
  let lastCallTime = 0;

  return (e: DragEvent<HTMLUListElement> | null) => {
    const now = Date.now();
    if (now - lastCallTime > delay) {
      lastCallTime = now;
      callback(e);
    }
  };
}

/**
 * 함수 호출을 지연시키는 debounce 함수를 생성합니다.
 * 마지막 호출 이후 지정된 시간(delay)이 지날 때까지 함수 실행을 연기합니다.
 *
 * @param {() => void} callback - 실행할 콜백 함수.
 * @param {number} delay - debounce 지연 시간 (밀리초).
 * @returns {() => void} - debounce가 적용된 새로운 함수.
 */
export function debounce(callback: () => void, delay: number): () => void {
  let timer: ReturnType<typeof setTimeout>;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, delay);
  };
}
