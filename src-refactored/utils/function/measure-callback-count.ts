import { throttle } from './optimize';

/**
 * 두 개의 다른 지연 시간을 가진 throttle 함수의 호출 횟수를 비교하여 측정합니다.
 *
 * @param {number} delay1 - 첫 번째 throttle 함수의 지연 시간 (ms).
 * @param {number} delay2 - 두 번째 throttle 함수의 지연 시간 (ms).
 * @param {number} [timeout=5000] - 측정을 실행할 총 시간 (ms). 기본값은 5000ms.
 */
export function measureCallbackCount(delay1: number, delay2: number, timeout = 5000): void {
  let firstCallbackCount = 0;
  let secondCallbackCount = 0;

  const firstThrottled = throttle(() => {
    firstCallbackCount += 1;
  }, delay1);

  const secondThrottled = throttle(() => {
    secondCallbackCount += 1;
  }, delay2);

  const startTime = Date.now();

  // 1ms마다 두 throttle 함수를 지속적으로 호출하여 테스트를 시작합니다.
  const intervalId = setInterval(() => {
    firstThrottled(null);
    secondThrottled(null);

    // 지정된 timeout 시간이 경과하면 측정을 중지하고 결과를 출력합니다.
    if (Date.now() - startTime > timeout) {
      clearInterval(intervalId);
      console.log(`Throttle with ${delay1}ms delay was called: ${firstCallbackCount} times`);
      console.log(`Throttle with ${delay2}ms delay was called: ${secondCallbackCount} times`);
    }
  }, 1);
}
