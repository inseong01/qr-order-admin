/**
 * @file AuthErrorHandler 클래스의 단위 테스트입니다.
 * @description Zod 유효성 검사 오류, Supabase 인증 오류, 그리고 일반 오류 등
 *              다양한 유형의 에러를 올바르게 처리하는지 검증합니다.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthErrorHandler } from '../error-handler';
import { ZodError, ZodIssue, ZodIssueCode } from 'zod';
import { AuthError } from '@supabase/supabase-js';

/* Mock 함수 설정 */
const mockShowMessage = vi.fn();
const mockSetInputMessage = vi.fn();
const mockCaptchaRefresh = vi.fn();

/* AuthErrorHandler 클래스 테스트 */
describe('AuthErrorHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* 1. 클래스 인스턴스 생성 확인 */
  it('AuthErrorHandler의 인스턴스가 정상적으로 생성되어야 함', () => {
    const errorHandle = new AuthErrorHandler(mockShowMessage, mockSetInputMessage, mockCaptchaRefresh);

    expect(errorHandle).toBeInstanceOf(AuthErrorHandler);
    expect(errorHandle).toHaveProperty('handle');
  });

  /* 2. handle 메서드 동작 확인 */
  describe('handle 메서드', () => {
    /* 2-1. Zod 에러 처리 */
    it('Zod 에러 발생 시 setInputMessage가 호출되어야 함', () => {
      const errorHandle = new AuthErrorHandler(mockShowMessage, mockSetInputMessage, mockCaptchaRefresh);
      const invalid_string: ZodIssue = {
        code: ZodIssueCode.invalid_string,
        message: 'email invalid_string error',
        path: ['email'],
        validation: 'email',
      };

      const zodeError = new ZodError([invalid_string]);
      errorHandle.handle(zodeError);

      expect(mockShowMessage).not.toHaveBeenCalled();
      expect(mockCaptchaRefresh).not.toHaveBeenCalled();
      expect(mockSetInputMessage).toHaveBeenCalledWith([invalid_string]);
    });

    /* 2-2. Supabase Auth 에러 처리 */
    it('Supabase Auth 에러 발생 시 적절한 핸들러가 동작해야 함', () => {
      const errorHandle = new AuthErrorHandler(mockShowMessage, mockSetInputMessage, mockCaptchaRefresh);
      const bad_json = new AuthError('Auth Error', 403, 'bad_json');
      errorHandle.handle(bad_json);

      expect(mockShowMessage).toHaveBeenCalledWith('요청 형식이 올바르지 않습니다.');
      expect(mockCaptchaRefresh).not.toHaveBeenCalled();
      expect(mockSetInputMessage).not.toHaveBeenCalled();

      const captcha_failed = new AuthError('Auth error', 403, 'captcha_failed');
      errorHandle.handle(captcha_failed);
      expect(mockShowMessage).toHaveBeenCalledWith('캡차 인증에 실패했습니다. 다시 시도해주세요.');
      expect(mockCaptchaRefresh).toHaveBeenCalled();
      expect(mockSetInputMessage).not.toHaveBeenCalled();
    });

    /* 2-3. 그 외 일반 에러 처리 */
    it('일반 에러 발생 시 showMessage가 호출되어야 함', () => {
      const errorHandle = new AuthErrorHandler(mockShowMessage, mockSetInputMessage, mockCaptchaRefresh);
      const message = 'Unexpected error';
      const error = new Error(message);
      errorHandle.handle(error);

      expect(mockShowMessage).toHaveBeenCalledWith(`알 수 없는 오류가 발생했습니다. (${error})`);
      expect(mockCaptchaRefresh).not.toHaveBeenCalled();
      expect(mockSetInputMessage).not.toHaveBeenCalled();
    });
  });
});
