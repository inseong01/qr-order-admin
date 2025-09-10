/**
 * @file authErrorHandler 유틸리티 함수의 단위 테스트입니다.
 * @description Supabase 인증 에러 코드에 따라 적절한 사용자 메시지를 반환하고,
 *              필요 시 캡챠를 새로고침하는지 검증합니다.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { authErrorHandler } from '../auth-error-handler';

/* Mock 함수 설정 */
const mockShowMessage = vi.fn();
const mockCaptchaRefresh = vi.fn();

/* authErrorHandler 테스트 */
describe('authErrorHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* 1. 반환값 형태 확인 */
  it('반환값의 키는 문자열이고, 값은 함수여야 함', () => {
    const res = authErrorHandler({ showMessage: mockShowMessage, captchaRefresh: mockCaptchaRefresh });

    for (const r of Object.keys(res) as Array<keyof typeof res>) {
      expect(r).toBeTypeOf('string');
      expect(res[r]).toBeTypeOf('function');
    }
  });

  /* 2. 메시지 출력 동작 확인 */
  it('첫 번째 인자로 전달된 showMessage 함수가 올바르게 호출되어야 함', () => {
    const res = authErrorHandler({ showMessage: mockShowMessage, captchaRefresh: mockCaptchaRefresh });
    res.anonymous_provider_disabled();

    expect(mockShowMessage).toBeCalled();
    expect(mockShowMessage).toHaveBeenCalledWith('익명 로그인은 비활성화되어 있습니다.');
  });

  /* 3. 캡챠 새로고침 동작 확인 */
  it('두 번째 인자로 전달된 captchaRefresh 함수가 올바르게 호출되어야 함', () => {
    const res = authErrorHandler({ showMessage: mockShowMessage, captchaRefresh: mockCaptchaRefresh });
    res.captcha_failed();

    expect(mockShowMessage).toHaveBeenCalledWith('캡차 인증에 실패했습니다. 다시 시도해주세요.');
    expect(mockCaptchaRefresh).toHaveBeenCalledTimes(1);

    res.bad_json();

    expect(mockShowMessage).toHaveBeenCalledWith('요청 형식이 올바르지 않습니다.');
    expect(mockCaptchaRefresh).toHaveBeenCalledTimes(1);
  });
});
