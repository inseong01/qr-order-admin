import { expect, isSupabaseAPICalled, wrongVerificationTest } from '../utils/mock-auth-api';

// 캡챠 실패 시나리오 E2E 테스트
// Fixture: wrongVerificationTest
// 사전 조건: Captcha 실패, Supabase API 호출 없음

wrongVerificationTest.describe('로그인 실패 시나리오 - 캡챠 실패', () => {
  wrongVerificationTest('캡챠 실패 시 로그인 불가 및 API 호출 없음', async ({ page }) => {
    // 1. 로그인 페이지 이동
    await page.goto('/auth/login');

    // 2. 입력 필드 비활성화 확인
    await expect(page.locator('input[name="id"]')).toBeDisabled();
    await expect(page.locator('input[name="password"]')).toBeDisabled();

    // 3. 로그인 버튼 클릭 불가 확인
    const loginButton = page.getByText('확인 중...', { exact: true });
    await expect(loginButton).toBeDisabled();

    /* turnstile error-callback 실행 안 됨: "검증 실패" 변경 안 됨 */

    // 4. 버튼 글자 변경 확인
    await expect(loginButton).toHaveText('검증 실패');

    // 5. Supabase API 호출 없음 확인
    expect(isSupabaseAPICalled).toBeFalsy();
  });
});
