import { test as base, Page } from '@playwright/test';
import { CAPTCHA_FAIL_TEST_KEY, CAPTCHA_PASS_TEST_KEY, TEST_CAPTCHA_TOKEN, TEST_CAPTCHA_WIDGET_ID } from '../const';

declare global {
  interface Window {
    TEST_SITEKEY?: string;
  }
}

/**
 * Turnstile 스크립트 요청을 모킹하여 성공 콜백을 즉시 실행합니다.
 * @param page Playwright Page 객체
 * @param token 모의 캡챠 토큰
 */
export async function mockSuccessTurnstile(page: Page, token = TEST_CAPTCHA_TOKEN) {
  await page.addInitScript((key) => {
    window.TEST_SITEKEY = key;
  }, CAPTCHA_PASS_TEST_KEY);

  await page.route(/.*\/turnstile\/v0\/.*\.js.*/, (route) => {
    route.fulfill({
      contentType: 'application/javascript',
      body: `
      window.turnstile = {
        render: (selector, options) => {
          options.callback('${token}');
          return '${TEST_CAPTCHA_WIDGET_ID}';
        },
        reset: () => {},
        remove: () => {}
      };
    `,
    });
  });
}

/**
 * Turnstile 스크립트 요청을 모킹하여 에러 콜백을 실행합니다.
 * @param page Playwright Page 객체
 */
export async function mockFailTurnstile(page: Page) {
  await page.addInitScript((key) => {
    window.TEST_SITEKEY = key;
  }, CAPTCHA_FAIL_TEST_KEY);

  await page.route(/.*\/turnstile\/v0\/.*\.js.*/, (route) => {
    route.fulfill({
      contentType: 'application/javascript',
      body: `
        window.turnstile = {
          render: (selector, options) => {
            setTimeout(() => options['error-callback'](), 0);
            return '${TEST_CAPTCHA_WIDGET_ID}';
          },
          reset: () => {},
          remove: () => {}
        };
      `,
    });
  });
}

export const test = base;
