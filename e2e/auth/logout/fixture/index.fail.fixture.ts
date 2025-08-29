import { test as base } from '@playwright/test';
import { createAuthContext } from '../../util/auth-context';
import { mockLogoutFail, mockMainPageAPI } from './index.fixture';

/**
 * 로그아웃 실패 - API 오류
 */
export const logout_F1 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await mockMainPageAPI(page);
    await mockLogoutFail(page);
    await use(page);
  },
});

export { expect } from '@playwright/test';
