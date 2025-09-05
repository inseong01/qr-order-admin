import { atom } from 'jotai';
import { Rect } from 'konva/lib/shapes/Rect';
import { Text } from 'konva/lib/shapes/Text';
import { Stage } from 'konva/lib/Stage';
import { SetTableEditRefsAtomProps } from '../types';

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
 * Konva Table Edit Layer 하위 객체 상태
 */
export const tableEditRectAtom = atom<Rect>();
export const tableEditTextAtom = atom<Text>();

/**
 * Konva Table Edit Layer 하위 객체 할당
 */
export const setTableEditRefsAtom = atom(null, (_, set, { rect, text }: SetTableEditRefsAtomProps) => {
  set(tableEditRectAtom, rect);
  set(tableEditTextAtom, text);
});
