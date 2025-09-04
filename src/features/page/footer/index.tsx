import { useAtomValue } from 'jotai';

import Tab from '@/components/ui/tab';

import styles from './index.module.css';
import { footerAtom } from './store/atom';
import useFooterHandler from './hook/use-footer-hadler';

export default function Footer() {
  const tab = useAtomValue(footerAtom);
  const { tabClick } = useFooterHandler();

  return (
    <footer className={styles.footer}>
      <Tab key={'footer-menu'} text='메뉴' isSelected={tab === 'menu'} handleTabClick={() => tabClick('menu')} />

      <Tab key={'footer-table'} text='좌석' isSelected={tab === 'table'} handleTabClick={() => tabClick('table')} />

      <Tab key={'footer-order'} text='주문' isSelected={tab === 'order'} handleTabClick={() => tabClick('order')} />
    </footer>
  );
}
