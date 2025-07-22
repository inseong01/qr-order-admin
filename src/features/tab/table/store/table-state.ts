import { atom } from 'jotai';
import { Stage } from 'konva/lib/Stage';

/**
 * Konva Stage 객체 상태
 */
export const tableStageAtom = atom<Stage | null>(null);

/**
 * Konva Stage 객체 할당
 */
export const setTableStageAtom = atom(null, (_, set, stage: Stage) => {
  set(tableStageAtom, stage);
});
