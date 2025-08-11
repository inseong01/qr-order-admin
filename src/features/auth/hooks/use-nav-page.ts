import { useAtomValue, useSetAtom } from 'jotai';
import { MouseEvent } from 'react';

import { loadingStateAtom, resetFormAtom, successStateAtom } from '../store/form-atom';
import { captchaTokenAtom } from '../store/token-atom';

/**
 * 인증 페이지 간의 이동을 처리하는 커스텀 훅
 *
 * - 페이지 이동 시 폼 상태를 초기화
 * - API 요청(로딩), 토큰 없거나 접속 성공인 경우 페이지 이동 방지
 */
export default function useNavPage() {
  const isSuccess = useAtomValue(successStateAtom);
  const captchaToken = useAtomValue(captchaTokenAtom);
  const isLoading = useAtomValue(loadingStateAtom);
  const resetForm = useSetAtom(resetFormAtom);

  /** 클릭 불가 조건 */
  const disabled = isLoading || !captchaToken || isSuccess;

  /**
   * NavLink의 onClick 이벤트 핸들러
   */
  const handleNav = (e: MouseEvent<HTMLAnchorElement>) => {
    // 페이지 이동 이벤트 막음
    if (disabled) return e.preventDefault();

    // 폼 상태 초기화
    resetForm();
  };

  return { handleNav, disabled };
}
