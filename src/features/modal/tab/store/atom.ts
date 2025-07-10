import { atom } from 'jotai';

/**
 * 현재 활성화된 모달의 종류를 관리하는 atom.
 * 값 예시: 'menu-create', 'menu-update', 'table-info'
 * `null` 값은 모든 모달이 닫혔음을 의미합니다.
 */
export type ModalType = 'menu-create' | 'menu-update' | 'table-info' | null;

export const tabModalAtom = atom<ModalType>(null);

export const setTabModalAtomState = atom(
  (get) => get(tabModalAtom),
  (_, set, type: ModalType) => {
    set(tabModalAtom, type);
  }
);

/**
 * 테이블 정보 모달 내에서 QR코드와 주문 내역 뷰를 전환하는 토글 상태를 관리하는 atom.
 */
export const tableToggleAtom = atom(false);
