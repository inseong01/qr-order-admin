import { test as base, mockSuccessTurnstile } from '../../common/fixtures/captcha.fixture';
import { mockFailTurnstile } from '../../common/fixtures/captcha.fixture';
import { mockAnonymousLoginFail, mockAnonymousLoginSuccess } from './index.fixture';

/**
 * 익명 로그인 실패 - 캡챠 인증 실패
 */
export const anonymousLogin_F1 = base.extend({
  page: async ({ page }, use) => {
    await mockFailTurnstile(page);
    // Supabase API는 호출되지 않아야 하지만, 만약을 위해 성공으로 모킹
    await mockAnonymousLoginSuccess(page);
    await use(page);
  },
});

/**
 * 익명 로그인 실패 - 유효하지 않는 캡챠 토큰
 */
export const anonymousLogin_F2 = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockAnonymousLoginFail(page);
    await use(page);
  },
});

export { expect } from '@playwright/test';
