import { useAtomValue } from 'jotai';

import { menuModalState } from './store/atom';
import CreateMenuModal from './create';
import UpdateMenuModal from './update';

export default function MenuModal() {
  const modalState = useAtomValue(menuModalState);

  const components = {
    create: CreateMenuModal,
    update: UpdateMenuModal,
  };
  const CurrentMenuModal = components[modalState.type];

  return modalState.isOpen ? <CurrentMenuModal /> : null;
}
