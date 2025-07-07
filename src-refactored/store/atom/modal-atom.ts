import { atom } from 'jotai';

// TODO: 추후 리액트 컨텍스트로 처리
//- zustand
// export type ModalType =
//   | 'info'
//   | 'insert'
//   | 'update'
//   | 'upsert'
//   | 'update-category'
//   | 'insert-category';

// type InitialState = {
//   modal: {
//     isOpen: boolean;
//     type: ModalType;
//   };
// };

//- jotai
export type ModalType = 'info' | 'insert' | 'update' | 'upsert' | 'update-category' | 'insert-category';

type Modal = {
  isOpen: boolean;
  type: ModalType;
};

const initialModal: Modal = {
  isOpen: false,
  type: 'insert',
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
export const modalStateAtom = atom(
  (get) => get(modalAtom),
  (get, set, { type, isOpen }: { type?: ModalType; isOpen: boolean }) => {
    const currentModal = get(modalAtom);
    set(modalAtom, {
      isOpen,
      type: type || currentModal.type,
    });
  }
);
