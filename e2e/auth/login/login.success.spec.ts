import { expect, test } from '@playwright/test';
import { TEST_ACCOUNT } from '../common/const';
import { login_S1 } from './fixture/index.success.fixture';

const TEST_PAEG_URL = '/auth/login';
const REDIRECT_PAGE_URL = '/';

/**
 * @file 로그인 E2E 테스트
 * @description [성공] 로그인 기능의 End-to-End 시나리오를 검증합니다.
 *   - 성공: 올바른 정보 입력 시 로그인 성공 및 메인 페이지로 리다이렉트
 */
test.describe('[성공] 로그인', () => {
  /**
   * [성공] 올바른 정보 입력 시 로그인 성공 및 메인 페이지 리다이렉트
   * - 입력, 유효성 검사, 토스트 메시지, URL 이동
   */
  login_S1('올바른 정보 입력 - 로그인 성공 및 메인 페이지 이동', async ({ page }) => {
    // 1. 로그인 페이지로 이동
    await page.goto(TEST_PAEG_URL);

    // 2. 아이디/비밀번호 입력 필드, 버튼 가져오기
    const idInput = page.locator('input[name="id"]');
    const pwdInput = page.locator('input[name="password"]');
    const loginButton = page.getByText('입력하기', { exact: true });

    // 3. 잘못된 형식 입력
    await idInput.click();
    await idInput.fill(TEST_ACCOUNT.WRONG.ID);
    await pwdInput.click();
    await pwdInput.fill(TEST_ACCOUNT.WRONG.PASSWORD);
    await loginButton.click();

    // 4. 유효성 검사 실패 확인
    const idMsg = page.getByText('올바른 이메일 주소 형식이 아닙니다.', { exact: true });
    const pwdMsg = page.getByText('소문자, 대문자, 숫자, 특수문자가 포함되어야 합니다.', { exact: true });
    const submitFailButton = page.getByText('검증 실패', { exact: true });
    await expect(idInput).toHaveAttribute('data-invalid', 'true');
    await expect(pwdInput).toHaveAttribute('data-invalid', 'true');
    await expect(idMsg).toBeVisible();
    await expect(pwdMsg).toBeVisible();
    await expect(submitFailButton).toBeVisible();

    // 5. 올바른 정보 입력 후 오류 사라짐 확인
    await idInput.click();
    await idInput.fill(TEST_ACCOUNT.ID);
    await expect(idMsg).not.toBeVisible();
    await expect(submitFailButton).not.toBeVisible();
    await pwdInput.click();
    await pwdInput.fill(TEST_ACCOUNT.PASSWORD);
    await expect(pwdMsg).not.toBeVisible();

    // 6. 로그인 버튼 클릭 및 성공 토스트 확인
    await loginButton.click();
    await expect(page.getByText('로그인 성공')).toBeVisible();

    // 7. 메인 페이지로 리다이렉트 확인
    await expect(page).toHaveURL(REDIRECT_PAGE_URL);
  });
});
