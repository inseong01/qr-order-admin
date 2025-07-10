import { atom } from 'jotai';

// 알림 on/off 상태
export const alertAtom = atom(true);

// 알림 on/off 상태 변경
export const alertAtomWithToggle = atom(
  (get) => get(alertAtom),
  (get, set) => {
    set(alertAtom, !get(alertAtom));
  }
);
