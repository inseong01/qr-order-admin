import { Session } from '@supabase/supabase-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';

const mockSession = { user: { id: '123' } } as unknown as Session;

describe('useAuthSession', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  //  * 초기 세션 유효: 컴포넌트 마운트 시 supabase.auth.getSession이 유효한 세션을 반환할 때 isLogin이 true가 되고 authStatus가 'success'로 설정되는지 확인.

  it('초기 세션 유효', async () => {
    vi.doMock('../../util/verify-auth-jwt', () => ({
      verifyAuthJWT: vi.fn().mockResolvedValue(mockSession),
    }));

    vi.doMock('../../util/auth-supabase-api', () => ({
      getAuthSession: vi.fn().mockResolvedValue({ data: { session: mockSession } }),
    }));

    vi.doMock('../../util/clear-storage-key', () => ({
      clearStorageKeys: vi.fn(),
    }));

    vi.doMock('@/lib/supabase', () => ({
      default: {
        auth: {
          onAuthStateChange: vi.fn(() => ({
            data: { subscription: { unsubscribe: vi.fn() } },
          })),
        },
      },
    }));

    const { default: useAuthSession } = await import('../../hooks/use-auth-session');
    const { result } = renderHook(() => useAuthSession());

    await waitFor(() => {
      expect(result.current.isLogin).toBe(true);
    });
  });

  // * 초기 세션 무효: supabase.auth.getSession이 유효하지 않은 세션을 반환할 때 logoutAndClear가 호출되고 isLogin이 false가 되는지 확인.

  it('초기 세션 무효', async () => {
    vi.doMock('../../util/verify-auth-jwt', () => ({
      verifyAuthJWT: vi.fn().mockResolvedValue(null),
    }));

    vi.doMock('../../util/auth-supabase-api', () => ({
      getAuthSession: vi.fn().mockRejectedValue({ data: { session: mockSession } }),
    }));

    vi.doMock('../../util/clear-storage-key', () => ({
      clearStorageKeys: vi.fn(),
    }));

    vi.doMock('@/lib/supabase', () => ({
      default: {
        auth: {
          onAuthStateChange: vi.fn(() => ({
            data: { subscription: { unsubscribe: vi.fn() } },
          })),
        },
      },
    }));

    const { default: useAuthSession } = await import('../../hooks/use-auth-session');
    const { result } = renderHook(() => useAuthSession());

    await waitFor(() => {
      expect(result.current.isLogin).toBe(false);
    });
  });

  // * JWT 검증 실패: verifyJWT가 null을 반환할 때 logoutAndClear가 호출되는지 확인.

  it('JWT 검증 실패', async () => {
    vi.doMock('../../util/verify-auth-jwt', () => ({
      verifyAuthJWT: vi.fn().mockResolvedValue(null),
    }));

    vi.doMock('../../util/auth-supabase-api', () => ({
      getAuthSession: vi.fn().mockResolvedValue({ data: { session: mockSession } }),
    }));

    vi.doMock('../../util/clear-storage-key', () => ({
      clearStorageKeys: vi.fn(),
    }));

    vi.doMock('@/lib/supabase', () => ({
      default: {
        auth: {
          onAuthStateChange: vi.fn(() => ({
            data: { subscription: { unsubscribe: vi.fn() } },
          })),
        },
      },
    }));

    const { default: useAuthSession } = await import('../../hooks/use-auth-session');
    const { result } = renderHook(() => useAuthSession());

    await waitFor(() => {
      expect(result.current.isLogin).toBe(false);
    });
  });

  // * `onAuthStateChange` - `SIGNED_OUT`: supabase.auth.onAuthStateChange에서 SIGNED_OUT 이벤트 발생 시 logoutAndClear 호출되는지 확인.

  it('onAuthStateChange - SIGNED_OUT', async () => {
    const mockClearStorageKeys = vi.fn();

    vi.doMock('../../util/clear-storage-key', () => ({ clearStorageKeys: mockClearStorageKeys }));

    vi.doMock('../../util/verify-auth-jwt', () => ({ verifyAuthJWT: vi.fn().mockResolvedValue(true) }));

    vi.doMock('../../util/auth-supabase-api', () => ({
      getAuthSession: vi.fn().mockResolvedValue({ data: { session: null } }),
    }));

    let savedCallback: any;
    vi.doMock('@/lib/supabase', () => ({
      default: {
        auth: {
          onAuthStateChange: vi.fn((cb) => {
            savedCallback = cb;
            return { data: { subscription: { unsubscribe: vi.fn() } } };
          }),
        },
      },
    }));

    const { default: useAuthSession } = await import('../../hooks/use-auth-session');
    const { result } = renderHook(() => useAuthSession());

    await act(async () => {
      savedCallback('SIGNED_OUT', null);
    });

    expect(result.current.isLogin).toBe(false);
    expect(mockClearStorageKeys).toHaveBeenCalled();
  });

  // * `onAuthStateChange` - `SIGNED_IN`: SIGNED_IN 이벤트 발생 시 processSession이 호출되는지 확인.
  it('`onAuthStateChange` - `SIGNED_IN`', async () => {
    const mockClearStorageKeys = vi.fn();

    vi.doMock('../../util/clear-storage-key', () => ({ clearStorageKeys: mockClearStorageKeys }));

    vi.doMock('../../util/verify-auth-jwt', () => ({ verifyAuthJWT: vi.fn().mockResolvedValue(true) }));

    vi.doMock('../../util/auth-supabase-api', () => ({
      getAuthSession: vi.fn().mockResolvedValue({ data: { session: mockSession } }),
    }));

    let savedCallback: any;
    vi.doMock('@/lib/supabase', () => ({
      default: {
        auth: {
          onAuthStateChange: vi.fn((cb) => {
            savedCallback = cb;
            return { data: { subscription: { unsubscribe: vi.fn() } } };
          }),
        },
      },
    }));

    const { default: useAuthSession } = await import('../../hooks/use-auth-session');
    const { result } = renderHook(() => useAuthSession());

    await act(async () => {
      savedCallback('SIGNED_IN', null);
    });

    expect(result.current.isLogin).toBe(true);
    expect(mockClearStorageKeys).toHaveBeenCalledTimes(1);
  });
});
