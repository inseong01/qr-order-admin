import { atom, useAtomValue, useSetAtom } from 'jotai';

import styles from './index.module.css';

import { modalAtom } from '@/store/atom/modal-atom';
import { widgetAtomWithReset } from '@/store/atom/widget-atom';

import Tab from '@/components/ui/tab';

type FooterTab = 'menu' | 'order' | 'table';
export const footerAtom = atom<FooterTab>('menu');

export default function Footer() {
  const tab = useAtomValue(footerAtom);
  const modalState = useAtomValue(modalAtom);
  const setFooterTab = useSetAtom(footerAtom);
  const widgetReset = useSetAtom(widgetAtomWithReset);

  // const isModalOpen = useBoundStore((state) => state.modal.isOpen);
  // const isTableEditAble = useBoundStore((state) => state.konva.isAble);
  // const submitIsError = useBoundStore((state) => state.submit.isError);
  // const resetCategoryState = useBoundStore((state) => state.resetCategoryState);
  // const resetItemState = useBoundStore((state) => state.resetItemState);
  // const resetSubmitState = useBoundStore((state) => state.resetSubmitState);

  const handleTabClick = (tabTitle: FooterTab) => {
    if (modalState.isOpen) return;
    if (tab === tabTitle) return;
    // if (isTableEditAble) {
    //   // 수정 중 tab 이동 임시 제한
    //   alert('위젯을 닫고 클릭해주세요');
    //   return;
    // }

    setFooterTab(tabTitle);

    // resetCategoryState();
    // resetItemState();
    widgetReset();

    // if (submitIsError) return; // 탭 변경마다 제출 상태 초기화, 에러 상황 예외

    // resetSubmitState();
  };

  return (
    <footer className={styles.footer}>
      <Tab text='메뉴' isSelected={tab === 'menu'} handleTabClick={() => handleTabClick('menu')} />

      <Tab text='좌석' isSelected={tab === 'table'} handleTabClick={() => handleTabClick('table')} />

      <Tab text='주문' isSelected={tab === 'order'} handleTabClick={() => handleTabClick('order')} />
    </footer>
  );
}
