import { useAtomValue, useSetAtom } from 'jotai';
import { MouseEvent } from 'react';

import { loadingStateAtom, resetFormAtom } from '../store/atom';

/**
 * 인증 페이지 간의 이동을 처리하는 커스텀 훅
 *
 * - 페이지 이동 시 폼 상태를 초기화
 * - API 요청(로딩) 중에는 페이지 이동 방지
 */
export default function useNavPage() {
  const isLoading = useAtomValue(loadingStateAtom);
  const resetForm = useSetAtom(resetFormAtom);

  /**
   * NavLink의 onClick 이벤트 핸들러
   */
  const handleNav = (e: MouseEvent<HTMLAnchorElement>) => {
    // 로딩 중일 경우, 페이지 이동 이벤트를 막음
    if (isLoading) return e.preventDefault();
    // 폼 상태 초기화
    resetForm();
  };

  return { handleNav };
}
