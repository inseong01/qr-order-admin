import { TEST_ACCOUNT } from '../const';
import { expect, isSupabaseAPICalled, wrongInputTest } from '../utils/mock-auth-api';

// 로그인 실패 시나리오 E2E 테스트

wrongInputTest.describe('로그인 실패 시나리오', () => {
  wrongInputTest('잘못된 자격 증명으로 로그인 실패', async ({ page }) => {
    // 1. 로그인 페이지 이동
    await page.goto('/auth/login');

    const idInput = page.locator('input[name="id"]');
    const pwdInput = page.locator('input[name="password"]');

    // 2. 잘못된 이메일 또는 비밀번호 입력
    await idInput.fill(TEST_ACCOUNT.ID);
    await pwdInput.fill(TEST_ACCOUNT.WRONG.PASSWORD);

    const loginButton = page.getByText('입력하기', { exact: true });

    // 3. 로그인 버튼 클릭
    await loginButton.click();

    const errorMessage = page.getByText('소문자, 대문자, 숫자, 특수문자가 포함되어야 합니다.');

    // 4. 에러 메시지 확인
    await expect(errorMessage).toBeVisible();

    // 5. 입력 필드 스타일 변화 확인
    await expect(idInput).toHaveAttribute('data-invalid', 'false');
    await expect(pwdInput).toHaveAttribute('data-invalid', 'true');

    const changedLoginButton = page.getByText('검증 실패', { exact: true });

    // 6. 로그인 버튼 스타일 변화 확인 (오류 문구 발생)
    await expect(loginButton).not.toBeVisible();
    await expect(changedLoginButton).toBeVisible();
    await expect(changedLoginButton).toBeEnabled();

    // 7. 비밀번호 재입력
    await pwdInput.fill('');

    // 8. 로그인 버튼 스타일 변화 확인 (오류 문구 초기화)
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
    await expect(errorMessage).not.toBeVisible();
    await expect(changedLoginButton).not.toBeVisible();

    // 9. Supabase API 호출 여부
    expect(isSupabaseAPICalled).toBeFalsy();
  });
});
