import { test as base } from '@playwright/test';
import { mockSuccessTurnstile } from 'e2e/auth/common/fixtures/captcha.fixture';
import { mockSuccessLogin } from './index.fixture';

/**
 * 로그인 성공 시나리오
 */
export const login_S1 = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockSuccessLogin(page);
    await use(page);
  },
});

export { expect } from '@playwright/test';
