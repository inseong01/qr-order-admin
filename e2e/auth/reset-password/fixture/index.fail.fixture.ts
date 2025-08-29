import { test as base } from '@playwright/test';
import { mockFailTurnstile, mockSuccessTurnstile } from '../../common/fixtures/captcha.fixture';
import { mockRecoveryPasswordFail, mockRecoveryPasswordSuccess } from './index.fixture';

/**
 * 비밀번호 찾기 실패 - 캡챠 토큰 무효
 */
export const recoveryPassword_F1 = base.extend({
  page: async ({ page }, use) => {
    await mockFailTurnstile(page);
    await mockRecoveryPasswordFail(page);
    await use(page);
  },
});

/**
 * 비밀번호 찾기 실패 - 잘못된 이메일 형식
 */
export const recoveryPassword_F2 = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockRecoveryPasswordSuccess(page);
    await use(page);
  },
});

/**
 * 비밀번호 찾기 실패 - 인증 토큰 무효
 */
export const recoveryPassword_F3 = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockRecoveryPasswordFail(page);
    await use(page);
  },
});

export { expect } from '@playwright/test';
