import { test as base } from '@playwright/test';
import { mockSuccessTurnstile } from '../../common/fixtures/captcha.fixture';
import { mockRecoveryPasswordSuccess } from './index.fixture';

/**
 * 비밀번호 찾기 성공
 */
export const recoveryPassword_S1 = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockRecoveryPasswordSuccess(page);
    await use(page);
  },
});

/**
 * 비밀번호 찾기 성공 - 존재하지 않는 이메일
 */
export const recoveryPassword_S2 = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockRecoveryPasswordSuccess(page);
    await use(page);
  },
});
