import { describe, expect, it } from 'vitest';
import validate from '../function/validate';

describe('validate 함수 테스트', () => {
  describe('로그인', () => {
    it('성공', async () => {
      const loginForm = {
        id: 'insung940@naver.com',
        password: 'Qwer123!@#',
      };
      const { success, data } = await validate.schema.login.safeParseAsync(loginForm);
      expect(success).toBe(true);
      expect(data).toEqual(loginForm);
    });

    it('실패', async () => {
      const loginForm = {
        id: 'insung940@naver.com',
        // 브라우저 input에서는 값 자체 문자열 처리 - syntax error X
        password: `qwer123!@#\``,
      };
      const { success, data } = await validate.schema.login.safeParseAsync(loginForm);
      expect(success).toBe(false);
      expect(data).toBe(undefined);
    });
  });
});
