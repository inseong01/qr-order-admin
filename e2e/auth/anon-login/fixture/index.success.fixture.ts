import { test as base } from '../../common/fixtures/captcha.fixture';
import { mockSuccessTurnstile } from '../../common/fixtures/captcha.fixture';
import { mockAnonymousLoginSuccess } from './index.fixture';

/**
 * 익명 로그인 성공
 */
export const anonymousLogin_S1 = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockAnonymousLoginSuccess(page);
    await use(page);
  },
});
