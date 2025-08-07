import { atom } from 'jotai';

const initDate = new Date();

export const dateStateAtom = atom(initDate.toLocaleDateString());
export const setDateStateAtom = atom(null, (_, set, date: string) => {
  set(dateStateAtom, date);
});

export const timeStateAtom = atom(initDate.toLocaleTimeString().slice(0, -3));
export const setTimeStateAtom = atom(null, (_, set, time: string) => {
  set(timeStateAtom, time);
});
