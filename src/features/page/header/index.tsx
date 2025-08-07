import { atom, useAtomValue, useSetAtom } from 'jotai';

import supabase from '@/lib/supabase';
import Timer from '@/features/timer';

import { footerAtom } from '../footer';
import HeaderMenuTab from './header-menu';
import HeaderTableTab from './header-table';
import HeaderOrderTab from './header-order';
import styles from './index.module.css';
import { userSessionAtom } from '@/features/auth/store/user-atom';
import { useConfirmModal } from '@/features/modal/confirm/hook/use-confirm-modal';
import { openSubmissionAlertAtom } from '@/features/alert/popup/store/atom';

export const headerTabIdxAtom = atom(0);

export default function Header() {
  const footerTab = useAtomValue(footerAtom);
  const component = {
    menu: HeaderMenuTab,
    table: HeaderTableTab,
    order: HeaderOrderTab,
  };
  const HeaderTabList = component[footerTab];
  const { showConfirmModal } = useConfirmModal();
  const openSubmissionAlert = useSetAtom(openSubmissionAlertAtom);

  const handleLogout = async () => {
    const title = '로그아웃 하시겠습니까?';
    /* 비즈니스 로직 */
    const onConfirm = async () => {
      // 로그아웃
      const { error } = await supabase.auth.signOut();

      // 에러 처리
      if (error) {
        console.error('Error logging out:', error);
        openSubmissionAlert('메뉴 추가 과정에서 오류가 발생했습니다');
        return;
      }

      openSubmissionAlert('로그아웃 되었습니다.');
    };

    showConfirmModal({ title, onConfirm });
  };

  const session = useAtomValue(userSessionAtom);
  const isAnonymous = session?.user.is_anonymous;

  return (
    <header className={styles.header}>
      {/* 탭 목록 */}
      <ul className={styles.categories}>
        <HeaderTabList />
      </ul>

      <ul className={styles.rightSection}>
        {/* 현재 시간 */}
        <Timer />

        {/* 로그아웃 */}
        <li className={styles.logoutBox}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            {isAnonymous ? '방문자' : '관리자'} 로그아웃
          </button>
        </li>
      </ul>
    </header>
  );
}
