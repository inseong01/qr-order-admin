export const TEST_ACCOUNT = {
  WRONG: {
    /** 마무리 되지 않은 이메일 입력 */
    ID: 'test@example',
    /** 대문자 없는 비밀번호 */
    PASSWORD: 'password123!',
  },
  ID: 'test@example.com',
  PASSWORD: 'Password123!',
} as const;

export const TEST_CAPTCHA_TOKEN = 'mocked-token-1234';
export const TEST_NONE_CAPTCHA_TOKEN = '';

export const TEST_CAPTCHA_WIDGET_ID = 'mock-widget-1';

export const TEST_ACCESS_TOKEN = 'mock-access-token';
export const TEST_REFRESH_TOKEN = 'mock-refresh-token';
