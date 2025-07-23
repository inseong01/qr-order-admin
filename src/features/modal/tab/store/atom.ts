import { atom } from 'jotai';

/**
 * 현재 활성화된 모달의 종류 타입 관리
 */
export type ModalType = 'menu-create' | 'menu-update' | 'table-info';

/**
 * 모달 종류
 * */
export const tabModalAtom = atom<ModalType>('menu-create');

export const setTabModalAtomState = atom(
  (get) => get(tabModalAtom),
  (_, set, type: ModalType) => {
    set(tabModalAtom, type);
  }
);

/**
 * 모달 열림 상태
 * */
export const modalOpenAtom = atom(false);

export const setModalClickAtom = atom(null, (_, set, isOpen: boolean) => {
  set(modalOpenAtom, isOpen);
});

/**
 * 테이블 정보 모달 내에서 QR코드와 주문 내역 뷰를 전환 관리
 */
export const tableToggleAtom = atom(false);

export const setTableToggleAtom = atom(null, (_, set) => {
  set(tableToggleAtom, (prev) => !prev);
});
