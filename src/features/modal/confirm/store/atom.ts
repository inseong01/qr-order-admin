import { atom } from 'jotai';

interface ConfirmModalState {
  isOpen: boolean;
  title: string;
  subTitle?: string;
  caution?: string;
  onConfirm?: () => void;
}

export const confirmModalAtom = atom<ConfirmModalState>({
  isOpen: false,
  title: '',
  subTitle: '',
  caution: '',
  onConfirm: undefined,
});
