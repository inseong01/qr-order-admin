import { useAtomValue, useSetAtom } from 'jotai';

import { resetIdState } from '@/store/id-atom';
import { modalAtom } from '@/store/modal-atom';
import { showToastAtom } from '@/features/alert/toast/store/atom';
import { widgetAtomWithReset } from '@/features/widget/store/atom';
import { setModalClickAtom } from '@/features/modal/tab/store/atom';
import { isEditingAtom } from '@/features/tab/table/store/table-edit-state';
import { resetCategoriesAtom } from '@/features/modal/widget/menu/store/atom';

import { FooterTab } from '../types';
import { headerTabAtom } from '../../header/store/atom';
import { footerAtom, setFooterAtom } from '../store/atom';

export default function useFooterHandler() {
  const tab = useAtomValue(footerAtom);
  const modalState = useAtomValue(modalAtom);
  const isTableEditing = useAtomValue(isEditingAtom);
  const resetId = useSetAtom(resetIdState);
  const showToast = useSetAtom(showToastAtom);
  const widgetReset = useSetAtom(widgetAtomWithReset);
  const setFooterTab = useSetAtom(setFooterAtom);
  const setModalClick = useSetAtom(setModalClickAtom);
  const setHeaderTabIdx = useSetAtom(headerTabAtom);
  const resetCategoriesForm = useSetAtom(resetCategoriesAtom);

  function tabClick(tabTitle: FooterTab) {
    if (modalState.isOpen) return;
    if (tab === tabTitle) return;
    if (isTableEditing) {
      showToast('탭 전환은 편집 종료 후 가능합니다.');
      return;
    }

    resetId();
    widgetReset();
    setHeaderTabIdx(0);
    setModalClick(false);
    resetCategoriesForm();
    setFooterTab(tabTitle);
  }

  return { tabClick };
}
