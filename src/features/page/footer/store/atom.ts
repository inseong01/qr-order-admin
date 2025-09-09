import { atom } from 'jotai';
import { FooterTab } from '../types';

export const footerAtom = atom<FooterTab>('menu');

export const setFooterAtom = atom(null, (_, set, tab: FooterTab) => {
  set(footerAtom, tab);
});
