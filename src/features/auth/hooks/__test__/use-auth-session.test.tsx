/**
 * @file useAuthSession 커스텀 훅의 단위 테스트입니다.
 * @description supabase의 세션 변경(SIGNED_IN, SIGNED_OUT)에 따라
 *              인증 상태(isLogin)가 올바르게 변경되는지 검증합니다.
 */
import { Session } from '@supabase/supabase-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { PATHS } from '@/constants/paths';

const mockSession = { user: { id: '123' } } as unknown as Session;
const mockUseLocation = vi.fn().mockReturnValue({ pathname: PATHS.AUTH.LOGIN });

vi.mock('react-router', async (importActual) => {
  const actual = await importActual<typeof import('react-router')>();
  return {
    ...actual,
    useLocation: () => mockUseLocation(),
  };
});

describe('useAuthSession', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('초기 세션이 유효할 경우, isLogin을 true로 설정', async () => {
    // JWT 유효성 검증 모킹
    vi.doMock('../../util/verify-auth-jwt', () => ({
      verifyAuthJWT: vi.fn().mockResolvedValue({ session: mockSession }),
    }));

    // Supabase 세션 조회 API 모킹
    vi.doMock('../../util/auth-supabase-api', () => ({
      getAuthSession: vi.fn().mockResolvedValue({ data: { session: mockSession } }),
    }));

    // 스토리지 클리어 유틸 모킹
    vi.doMock('../../util/clear-storage-key', () => ({
      clearStorageKeys: vi.fn(),
    }));

    // Supabase 클라이언트 모킹
    vi.doMock('@/lib/supabase', () => ({
      default: {
        auth: {
          onAuthStateChange: vi.fn(() => ({
            data: { subscription: { unsubscribe: vi.fn() } },
          })),
        },
      },
    }));

    const { default: useAuthSession } = await import('../use-auth-session');
    const { result } = renderHook(() => useAuthSession());

    await waitFor(() => {
      expect(result.current.isLogin).toBe(true);
    });
  });

  it('초기 세션이 무효할 경우, isLogin을 false로 설정', async () => {
    // JWT 유효성 검증 모킹 (세션 없음)
    vi.doMock('../../util/verify-auth-jwt', () => ({
      verifyAuthJWT: vi.fn().mockResolvedValue(null),
    }));

    // Supabase 세션 조회 API 모킹 (에러 발생)
    vi.doMock('../../util/auth-supabase-api', () => ({
      getAuthSession: vi.fn().mockRejectedValue({ data: { session: mockSession } }),
    }));

    // 스토리지 클리어 유틸 모킹
    vi.doMock('../../util/clear-storage-key', () => ({
      clearStorageKeys: vi.fn(),
    }));

    // Supabase 클라이언트 모킹
    vi.doMock('@/lib/supabase', () => ({
      default: {
        auth: {
          onAuthStateChange: vi.fn(() => ({
            data: { subscription: { unsubscribe: vi.fn() } },
          })),
        },
      },
    }));

    const { default: useAuthSession } = await import('../use-auth-session');
    const { result } = renderHook(() => useAuthSession());

    await waitFor(() => {
      expect(result.current.isLogin).toBe(false);
    });
  });

  it('JWT 검증에 실패할 경우, isLogin을 false로 설정', async () => {
    // JWT 유효성 검증 모킹 (검증 실패)
    vi.doMock('../../util/verify-auth-jwt', () => ({
      verifyAuthJWT: vi.fn().mockResolvedValue(null),
    }));

    // Supabase 세션 조회 API 모킹
    vi.doMock('../../util/auth-supabase-api', () => ({
      getAuthSession: vi.fn().mockResolvedValue({ data: { session: mockSession } }),
    }));

    // 스토리지 클리어 유틸 모킹
    vi.doMock('../../util/clear-storage-key', () => ({
      clearStorageKeys: vi.fn(),
    }));

    // Supabase 클라이언트 모킹
    vi.doMock('@/lib/supabase', () => ({
      default: {
        auth: {
          onAuthStateChange: vi.fn(() => ({
            data: { subscription: { unsubscribe: vi.fn() } },
          })),
        },
      },
    }));

    const { default: useAuthSession } = await import('../use-auth-session');
    const { result } = renderHook(() => useAuthSession());

    await waitFor(() => {
      expect(result.current.isLogin).toBe(false);
    });
  });

  it('onAuthStateChange 이벤트가 SIGNED_OUT일 경우, isLogin을 false로 설정하고 스토리지 비움', async () => {
    const mockClearStorageKeys = vi.fn();
    // 스토리지 클리어 유틸 모킹
    vi.doMock('../../util/clear-storage-key', () => ({ clearStorageKeys: mockClearStorageKeys }));

    // JWT 유효성 검증 모킹
    vi.doMock('../../util/verify-auth-jwt', () => ({ verifyAuthJWT: vi.fn().mockResolvedValue(true) }));

    // Supabase 세션 조회 API 모킹 (세션 없음)
    vi.doMock('../../util/auth-supabase-api', () => ({
      getAuthSession: vi.fn().mockResolvedValue({ data: { session: null } }),
    }));

    let savedCallback: any;
    // Supabase 클라이언트 모킹
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

    const { default: useAuthSession } = await import('../use-auth-session');
    const { result } = renderHook(() => useAuthSession());

    await act(async () => {
      savedCallback('SIGNED_OUT', null);
    });

    expect(result.current.isLogin).toBe(false);
    expect(mockClearStorageKeys).toHaveBeenCalled();
  });

  it('onAuthStateChange 이벤트가 SIGNED_IN일 경우, isLogin을 false로 설정', async () => {
    const mockClearStorageKeys = vi.fn();
    // 스토리지 클리어 유틸 모킹
    vi.doMock('../../util/clear-storage-key', () => ({ clearStorageKeys: mockClearStorageKeys }));

    // JWT 유효성 검증 모킹
    vi.doMock('../../util/verify-auth-jwt', () => ({ verifyAuthJWT: vi.fn().mockResolvedValue(true) }));

    // Supabase 세션 조회 API 모킹
    vi.doMock('../../util/auth-supabase-api', () => ({
      getAuthSession: vi.fn().mockResolvedValue({ data: { session: mockSession } }),
    }));

    let savedCallback: any;
    // Supabase 클라이언트 모킹
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

    const { default: useAuthSession } = await import('../use-auth-session');
    const { result } = renderHook(() => useAuthSession());

    await act(async () => {
      savedCallback('SIGNED_IN', null);
    });

    expect(result.current.isLogin).toBe(false);
    expect(mockClearStorageKeys).toHaveBeenCalledTimes(1);
  });
});
