import { atom } from 'jotai';
import { Layer } from 'konva/lib/Layer';
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

/**
 * Konva Table Edit Layer 객체 상태
 */
export const tableEditLayerAtom = atom<Layer | null>(null);

/**
 * Konva Table Edit Layer 객체 할당
 */
export const setTableEditLayerAtom = atom(null, (_, set, layer: Layer) => {
  set(tableEditLayerAtom, layer);
});
