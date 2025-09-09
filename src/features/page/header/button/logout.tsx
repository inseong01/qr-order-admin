import { useAtomValue, useSetAtom } from 'jotai';

import { showToastAtom } from '@/features/alert/toast/store/atom';
import { userSessionAtom } from '@/features/auth/store/auth-atom';
import { signOutUser } from '@/features/auth/util/auth-supabase-api';
import { useConfirmModal } from '@/features/modal/confirm/hook/use-confirm-modal';

import styles from './logout.module.css';

export default function LogoutButton() {
  const session = useAtomValue(userSessionAtom);
  const isAnonymous = session?.user.is_anonymous;

  const showToast = useSetAtom(showToastAtom);
  const { showConfirmModal } = useConfirmModal();

  const handleLogout = async () => {
    const title = '로그아웃 하시겠습니까?';
    /* 비즈니스 로직 */
    const onConfirm = async () => {
      // 로그아웃
      const { error } = await signOutUser();

      // 에러 처리
      if (error) {
        console.error('Error logging out:', error.message);
        showToast('로그아웃 과정에서 오류가 발생했습니다.');
        return;
      }
    };

    showConfirmModal({ title, onConfirm });
  };

  return (
    <li className={styles.logoutBox}>
      <button onClick={handleLogout} className={styles.logoutButton}>
        {isAnonymous ? '방문자' : '관리자'} 로그아웃
      </button>
    </li>
  );
}
