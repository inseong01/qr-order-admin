export const TEST_ACCOUNT = {
  WRONG: {
    /** 마무리 되지 않은 이메일 입력 */
    ID: 'test@example',
    /** 대문자 없는 비밀번호 */
    PASSWORD: 'password123!',
  },
  NONE_EXIST_ID: 'none_email@example.com',
  ID: 'test@example.com',
  PASSWORD: 'Password123!',
} as const;

export const TEST_CAPTCHA_TOKEN = 'mocked-token-1234';
export const TEST_NONE_CAPTCHA_TOKEN = '';

export const TEST_CAPTCHA_WIDGET_ID = 'mock-widget-1';

export const TEST_ACCESS_TOKEN = 'mock-access-token';
export const TEST_REFRESH_TOKEN = 'mock-refresh-token';

export const CAPTCHA_PASS_TEST_KEY = '1x00000000000000000000AA';
export const CAPTCHA_FAIL_TEST_KEY = '2x00000000000000000000AB';

/* 세션 키 이름에 따라서 세션 스토리지 인식 
  - 현재 프로젝트 아이디 넣을 시 로그인 페이지 이동
  - 임의 프로젝트 아이디 넣을 시 Auth session missing! 발생  
*/
export const FAKE_PROJECT_REF = 'test-project-ref';
export const TEST_SESSION_KEY = `sb-${FAKE_PROJECT_REF}-auth-token`;
export const TEST_SESSION_VALUE = {
  access_token: TEST_ACCESS_TOKEN,
  token_type: 'bearer',
  expires_in: 3600,
  expires_at: Date.now() + 36000,
  refresh_token: TEST_REFRESH_TOKEN,
};
