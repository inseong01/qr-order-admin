import { throttle } from './throttle';

// 두 가지 throttle 동시 비교
export function measureCallbackCount(delay1: number, delay2: number, timeout = 5000) {
  // 함수 호출 수
  let first = 0;
  let second = 0;

  // 함수 호출 정의
  const firstThrottle = throttle(() => {
    first += 1;
  }, delay1);
  const secondThrottle = throttle(() => {
    second += 1;
  }, delay2);

  // 함수 호출 실행
  const startTm = Date.now();
  let interval = setInterval(() => {
    firstThrottle(null);
    secondThrottle(null);

    // 함수 호출 결과 출력
    if (timeout < Date.now() - startTm) {
      clearInterval(interval);
      console.log('throttle', delay1, ': ', first);
      console.log('throttle', delay2, ': ', second);
    }
  }, 1);
}
