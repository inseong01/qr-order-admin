/**
 * @file Supabase 인증 API 래퍼 함수의 단위 테스트입니다.
 * @description 로그인, 회원가입, 로그아웃, 세션 조회 등 Supabase의 인증 관련 API 호출이
 *              성공 또는 실패 시 올바른 데이터를 반환하는지 검증합니다.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import supabase from '@/lib/supabase';
import { AuthError, Session, User } from '@supabase/supabase-js';

import {
  signInWithEmailAndPassword,
  signInAnonymously,
  signUpNewUser,
  requestPasswordResetEmail,
  updateUserPassword,
  signOutUser,
  getAuthSession,
} from '../auth-supabase-api';

/* Supabase 클라이언트 모킹 */
vi.mock('@/lib/supabase', () => {
  return {
    default: {
      auth: {
        signInWithPassword: vi.fn(),
        signInAnonymously: vi.fn(),
        signUp: vi.fn(),
        resetPasswordForEmail: vi.fn(),
        updateUser: vi.fn(),
        signOut: vi.fn(),
        getSession: vi.fn(),
      },
    },
  };
});

/* 모킹된 supabase 인스턴스 */
const mockSupabase = vi.mocked(supabase, true);

/* Auth Supabase API 테스트 */
describe('Auth Supabase API', () => {
  beforeEach(() => {
    // 각 테스트 전에 모든 mock 함수 초기화
    vi.clearAllMocks();
  });

  /* 1. signInWithEmailAndPassword 테스트 */
  describe('signInWithEmailAndPassword', () => {
    const testEmail = 'test@example.com';
    const testPassword = 'password123';
    const testCaptcha = 'captcha-token';

    it('로그인 성공하면 세션 데이터를 반환해야 함', async () => {
      const mockResponse = {
        data: { user: { id: 'user-1' } as User, session: { access_token: 'fake-token' } as Session },
        error: null,
      };
      mockSupabase.auth.signInWithPassword.mockResolvedValue(mockResponse);

      const result = await signInWithEmailAndPassword(testEmail, testPassword, testCaptcha);

      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: testEmail,
        password: testPassword,
        options: { captchaToken: testCaptcha },
      });
      expect(result).toEqual(mockResponse);
    });

    it('로그인 실패하면 에러 객체를 반환해야 함', async () => {
      const mockError = new AuthError('Invalid login credentials');
      const mockResponse = {
        data: { user: null, session: null },
        error: mockError,
      };
      mockSupabase.auth.signInWithPassword.mockResolvedValue(mockResponse);

      const result = await signInWithEmailAndPassword(testEmail, testPassword, testCaptcha);

      expect(result.error).toBeInstanceOf(AuthError);
      expect(result.error?.message).toBe('Invalid login credentials');
    });
  });

  /* 2. signInAnonymously 테스트 */
  describe('signInAnonymously', () => {
    const testCaptcha = 'captcha-token';

    it('익명 로그인 성공하면 세션 데이터를 반환해야 함', async () => {
      const mockResponse = {
        data: { user: { id: 'user-1' } as User, session: { access_token: 'anonymous-fake-token' } as Session },
        error: null,
      };
      mockSupabase.auth.signInAnonymously.mockResolvedValue(mockResponse);

      const result = await signInAnonymously(testCaptcha);

      expect(mockSupabase.auth.signInAnonymously).toHaveBeenCalledWith({
        options: { captchaToken: testCaptcha },
      });
      expect(result).toEqual(mockResponse);
    });

    it('익명 로그인 실패하면 에러 객체를 반환해야 함', async () => {
      const mockError = new AuthError('Anonymous sign-in failed');
      const mockResponse = {
        data: { user: null, session: null },
        error: mockError,
      };
      mockSupabase.auth.signInAnonymously.mockResolvedValue(mockResponse);

      const result = await signInAnonymously(testCaptcha);

      expect(result.error).toBeInstanceOf(AuthError);
      expect(result.error?.message).toBe('Anonymous sign-in failed');
    });
  });

  /* 3. signUpNewUser 테스트 */
  describe('signUpNewUser', () => {
    const testEmail = 'new@example.com';
    const testPassword = 'new-password';
    const testCaptcha = 'captcha-token';

    it('회원가입 성공하면 사용자 데이터를 반환해야 함', async () => {
      const mockResponse = {
        data: { user: { id: 'new-user-id' } as User, session: null },
        error: null,
      };
      mockSupabase.auth.signUp.mockResolvedValue(mockResponse);

      const result = await signUpNewUser(testEmail, testPassword, testCaptcha);

      expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
        email: testEmail,
        password: testPassword,
        options: { captchaToken: testCaptcha, data: undefined },
      });
      expect(result).toEqual(mockResponse);
    });

    it('회원가입 실패하면 에러 객체를 반환해야 함', async () => {
      const mockError = new AuthError('User already registered');
      const mockResponse = {
        data: { user: null, session: null },
        error: mockError,
      };
      mockSupabase.auth.signUp.mockResolvedValue(mockResponse);

      const result = await signUpNewUser(testEmail, testPassword, testCaptcha);

      expect(result.error).toBeInstanceOf(AuthError);
      expect(result.error?.message).toBe('User already registered');
    });
  });

  /* 4. requestPasswordResetEmail 테스트 */
  describe('requestPasswordResetEmail', () => {
    const testEmail = 'reset@example.com';
    const testCaptcha = 'captcha-token';
    const redirectUrl = 'http://localhost/reset';

    it('비밀번호 재설정 성공하면 이메일을 요청해야 함', async () => {
      const mockResponse = { data: {}, error: null };
      mockSupabase.auth.resetPasswordForEmail.mockResolvedValue(mockResponse);

      const result = await requestPasswordResetEmail(testEmail, testCaptcha, redirectUrl);

      expect(mockSupabase.auth.resetPasswordForEmail).toHaveBeenCalledWith(testEmail, {
        captchaToken: testCaptcha,
        redirectTo: redirectUrl,
      });
      expect(result).toEqual(mockResponse);
    });

    it('비밀번호 재설정 요청 실패하면 에러 객체를 반환해야 함', async () => {
      const mockError = new AuthError('Error sending reset password email', 403, 'mockError');
      const mockResponse = { data: null, error: mockError };
      mockSupabase.auth.resetPasswordForEmail.mockResolvedValue(mockResponse);

      const result = await requestPasswordResetEmail(testEmail, testCaptcha, redirectUrl);

      expect(result.error).toBeInstanceOf(AuthError);
      expect(result.error?.message).toBe('Error sending reset password email');
    });
  });

  /* 5. updateUserPassword 테스트 */
  describe('updateUserPassword', () => {
    const newPassword = 'new-strong-password';

    it('사용자 비밀번호 업데이트 성공', async () => {
      const mockResponse = {
        data: { user: { updated_at: new Date().toISOString() } as User },
        error: null,
      };
      mockSupabase.auth.updateUser.mockResolvedValue(mockResponse);

      const result = await updateUserPassword(newPassword);

      expect(mockSupabase.auth.updateUser).toHaveBeenCalledWith({ password: newPassword });
      expect(result).toEqual(mockResponse);
    });

    it('비밀번호 업데이트 실패하면 에러 객체를 반환해야 함', async () => {
      const mockError = new AuthError('Failed to update password');
      const mockResponse = { data: { user: null }, error: mockError };
      mockSupabase.auth.updateUser.mockResolvedValue(mockResponse);

      const result = await updateUserPassword(newPassword);

      expect(result.error).toBeInstanceOf(AuthError);
      expect(result.error?.message).toBe('Failed to update password');
    });
  });

  /* 6. signOutUser 테스트 */
  describe('signOutUser', () => {
    it('로그아웃 성공', async () => {
      const mockResponse = { error: null };
      mockSupabase.auth.signOut.mockResolvedValue(mockResponse);

      const result = await signOutUser();

      expect(mockSupabase.auth.signOut).toHaveBeenCalledTimes(1);
      expect(result.error).toBeNull();
    });

    it('로그아웃 실패하면 에러 객체를 반환해야 함', async () => {
      const mockError = new AuthError('Failed to sign out');
      const mockResponse = { error: mockError };
      mockSupabase.auth.signOut.mockResolvedValue(mockResponse);

      const result = await signOutUser();

      expect(result.error).toBeInstanceOf(AuthError);
      expect(result.error?.message).toBe('Failed to sign out');
    });
  });

  /* 7. getAuthSession 테스트 */
  describe('getAuthSession', () => {
    it('현재 세션 정보를 성공적으로 가져와야 함', async () => {
      const mockResponse = {
        data: { session: { access_token: 'current-session-token' } as Session },
        error: null,
      };
      mockSupabase.auth.getSession.mockResolvedValue(mockResponse);

      const result = await getAuthSession();

      expect(mockSupabase.auth.getSession).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse);
    });

    it('세션 정보를 가져오는 데 실패하면 에러 객체를 반환해야 함', async () => {
      const mockError = new AuthError('Failed to get session');
      const mockResponse = { data: { session: null }, error: mockError };
      mockSupabase.auth.getSession.mockResolvedValue(mockResponse);

      const result = await getAuthSession();

      expect(result.error).toBeInstanceOf(AuthError);
      expect(result.error?.message).toBe('Failed to get session');
    });
  });
});
