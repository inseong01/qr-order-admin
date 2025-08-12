import { atom, useAtomValue, useSetAtom } from 'jotai';

import { modalAtom } from '@/store/modal-atom';
import { resetIdState } from '@/store/id-atom';

import { widgetAtomWithReset } from '@/features/widget/store/atom';
import { setModalClickAtom } from '@/features/modal/tab/store/atom';

import Tab from '@/components/ui/tab';
import { resetCategoriesAtom } from '@/features/modal/widget/menu/store/atom';
import { isEditingAtom } from '@/features/tab/table/store/table-edit-state';
import { showToastAtom } from '@/features/alert/toast/store/atom';

import { headerTabIdxAtom } from '../header';
import styles from './index.module.css';

type FooterTab = 'menu' | 'order' | 'table';
export const footerAtom = atom<FooterTab>('menu');

export default function Footer() {
  const tab = useAtomValue(footerAtom);
  const modalState = useAtomValue(modalAtom);
  const isTableEditing = useAtomValue(isEditingAtom);
  const setModalClick = useSetAtom(setModalClickAtom);
  const setHeaderTabIdx = useSetAtom(headerTabIdxAtom);
  const setFooterTab = useSetAtom(footerAtom);
  const widgetReset = useSetAtom(widgetAtomWithReset);
  const resetId = useSetAtom(resetIdState);
  const resetCategoriesForm = useSetAtom(resetCategoriesAtom);
  const showToast = useSetAtom(showToastAtom);

  function handleTabClick(tabTitle: FooterTab) {
    if (modalState.isOpen) return;
    if (tab === tabTitle) return;
    if (isTableEditing) {
      showToast('탭 전환은 편집 종료 후 가능합니다.');
      return;
    }

    setFooterTab(tabTitle);
    setHeaderTabIdx(0);
    setModalClick(false);
    widgetReset();
    resetId();
    resetCategoriesForm();
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
