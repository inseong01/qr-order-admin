import { test as base } from '@playwright/test';
import { createAuthContext } from '../../util/auth-context';
import { mockLogoutSuccess, mockMainPageAPI } from './index.fixture';

/**
 * 로그아웃 성공 시나리오
 */
export const logout_S1 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await mockMainPageAPI(page);
    await mockLogoutSuccess(page);
    await use(page);
  },
});

export { expect } from '@playwright/test';
