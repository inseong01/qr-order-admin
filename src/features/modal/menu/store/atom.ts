import { atom } from 'jotai';

type ModalState = {
  isOpen: boolean;
  type: 'create' | 'update';
};

const initModalState: ModalState = {
  isOpen: false,
  type: 'create',
};

export const menuModalState = atom(initModalState);

export const resetModalState = atom(
  (get) => get(menuModalState),
  (_, set) => {
    set(menuModalState, initModalState);
  }
);

export const setMenuModalState = atom(
  (get) => get(menuModalState),
  (get, set, { isOpen, type }: { isOpen: boolean; type?: ModalState['type'] }) => {
    const currentState = get(menuModalState);
    set(menuModalState, { isOpen, type: type || currentState.type });
  }
);
