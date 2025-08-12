import { beforeEach, describe, expect, it } from 'vitest';

import { clearStorageKeys } from '../../util/clear-storage-key';

describe('clearStorageKeys', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('localStorage, sessionStorage 모두 비움', () => {
    localStorage.setItem('foo', 'bar');
    sessionStorage.setItem('baz', 'qux');

    clearStorageKeys();

    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
  });

  it('스토리지가 비어있어도 에러 없이 동작', () => {
    expect(() => clearStorageKeys()).not.toThrow();
  });
});
