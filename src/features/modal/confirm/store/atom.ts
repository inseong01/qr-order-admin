import { atom } from 'jotai';

interface ConfirmModalState {
  isOpen: boolean;
  title: string;
  onConfirm?: () => void;
}

export const confirmModalAtom = atom<ConfirmModalState>({
  isOpen: false,
  title: '',
  onConfirm: undefined,
});
