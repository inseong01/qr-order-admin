import { atom } from 'jotai';

export const toggleAtom = atom(false);

export const setToggleState = atom(
  (get) => get(toggleAtom),
  (_, set, isToggle: boolean) => {
    set(toggleAtom, isToggle);
  }
);

type ModalState = {
  isOpen: boolean;
};

const initModalState: ModalState = {
  isOpen: false,
};

export const tableModalAtom = atom(initModalState);

export const resetModalState = atom(
  (get) => get(tableModalAtom),
  (_, set) => {
    set(tableModalAtom, initModalState);
  }
);

export const setTableModalState = atom(
  (get) => get(tableModalAtom),
  (_, set, { isOpen }: { isOpen: boolean }) => {
    set(tableModalAtom, { isOpen });
  }
);
