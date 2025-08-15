import { TEST_ACCOUNT } from '../const';
import { expect, isSupabaseAPICalled, successTest } from '../utils/mock-auth-api';

// 로그인 성공 시나리오 E2E 테스트

successTest.describe('로그인 성공 시나리오', () => {
  successTest('로그인 성공 후 메인 페이지로 이동', async ({ page }) => {
    // 1. 로그인 페이지 이동
    await page.goto('/auth/login'); // PATHS.AUTH.LOGIN

    const idInput = page.locator('input[name="id"]');
    const pwdInput = page.locator('input[name="password"]');

    // 2. 아이디와 비밀번호 입력
    await idInput.fill(TEST_ACCOUNT.ID);
    await pwdInput.fill(TEST_ACCOUNT.PASSWORD);

    // 3. 로그인 버튼 클릭
    const loginButton = page.getByText('입력하기', { exact: true });
    await loginButton.click();

    // 4. supabase.auth.signInWithPassword 호출 성공 확인 (API 호출 확인)
    await expect(page.getByText('로그인 성공')).toBeVisible();

    // 5. 메인 페이지로 리다이렉트 확인
    await expect(page).toHaveURL('/'); // PATHS.ROOT

    // 6. Supabase API 호출 여부
    expect(isSupabaseAPICalled).toBeTruthy();
  });
});
