import { PATHS } from '@/constants/paths';

/* 비밀번호 최대/최소 길이 */
export const PWD_MIN = 8;
export const PWD_MAX = 32;

/* 허용 특수문자 */
export const SPECIAL_CHARS = '!@#$%^&*()_+-=[]{};\'\:"\\|<>?,./`~';
const ESCAPED = SPECIAL_CHARS.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

/* 특수문자 구성 조건 */
export const specialCharsRegex = new RegExp(`[${ESCAPED}]`);

/* 비밀번호 구성 조건 */
export const passwordLetterRegex = new RegExp(`(?=.*[a-z])(?=.*[A-Z])`);
export const passwordNumberRegex = new RegExp(`(?=.*\\d)`);
export const passwordSpecialRegex = new RegExp(`(?=.*[${ESCAPED}])`);
export const passwordRegex = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[${ESCAPED}])[a-zA-Z\\d${ESCAPED}]+$`);

/* 리다이렉트 경로 */
export const localResetPasswordUrl = `http://localhost:5173${PATHS.AUTH.RESET.PASSWORD}`;
export const productResetPasswordUrl = `${import.meta.env.VITE_CLIENT_URL + PATHS.AUTH.RESET.PASSWORD}`;

/* 토큰명 */
export const CAPTCHA_TOKEN = 'captcha_token';

/* 리다이렉트 지연 */
export const REDIRECT_DELAY = 2000;

/* 캡챠 테스트 키 */
export const CAPTCHA_PASS_TEST_KEY = '1x00000000000000000000AA';
export const CAPTCHA_FAIL_TEST_KEY = '2x00000000000000000000AB';
