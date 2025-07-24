import { atom, useAtomValue, useSetAtom } from 'jotai';

import { modalAtom } from '@/store/atom/modal-atom';
import { resetIdState } from '@/store/atom/id-atom';

import { widgetAtomWithReset } from '@/features/widget/store/atom';
import { setModalClickAtom } from '@/features/modal/tab/store/atom';

import Tab from '@/components/ui/tab';

import { headerTabIdxAtom } from '../header';
import styles from './index.module.css';

type FooterTab = 'menu' | 'order' | 'table';
export const footerAtom = atom<FooterTab>('menu');

export default function Footer() {
  const tab = useAtomValue(footerAtom);
  const modalState = useAtomValue(modalAtom);
  const setModalClick = useSetAtom(setModalClickAtom);
  const setHeaderTabIdx = useSetAtom(headerTabIdxAtom);
  const setFooterTab = useSetAtom(footerAtom);
  const widgetReset = useSetAtom(widgetAtomWithReset);
  const resetId = useSetAtom(resetIdState);

  function handleTabClick(tabTitle: FooterTab) {
    if (modalState.isOpen) return;
    if (tab === tabTitle) return;

    setFooterTab(tabTitle);
    setHeaderTabIdx(0);
    setModalClick(false);
    widgetReset();
    resetId();
  }

  return (
    <footer className={styles.footer}>
      <Tab key={'footer-menu'} text='메뉴' isSelected={tab === 'menu'} handleTabClick={() => handleTabClick('menu')} />

      <Tab
        key={'footer-table'}
        text='좌석'
        isSelected={tab === 'table'}
        handleTabClick={() => handleTabClick('table')}
      />

      <Tab
        key={'footer-order'}
        text='주문'
        isSelected={tab === 'order'}
        handleTabClick={() => handleTabClick('order')}
      />
    </footer>
  );
}
