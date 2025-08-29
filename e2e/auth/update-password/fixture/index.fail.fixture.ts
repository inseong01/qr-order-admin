import { test as base } from '@playwright/test';
import { mockUpdatePasswordFail, mockUpdatePasswordSuccess } from './index.fixture';
import { mockFailTurnstile, mockSuccessTurnstile } from '../../common/fixtures/captcha.fixture';
import { createAuthContext } from '../../util/auth-context';

/**
 * 비밀번호 재설정 실패 - 캡챠 토큰 무효
 */
export const updatePassword_F1 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context, browser }, use) => {
    const page = await context.newPage();
    await mockFailTurnstile(page);
    await mockUpdatePasswordSuccess(page, browser);
    await use(page);
  },
});

/**
 * 비밀번호 재설정 실패 - 잘못된 비밀번호 형식
 */
export const updatePassword_F2 = base.extend({
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

/**
 * 비밀번호 재설정 실패 - 인증 토큰 무효
 */
export const updatePassword_F3 = base.extend({
  context: async ({ browser }, use) => {
    const context = await createAuthContext(browser);
    await use(context);
    await context.close();
  },
  page: async ({ context, browser }, use) => {
    const page = await context.newPage();
    await mockSuccessTurnstile(page);
    await mockUpdatePasswordFail(page, browser);
    await use(page);
  },
});
