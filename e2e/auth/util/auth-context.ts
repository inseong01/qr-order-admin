import { Browser } from '@playwright/test';
import { TEST_ORIGN_URL, TEST_SESSION_KEY, TEST_SESSION_VALUE } from '../common/const';

export async function createAuthContext(browser: Browser) {
  return await browser.newContext({
    storageState: {
      cookies: [],
      origins: [
        {
          origin: TEST_ORIGN_URL,
          localStorage: [{ name: TEST_SESSION_KEY, value: JSON.stringify(TEST_SESSION_VALUE) }],
        },
      ],
    },
  });
}
