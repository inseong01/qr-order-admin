import { mockFailLogin, mockSuccessLogin } from './index.fixture';
import { mockFailTurnstile } from '../../common/fixtures/captcha.fixture';
import { test as base, mockSuccessTurnstile } from '../../common/fixtures/captcha.fixture';

/**
 * 로그인 실패 - 캡챠 인증 실패
 */
export const login_F1 = base.extend({
  page: async ({ page }, use) => {
    await mockFailTurnstile(page);
    // Supabase API는 호출되지 않아야 하지만, 만약을 위해 성공으로 모킹
    await mockSuccessLogin(page);
    await use(page);
  },
});

/**
 * 로그인 실패 - 잘못된 자격 증명 입력 (API 실패)
 */
export const login_F2 = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockFailLogin(page);
    await use(page);
  },
});

export { expect } from '@playwright/test';
