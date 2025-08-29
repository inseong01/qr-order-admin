import { atom } from 'jotai';

export const requestAlertAtom = atom(true);

export const setRequestAlertAtom = atom(null, (_, set, isOpen: boolean) => {
  set(requestAlertAtom, isOpen);
});
