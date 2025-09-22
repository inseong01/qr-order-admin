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
    const role = userSession?.user.user_metadata.role ?? 'guest';
    if (role === 'guest' || role === 'viewer') {
      console.error('Access denied: insufficient permissions.');
      showToast('접근 권한이 없습니다.');
      return true;
    }

    return false;
  }

  return { checkAccessByRole };
}
