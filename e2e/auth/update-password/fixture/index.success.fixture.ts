import { test as base } from '@playwright/test';
import { mockSuccessTurnstile } from '../../common/fixtures/captcha.fixture';
import { createAuthContext } from '../../util/auth-context';
import { mockUpdatePasswordSuccess } from './index.fixture';

/**
 * 비밀번호 재설정 성공
 */
export const updatePassword_S1 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context, browser }, use) => {
    const page = await context.newPage();
    await mockSuccessTurnstile(page);
    await mockUpdatePasswordSuccess(page, browser);
    await use(page);
  },
});
