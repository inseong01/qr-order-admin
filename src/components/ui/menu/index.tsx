import { ReactNode } from 'react';
import { useSetAtom } from 'jotai';

import styles from './index.module.css';

import { setMenuModalState } from '@/features/modal/menu/store/atom';

import { Menu } from '@/lib/supabase/function/menu';

import { selectIdState } from '@/store/atom/id-atom';

/**
 * 메뉴 항목 버튼
 */
export function ListMenu(props: Menu) {
  const setModalState = useSetAtom(setMenuModalState);
  const selectId = useSetAtom(selectIdState);

  const title = props.name;
  const price = props.price.toLocaleString();
  const menuId = props.id;

  const handleClick = () => {
    selectId(menuId);
    setModalState({ isOpen: true, type: 'update' });
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
  const setModalState = useSetAtom(setMenuModalState);

  const handleClick = () => {
    setModalState({ isOpen: true, type: 'create' });
  };

  return (
    <ListBox onClick={handleClick}>
      <div className={styles.menuAdd}>
        <div className={styles.iconBox}>
          <img src='' alt='add icon' />
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
