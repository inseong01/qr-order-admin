/**
 * @file optimize 유틸리티 함수 단위 테스트입니다.
 * @description throttle과 debounce 함수의 시간 지연 기반 실행 동작이
 *              의도한 대로 동작하는지 검증합니다.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { debounce, throttle } from '../function/optimize';

describe('optimize 유틸리티 함수', () => {
  beforeEach(() => {
    // 가짜 타이머 사용
    vi.useFakeTimers();
  });

  afterEach(() => {
    // 실제 타이머로 복원
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe('throttle', () => {
    it('delay 동안 중복 호출을 무시', () => {
      const mockCallback = vi.fn();
      const delay = 1000;

      const throttled = throttle(mockCallback, delay);

      throttled(null); // 실행
      throttled(null); // 무시
      throttled(null); // 무시

      vi.advanceTimersByTime(delay);
      expect(mockCallback).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(delay);
      throttled(null); // 실행
      expect(mockCallback).toHaveBeenCalledTimes(2);
    });
  });

  describe('debounce', () => {
    it('delay 후 마지막 호출만 실행', () => {
      const mockCallback = vi.fn();
      const delay = 1000;

      const debounced = debounce(mockCallback, delay);

      debounced(); // 무시
      debounced(); // 무시
      debounced(); // 실행 예정

      expect(mockCallback).not.toHaveBeenCalled();

      vi.advanceTimersByTime(delay);
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });
  });
});
