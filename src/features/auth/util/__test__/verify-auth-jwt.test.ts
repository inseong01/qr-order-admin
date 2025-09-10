/**
 * @file verifyAuthJWT 유틸리티 함수의 단위 테스트입니다.
 * @description Supabase 클라이언트의 getSession을 호출하여 현재 사용자의 JWT 세션이
 *              유효한지 확인하고, 유효한 경우 세션 객체를, 그렇지 않은 경우 null을 반환하는지 검증합니다.
 */
import { AuthError, Session } from '@supabase/supabase-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import supabase from '@/lib/supabase';
import { verifyAuthJWT } from '../verify-auth-jwt';

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

    const { session } = await verifyAuthJWT();

    expect(mockSupabase.auth.getSession).toHaveBeenCalledTimes(1);
    expect(session).toEqual(mockSession);
  });

  /* 2. 세션이 존재하지 않는 경우 (null) */
  it('세션이 존재하지 않는 경우 null 반환', async () => {
    // getSession이 null 세션을 반환하도록 기본 설정되어 있음
    const result = await verifyAuthJWT();

    expect(mockSupabase.auth.getSession).toHaveBeenCalledTimes(1);
    expect(result.session).toBeNull();
  });

  /* 3. getSession 호출 시 에러가 발생하는 경우 */
  it('getSession 호출이 실패한 경우 오류를 던지고 로그 남김', async ({ expect }) => {
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: { message: 'Failed to verify JWT session' } as AuthError,
    });

    vi.spyOn(console, 'error');
    await expect(verifyAuthJWT()).rejects.toThrowError();
    expect(mockSupabase.auth.getSession).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith('Failed to verify JWT session');
  });

  /* 4. 세션은 있지만 유효하지 않은 경우 */
  // - Supabase의 getSession은 만료된 세션에 대해 자동으로 null 반환,
  // - refresh 시도하므로, 여기서는 getSession이 null을 반환하는 케이스로 처리
  it('세션이 만료되었거나 유효하지 않은 경우 null 반환', async () => {
    const { session } = await verifyAuthJWT();

    expect(mockSupabase.auth.getSession).toHaveBeenCalledTimes(1);
    expect(session).toBeNull();
  });
});
