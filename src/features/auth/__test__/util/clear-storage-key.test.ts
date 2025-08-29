/**
 * @file clearStorageKeys 유틸리티 함수의 단위 테스트입니다.
 * @description 함수 호출 시 localStorage와 sessionStorage의 모든 데이터가
 *              정상적으로 삭제되는지 검증합니다.
 */
import { beforeEach, describe, expect, it } from 'vitest';

import { clearStorageKeys } from '../../util/clear-storage-key';

/* clearStorageKeys 테스트 */
describe('clearStorageKeys', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  /* 1. localStorage와 sessionStorage의 모든 키 삭제 */
  it('localStorage와 sessionStorage의 모든 항목을 제거해야 함', () => {
    localStorage.setItem('foo', 'bar');
    sessionStorage.setItem('baz', 'qux');

    clearStorageKeys();

    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
  });

  /* 2. 스토리지가 비어있는 경우 */
  it('스토리지가 비어있을 때 호출해도 에러가 발생하지 않아야 함', () => {
    expect(() => clearStorageKeys()).not.toThrow();
  });
});
