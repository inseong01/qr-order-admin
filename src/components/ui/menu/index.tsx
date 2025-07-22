import { ReactNode } from 'react';
import { useSetAtom } from 'jotai';

import { Menu } from '@/lib/supabase/tables/menu';
import { setTabModalAtomState } from '@/features/modal/tab/store/atom';

import LIGHT_PLUS_ICON from '@/assets/icon/light-plus.svg';

import { selectMenuAtom } from './store/atom';
import styles from './index.module.css';

/**
 * 메뉴 항목 버튼
 */
export function ListMenu(props: Menu) {
  const setModalState = useSetAtom(setTabModalAtomState);
  const selectMenu = useSetAtom(selectMenuAtom);

  const title = props.name;
  const price = props.price.toLocaleString();

  const handleClick = () => {
    selectMenu(props);
    setModalState('menu-update');
  };

  return (
    <ListBox onClick={handleClick}>
      <div className={styles.listMenu}>
        <span className={styles.title}>{title}</span>

        <span className={styles.price}>{price}원</span>
      </div>
    </ListBox>
  );
}

/**
 * 메뉴 추가 버튼
 */
export function ListMenuAdd() {
  const setModalState = useSetAtom(setTabModalAtomState);

  const handleClick = () => {
    setModalState('menu-create');
  };

  return (
    <ListBox onClick={handleClick}>
      <div className={styles.menuAdd}>
        <div className={styles.iconBox}>
          <img src={LIGHT_PLUS_ICON} alt='add icon' />
        </div>

        <span className={styles.title}>상품 추가</span>
      </div>
    </ListBox>
  );
}

function ListBox({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button className={styles.list} onClick={onClick}>
      {children}
    </button>
  );
}
