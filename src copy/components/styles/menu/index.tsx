import { ReactNode } from 'react';

import styles from '@/components/styles/menu/index.module.css';

/**
 * 메뉴 항목 버튼
 */
export function ListMenu({ title, price }: { title: string; price: string }) {
  const handleClick = () => {};

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
  const handleClick = () => {};

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
