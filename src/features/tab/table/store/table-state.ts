
import { atom } from 'jotai';
import { Stage } from 'konva/lib/Stage';

/**
 * Konva Stage 객체 상태
 */
export const tableStageAtom = atom<Stage | null>(null);
