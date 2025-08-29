import { expect, test } from '@playwright/test';
import { TEST_ACCOUNT } from '../common/const';
import { login_F1, login_F2 } from './fixture/index.fail.fixture';

const TEST_PAEG_URL = '/auth/login';

/**
 * @file 로그인 E2E 테스트
 * @description [실패] 로그인 기능의 End-to-End 시나리오를 검증합니다.
 *   - 실패: 캡챠 인증 실패 시 로그인 불가
 *   - 실패: 잘못된 자격 증명 입력 시 오류 메시지 표시
 */
test.describe('[실패] 로그인', () => {
  /**
   * [실패] 캡챠 인증 실패 시 로그인 불가
   * - 입력 필드/버튼 비활성화, API 미호출 확인
   */
  login_F1('캡챠 인증 실패 - 입력/버튼 비활성화', async ({ page }) => {
    // 1. 로그인 페이지로 이동
    await page.goto(TEST_PAEG_URL);

    // 2. 입력 필드 비활성화 확인
    await expect(page.locator('input[name="id"]')).toBeDisabled();
    await expect(page.locator('input[name="password"]')).toBeDisabled();

    // 3. '검증 실패' 버튼 표시 확인
    const failedButton = page.getByText('검증 실패', { exact: true });
    await expect(failedButton).toBeVisible();

    // 4. 다른 이동 버튼 비활성화 확인
    const signupButton = page.getByText('회원가입', { exact: true });
    const findPwdButton = page.getByText('비밀번호 찾기', { exact: true });
    const loginAnnonButton = page.getByText('방문자로 접속하기', { exact: true });
    await expect(signupButton).toBeDisabled();
    await expect(findPwdButton).toBeDisabled();
    await expect(loginAnnonButton).toBeDisabled();
  });

  /**
   * [실패] 잘못된 자격 증명 입력 시 오류 메시지 표시
   * - 에러 메시지, 버튼 상태 변경
   */
  login_F2('잘못된 자격 증명 입력 - 오류 메시지 표시', async ({ page }) => {
    // 1. 로그인 페이지로 이동
    await page.goto(TEST_PAEG_URL);

    // 2. 입력 필드/버튼 가져오기
    const idInput = page.locator('input[name="id"]');
    const pwdInput = page.locator('input[name="password"]');
    const loginButton = page.getByText('입력하기', { exact: true });

    // 3. 올바른 정보 입력 후 로그인 시도
    await idInput.click();
    await idInput.fill(TEST_ACCOUNT.ID);
    await pwdInput.click();
    await pwdInput.fill(TEST_ACCOUNT.PASSWORD);
    await loginButton.click();

    // 4. 에러 메시지 표시 확인
    const errorMessage = page.getByText('이메일/비밀번호가 올바르지 않습니다.');
    await expect(errorMessage).toBeVisible();

    // 5. 버튼 상태 변경 확인
    const changedLoginButton = page.getByText('검증 실패', { exact: true });
    await expect(loginButton).not.toBeVisible();
    await expect(changedLoginButton).toBeVisible();

    // 6. 비밀번호 재입력 시 버튼 초기화 확인
    await pwdInput.click();
    await pwdInput.fill('');
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
    await expect(changedLoginButton).not.toBeVisible();
  });
});
