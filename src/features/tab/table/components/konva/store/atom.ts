import { atom } from 'jotai';

type StagePositionStateAtom = {
  x: number;
  y: number;
};

export const stagePositionStateAtom = atom<StagePositionStateAtom>({ x: 0, y: 0 });
export const setStagePositionStateAtom = atom(null, (_, set, position: StagePositionStateAtom) => {
  set(stagePositionStateAtom, position);
});
