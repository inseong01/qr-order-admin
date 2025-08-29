import { mockFailSignup, mockSuccessSignup } from './index.fixture';
import { test as base } from '../../common/fixtures/captcha.fixture';
import { mockFailTurnstile, mockSuccessTurnstile } from '../../common/fixtures/captcha.fixture';

/**
 * 회원가입 실패 - 캡챠 인증 실패
 */
export const signup_F1 = base.extend({
  page: async ({ page }, use) => {
    await mockFailTurnstile(page);
    await mockSuccessSignup(page);
    await use(page);
  },
});

/**
 * 회원가입 실패 - 이미 가입된 이메일 (API 실패)
 */
export const signup_F2 = base.extend({
  page: async ({ page }, use) => {
    await mockSuccessTurnstile(page);
    await mockFailSignup(page);
    await use(page);
  },
});
