import { useAtomValue, useSetAtom } from 'jotai';

import { showToastAtom } from '@/features/alert/toast/store/atom';
import { userSessionAtom } from '../../features/auth/store/auth-atom';

/**
 * 사용자 역할에 따라 제출 여부를 판단하는 커스텀 훅
 */
export default function useUserRole() {
  const userSession = useAtomValue(userSessionAtom);
  const showToast = useSetAtom(showToastAtom);

  function checkAccessByRole() {
    const user_role = userSession?.user.user_metadata.user_role ?? 'guest';
    if (user_role === 'guest' || user_role === 'viewer') {
      console.error('Access denied: insufficient permissions.');
      showToast('접근 권한이 없습니다.');
      return true;
    }

    return false;
  }

  return { checkAccessByRole };
}
