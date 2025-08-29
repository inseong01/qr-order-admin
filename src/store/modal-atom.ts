import { atom } from 'jotai';

type Modal = {
  isOpen: boolean;
};

const initialModal: Modal = {
  isOpen: false,
};

// 모달 상태
export const modalAtom = atom<Modal>(initialModal);

// 모달 상태 초기화
export const modalAtomWithReset = atom(
  (get) => get(modalAtom),
  (_, set) => {
    set(modalAtom, initialModal);
  }
);

// 모달 상태 변경
export const setModalState = atom(
  (get) => get(modalAtom),
  (_, set, { isOpen }: { isOpen: boolean }) => {
    set(modalAtom, {
      isOpen,
    });
  }
);
