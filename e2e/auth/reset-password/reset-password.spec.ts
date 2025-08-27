import { test, expect } from '@playwright/test';

import { TEST_ACCOUNT } from '../common/const';
import {
  isSupabaseCalled,
  recoveryPasswordSuccessTest,
  recoveryPasswordSuccessNonexistentEmailTest,
  recoveryPasswordFailInvalidFormatTest,
  recoveryPasswordFailInvalidToken,
  recoveryPasswordFailInvalidCaptcha,
} from './fixture/recovery-email.fixture';

const TEST_PAGE_URL = '/auth/find/password' as const;
const REDIRECT_PAGE_URL = '/auth/login' as const;

/**
 * @file 비밀번호 찾기 E2E 테스트
 * @description [성공/실패] 비밀번호 찾기 기능의 End-to-End 시나리오를 검증합니다.
 *   - 성공: 가입된/존재하지 않는 이메일 입력 시 메일 전송 후 로그인 페이지 리다이렉트
 *   - 실패: 캡챠 인증 실패 시 기능 사용 불가
 *   - 실패: 잘못된 이메일 형식 입력 시 오류 메시지 표시
 *   - 실패: API 오류 발생 시 토스트 알림 표시
 */
test.describe('[성공/실패] 비밀번호 찾기', () => {
  test.describe('[성공] 비밀번호 찾기', () => {
    /**
     * [성공] 가입된/존재하지 않는 이메일 입력 시 메일 전송 후 로그인 페이지 리다이렉트
     * - 입력, 버튼 클릭, 토스트 알림, Supabase 호출, URL 이동 확인
     */
    recoveryPasswordSuccessTest('[성공] 가입된 이메일 입력 - 메일 전송 및 로그인 페이지 이동', async ({ page }) => {
      // 1. 비밀번호 찾기 페이지로 이동
      await page.goto(TEST_PAGE_URL);

      // 2. 가입된 이메일 입력
      await page.locator('input[name="id"]').click();
      await page.locator('input[name="id"]').fill(TEST_ACCOUNT.ID);

      // 3. '비밀번호 찾기' 버튼 클릭
      await page.locator('button[type="submit"]').click();

      // 4. 버튼 비활성화 및 토스트 알림 확인
      await expect(page.getByText('로그인')).not.toBeEnabled();
      await expect(page.locator('button[type="submit"]')).not.toBeEnabled();
      await expect(page.getByText('메일 전송')).toBeVisible();

      // 5. Supabase API 호출 확인
      expect(isSupabaseCalled).toBeTruthy();

      // 6. 로그인 페이지로 리다이렉트 확인
      await page.waitForURL(REDIRECT_PAGE_URL);
      await expect(page.getByText('입력하기', { exact: true })).toBeEnabled();
    });

    recoveryPasswordSuccessNonexistentEmailTest(
      '[성공] 존재하지 않는 이메일 입력 - 메일 전송 및 로그인 페이지 이동(보안)',
      async ({ page }) => {
        // 1. 비밀번호 찾기 페이지로 이동
        await page.goto(TEST_PAGE_URL);

        // 2. 존재하지 않는 이메일 입력
        await page.locator('input[name="id"]').click();
        await page.locator('input[name="id"]').fill(TEST_ACCOUNT.NONE_EXIST_ID);

        // 3. '비밀번호 찾기' 버튼 클릭
        await page.locator('button[type="submit"]').click();

        // 4. 버튼 비활성화 및 토스트 알림 확인
        await expect(page.getByText('로그인')).not.toBeEnabled();
        await expect(page.locator('button[type="submit"]')).not.toBeEnabled();
        await expect(page.getByText('메일 전송')).toBeVisible();

        // 5. Supabase API 호출 확인
        expect(isSupabaseCalled).toBeTruthy();

        // 6. 로그인 페이지로 리다이렉트 확인
        await page.waitForURL(REDIRECT_PAGE_URL);
        await expect(page.getByText('입력하기', { exact: true })).toBeEnabled();
      }
    );
  });

  test.describe('[실패] 비밀번호 찾기', () => {
    /**
     * [실패] 캡챠 인증 실패 시 기능 사용 불가
     * - 입력/버튼 비활성화, Supabase 미호출 확인
     */
    recoveryPasswordFailInvalidCaptcha('[실패] 캡챠 인증 실패 - 입력/버튼 비활성화', async ({ page }) => {
      // 1. 비밀번호 찾기 페이지로 이동
      await page.goto(TEST_PAGE_URL);

      // 2. 입력/버튼 비활성화 확인
      await expect(page.locator('input[name="id"]')).not.toBeEnabled();
      await expect(page.locator('button[type="submit"]')).not.toBeEnabled();
      await expect(page.getByText('로그인', { exact: true })).not.toBeEnabled();
      await expect(page.locator('button[type="submit"]')).toHaveText('검증 실패');

      // 3. Supabase 미호출 확인
      expect(isSupabaseCalled).toBeFalsy();
    });

    /**
     * [실패] 잘못된 이메일 형식 입력 시 오류 메시지 표시
     * - 유효성 검사 실패 메시지, 버튼 상태, Supabase 미호출 확인
     */
    recoveryPasswordFailInvalidFormatTest('[실패] 잘못된 이메일 형식 입력 - 오류 메시지 표시', async ({ page }) => {
      // 1. 비밀번호 찾기 페이지로 이동
      await page.goto(TEST_PAGE_URL);

      // 2. 잘못된 이메일 입력
      const idInput = page.locator('input[name="id"]');
      await idInput.click();
      await idInput.fill(TEST_ACCOUNT.WRONG.ID);

      // 3. '비밀번호 찾기' 버튼 클릭
      await page.locator('button[type="submit"]').click();

      // 4. 유효성 검사 실패 메시지/버튼 상태 확인
      await expect(page.getByText('올바른 이메일 주소 형식이 아닙니다.', { exact: true })).toBeVisible();
      await expect(idInput).toHaveAttribute('data-invalid', 'true');
      await expect(page.locator('button[type="submit"]')).toHaveText('검증 실패');

      // 5. Supabase 미호출 확인
      expect(isSupabaseCalled).toBeFalsy();
    });

    /**
     * [실패] API 오류 발생 시 토스트 알림 표시
     * - 토스트 알림, 버튼 상태, Supabase 호출 확인
     */
    recoveryPasswordFailInvalidToken('[실패] API 오류 발생 - 토스트 알림 표시', async ({ page }) => {
      // 1. 비밀번호 찾기 페이지로 이동
      await page.goto(TEST_PAGE_URL);

      // 2. 이메일 입력
      await page.locator('input[name="id"]').click();
      await page.locator('input[name="id"]').fill(TEST_ACCOUNT.ID);

      // 3. '비밀번호 찾기' 버튼 클릭
      await page.locator('button[type="submit"]').click();

      // 4. 토스트 알림 표시/버튼 상태 확인
      await expect(page.getByText('인증 토큰이 유효하지 않습니다.')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toHaveText('검증 실패');

      // 5. 제출 버튼 활성화 확인
      await expect(page.locator('button[type="submit"]')).toBeEnabled();

      // 6. Supabase 호출 확인
      expect(isSupabaseCalled).toBeTruthy();
    });
  });
});
