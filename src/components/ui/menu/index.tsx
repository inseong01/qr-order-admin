import { ReactNode } from 'react';
import { useSetAtom } from 'jotai';
import { motion } from 'motion/react';

import { Menu } from '@/lib/supabase/tables/menu';

import { resetMenuImageFileAtom } from '@/features/modal/tab/menu/store/atom';
import { setModalClickAtom, setTabModalAtomState } from '@/features/modal/tab/store/atom';

import LIGHT_PLUS_ICON from '@/assets/icon/light-plus.svg';

import { initMenu } from './const';
import styles from './index.module.css';
import { resetMenuErrorAtom, selectMenuAtom } from './store/atom';

/**
 * 메뉴 항목 버튼
 */
export function ListMenu(props: Menu) {
  const setModalClick = useSetAtom(setModalClickAtom);
  const setModalState = useSetAtom(setTabModalAtomState);
  const selectMenu = useSetAtom(selectMenuAtom);
  const resetMenuError = useSetAtom(resetMenuErrorAtom);
  const resetMenuImageFile = useSetAtom(resetMenuImageFileAtom);

  const title = props.name;
  const price = props.price.toLocaleString();

  const handleClick = () => {
    selectMenu(props);
    setModalState('menu-update');
    setModalClick(true);
    resetMenuError();
    resetMenuImageFile();
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
export function ListMenuAdd({ category }: { category: Menu['menu_category'] }) {
  const setModalClick = useSetAtom(setModalClickAtom);
  const setModalState = useSetAtom(setTabModalAtomState);
  const selectMenu = useSetAtom(selectMenuAtom);
  const resetMenuError = useSetAtom(resetMenuErrorAtom);
  const resetMenuImageFile = useSetAtom(resetMenuImageFileAtom);

  const handleClick = () => {
    selectMenu({ ...initMenu, menu_category: { title: category.title, id: category.id } });
    setModalState('menu-create');
    setModalClick(true);
    resetMenuError();
    resetMenuImageFile();
  };

  return (
    <ListBox onClick={handleClick}>
      <div className={styles.menuAdd}>
        <div className={styles.iconBox}>
          <img src={LIGHT_PLUS_ICON} alt='add icon' />
        </div>

        <span className={styles.title}>메뉴 추가</span>
      </div>
    </ListBox>
  );
}

function ListBox({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <motion.button layout className={styles.list} onClick={onClick}>
      {children}
    </motion.button>
  );
}
