import { useSetAtom } from 'jotai';
import { MouseEvent } from 'react';

import useDisabledState from './use-disabled';
import { resetAllFormsAtom } from '../store/auth-atom';

/**
 * 인증 페이지 간의 이동을 처리하는 커스텀 훅
 *
 * - 페이지 이동 시 폼 상태를 초기화
 * - API 요청(로딩), 토큰 없거나 접속 성공인 경우 페이지 이동 방지
 */
export default function useNavPage() {
  const resetForm = useSetAtom(resetAllFormsAtom);
  const { disabled } = useDisabledState();

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
