import { AuthError, Session } from '@supabase/supabase-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import supabase from '@/lib/supabase';
import { verifyAuthJWT } from '../../util/verify-auth-jwt';

/* Supabase 클라이언트 모킹 */
vi.mock('@/lib/supabase', () => {
  const mockAuth = {
    getSession: vi.fn(),
  };
  return {
    default: {
      auth: mockAuth,
    },
  };
});

/* 모킹된 supabase 인스턴스 */
const mockSupabase = vi.mocked(supabase, true);

describe('verifyAuthJWT', () => {
  beforeEach(() => {
    // 각 테스트 전에 모든 mock 함수 초기화
    vi.clearAllMocks();
    // 기본적으로 세션 없다고 가정
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null }, error: null });
  });

  /* 1. 세션이 유효하게 존재하는 경우 */
  it('세션이 유효한 경우 세션을 반환', async () => {
    const mockSession: Session = {
      access_token: 'valid-token',
      token_type: 'Bearer',
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      refresh_token: 'refresh-token',
      user: {
        id: 'user-id-123',
        aud: 'authenticated',
        email: 'test@example.com',
        app_metadata: {},
        user_metadata: {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    };

    // getSession이 유효한 세션을 반환하도록 설정
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: mockSession }, error: null });

    const result = await verifyAuthJWT();

    // getSession이 호출되었는지 확인
    expect(mockSupabase.auth.getSession).toHaveBeenCalledTimes(1);
    // 유효한 세션이 반환되었는지 확인
    expect(result).toEqual(mockSession);
  });

  /* 2. 세션이 존재하지 않는 경우 (null) */
  it('세션이 존재하지 않는 경우 null 반환', async () => {
    // getSession이 null 세션을 반환하도록 기본 설정되어 있음

    const result = await verifyAuthJWT();

    // getSession이 호출되었는지 확인
    expect(mockSupabase.auth.getSession).toHaveBeenCalledTimes(1);
    // null이 반환되었는지 확인
    expect(result).toBeNull();
  });

  /* 3. getSession 호출 시 에러가 발생하는 경우 */
  it('getSession 호출이 실패한 경우 null을 반환하고 에러를 로그 남김', async () => {
    const mockError = new AuthError('Failed to verify JWT session');
    // getSession이 에러를 반환하도록 설정
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null }, error: mockError });

    // console.error를 스파이하여 에러 로깅을 확인
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await verifyAuthJWT();
    // getSession이 호출되었는지 확인
    expect(mockSupabase.auth.getSession).toHaveBeenCalledTimes(1);
    // console.error가 호출되었는지 확인
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to verify JWT session');
    // null이 반환되었는지 확인
    expect(result).toBeNull();

    // 스파이 복원
    consoleErrorSpy.mockRestore();
  });

  /* 4. 세션은 있지만 유효하지 않은 경우 */
  // - Supabase의 getSession은 만료된 세션에 대해 자동으로 null 반환,
  // - refresh 시도하므로, 여기서는 getSession이 null을 반환하는 케이스로 처리
  it('세션이 만료되었거나 유효하지 않은 경우 null 반환', async () => {
    const result = await verifyAuthJWT();

    expect(mockSupabase.auth.getSession).toHaveBeenCalledTimes(1);
    expect(result).toBeNull();
  });
});
