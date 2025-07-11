import { useAtomValue, useSetAtom } from 'jotai';
import { AnimatePresence } from 'motion/react';

import DialogLayout from '@/components/layout/dialog';
import { setWidgetAtomState, widgetAtom } from '@/store/atom/widget-atom';

import AddCategoryForm from './menu/add-category-form';
import UpdateCategoryForm from './menu/update-category-form';
import DeleteCategoryForm from './menu/delete-category-form';
/* 
  위젯 모달 전용
*/
export default function WidgetCateogryModal() {
  const widgetState = useAtomValue(widgetAtom);
  const setWidgetState = useSetAtom(setWidgetAtomState);

  const component = {
    'create-menu-category': AddCategoryForm,
    'update-menu-category': UpdateCategoryForm,
    'delete-menu-category': DeleteCategoryForm,
  };
  const ModalForm = widgetState.option !== '' ? component[widgetState.option] : null;

  function handleClose() {
    setWidgetState({ option: '' });
  }

  return (
    <AnimatePresence>
      {widgetState.option && <DialogLayout handleClose={handleClose}>{ModalForm ? <ModalForm /> : null}</DialogLayout>}
    </AnimatePresence>
  );
}
