/**
 * @file auth-validation 모듈 단위 테스트입니다.
 * @description 인증 관련 데이터 검증 함수와 스키마가
 *              올바르게 동작하는지 검증합니다.
 */

import { describe, it, expect } from 'vitest';
import { AUTH_MESSAGES } from '@/constants/message/auth';
import { PWD_MAX, PWD_MIN } from '@/features/auth/const';
import validate from '../function/auth-validate';

describe('auth-validation 모듈', () => {
  describe('schema.login', () => {
    it('올바른 이메일/비밀번호 입력 시, 성공 반환', async () => {
      const data = { id: 'test@example.com', password: 'Aa1!aaaa' };
      const result = validate.schema.login.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('잘못된 이메일 입력 시, 오류 반환', async () => {
      const data = { id: 'test', password: 'Aa1!aaaa' };
      const result = validate.schema.login.safeParse(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(AUTH_MESSAGES.email.invalid);
    });

    it('규칙에 맞지 않는 비밀번호 입력 시, 오류 반환', async () => {
      // 비밀번호 최소 길이 미충족
      const data = { id: 'test@example.com', password: 'aaaa' };
      const result = validate.schema.login.safeParse(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(AUTH_MESSAGES.password.min(PWD_MIN));
    });
  });

  describe('schema.signup', () => {
    it('비밀번호와 확인 일치 시, 성공 반환', async () => {
      const data = { id: 'test@example.com', password: 'Aa1!aaaa', confirmPassword: 'Aa1!aaaa' };
      const result = validate.schema.signup.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('비밀번호와 확인 불일치 시, 오류 반환', async () => {
      const data = { id: 'test@example.com', password: 'Aa1!aaaa', confirmPassword: 'Bb2!bbbb' };
      const result = validate.schema.signup.safeParse(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(AUTH_MESSAGES.confirmPassword.mismatch);
    });

    it('비밀번호 미입력 시, 오류 반환', async () => {
      const data = { id: 'test@example.com', password: '', confirmPassword: '' };
      const result = validate.schema.signup.safeParse(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(AUTH_MESSAGES.password.required);
    });

    it('8자 미만 비밀번호 입력 시, 오류 반환', async () => {
      const data = { id: 'test@example.com', password: 'Aa1!aaa', confirmPassword: 'Aa1!aaa' };
      const result = validate.schema.signup.safeParse(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(AUTH_MESSAGES.password.min(PWD_MIN));
    });

    it(`${PWD_MAX}자 초과 비밀번호 입력 시, 오류 반환`, async () => {
      const data = {
        id: 'test@example.com',
        password: 'AAAAAa1AAAAAa1AAAAAa1AAAAAa1AAAAAa1!aaaaaaaaaaaaa',
        confirmPassword: 'AAAAAa1AAAAAa1AAAAAa1AAAAAa1AAAAAa1!aaaaaaaaaaaaa',
      };
      const result = validate.schema.signup.safeParse(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(AUTH_MESSAGES.password.max(PWD_MAX));
    });

    it('영문 없는 비밀번호 입력 시, 오류 반환', async () => {
      const data = { id: 'test@example.com', password: '1!aaaaaaaa', confirmPassword: '1!aaaaaaaa' };
      const result = validate.schema.signup.safeParse(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(AUTH_MESSAGES.password.letter);
    });

    it('숫자 없는 비밀번호 입력 시, 오류 반환', async () => {
      const data = { id: 'test@example.com', password: 'Aa!aaaaaa', confirmPassword: 'Aa!aaaaaa' };
      const result = validate.schema.signup.safeParse(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(AUTH_MESSAGES.password.number);
    });

    it('특수문자 없는 비밀번호 입력 시, 오류 반환', async () => {
      const data = { id: 'test@example.com', password: 'Aa1aaaaaa', confirmPassword: 'Aa1aaaaaa' };
      const result = validate.schema.signup.safeParse(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(AUTH_MESSAGES.password.special);
    });

    it('\\ 포함된 비밀번호 입력 시, 오류 반환', async () => {
      const data = { id: 'test@example.com', password: 'Aa1!aaa\\a', confirmPassword: 'Aa1!aaa\\a' };
      const result = validate.schema.signup.safeParse(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(AUTH_MESSAGES.password.noBackslash);
    });
  });

  describe('schema.findPassword', () => {
    it('올바른 이메일 입력 시, 성공 반환', async () => {
      const data = { id: 'test@example.com' };
      const result = validate.schema.findPassword.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('빈 이메일 입력 시, 오류 반환', async () => {
      const data = { id: '' };
      const result = validate.schema.findPassword.safeParse(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(AUTH_MESSAGES.email.required);
    });
  });

  describe('schema.resetPassword', () => {
    it('규칙에 맞는 비밀번호 입력 시, 성공 반환', async () => {
      const data = { password: 'Aa1!aaaaa', confirmPassword: 'Aa1!aaaaa' };
      const result = validate.schema.resetPassword.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('규칙에 맞지 않는 비밀번호 입력 시, 오류 반환', async () => {
      // 최소 글자 미충족
      const data = { password: 'aaa', confirmPassword: 'aaa' };
      const result = validate.schema.resetPassword.safeParse(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(AUTH_MESSAGES.password.min(PWD_MIN));
    });
  });

  describe('schema.captchaToken', () => {
    it('토큰 존재 시, 성공 반환', async () => {
      const data = 'token123';
      const result = validate.schema.captchaToken.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('빈 문자열 입력 시, 오류 반환', async () => {
      const data = '';
      const result = validate.schema.captchaToken.safeParse(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(AUTH_MESSAGES.captcha.missing);
    });
  });
});
