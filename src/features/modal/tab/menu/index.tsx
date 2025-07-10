import { useAtomValue } from 'jotai';

import { tabModalAtom } from '../store/atom';
import CreateMenuModal from './create';
import UpdateMenuModal from './update';

export default function MenuModal() {
  const currentModal = useAtomValue(tabModalAtom);

  if (currentModal === 'menu-create') {
    return <CreateMenuModal />;
  }

  if (currentModal === 'menu-update') {
    return <UpdateMenuModal />;
  }

  return null;
}
