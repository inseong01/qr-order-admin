import { atom } from 'jotai';

export const connectStateAtom = atom(false);
export const setConnectStateAtom = atom(null, (_, set, state: boolean) => {
  set(connectStateAtom, state);
});

const initDate = new Date();

export const dateStateAtom = atom(initDate.toLocaleDateString());
export const setDateStateAtom = atom(null, (_, set, date: string) => {
  set(dateStateAtom, date);
});

export const timeStateAtom = atom(initDate.toLocaleTimeString().slice(0, -3));
export const setTimeStateAtom = atom(null, (_, set, time: string) => {
  set(timeStateAtom, time);
});
