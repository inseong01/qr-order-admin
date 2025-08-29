import { test as base } from '../../common/fixtures/captcha.fixture';
import { mockSuccessTurnstile } from '../../common/fixtures/captcha.fixture';
import { mockSuccessSignup } from './index.fixture';

/**
 * 회원가입 성공
 */
export const signup_S1 = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockSuccessSignup(page);
    await use(page);
  },
});
