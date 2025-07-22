import { atom, useAtomValue, useSetAtom } from 'jotai';

import { modalAtom } from '@/store/atom/modal-atom';
import { resetIdState } from '@/store/atom/id-atom';

import { widgetAtomWithReset } from '@/features/widget/store/atom';
import { setTabModalAtomState } from '@/features/modal/tab/store/atom';

import Tab from '@/components/ui/tab';

import styles from './index.module.css';

type FooterTab = 'menu' | 'order' | 'table';
export const footerAtom = atom<FooterTab>('menu');

export default function Footer() {
  const tab = useAtomValue(footerAtom);
  const modalState = useAtomValue(modalAtom);
  const setTabModalState = useSetAtom(setTabModalAtomState);
  const setFooterTab = useSetAtom(footerAtom);
  const widgetReset = useSetAtom(widgetAtomWithReset);
  const resetId = useSetAtom(resetIdState);

  const handleTabClick = (tabTitle: FooterTab) => {
    if (modalState.isOpen) return;
    if (tab === tabTitle) return;

    setFooterTab(tabTitle);
    setTabModalState(null);
    widgetReset();
    resetId();
  };

  return (
    <footer className={styles.footer}>
      <Tab text='메뉴' isSelected={tab === 'menu'} handleTabClick={() => handleTabClick('menu')} />

      <Tab text='좌석' isSelected={tab === 'table'} handleTabClick={() => handleTabClick('table')} />

      <Tab text='주문' isSelected={tab === 'order'} handleTabClick={() => handleTabClick('order')} />
    </footer>
  );
}
