/**
 * @file konva-fade-in 유틸리티 함수 단위 테스트입니다.
 * @description fadeBackgroundLayer 함수가 Rect 노드에 대해
 *              올바르게 트윈 애니메이션을 실행하고 상태를 변경하는지 검증합니다.
 */
import { Rect } from 'konva/lib/shapes/Rect';
import { describe, expect, it, vi } from 'vitest';

import { fadeBackgroundLayer } from '../konva-fade-in';

vi.mock('konva/lib/shapes/Rect', () => {
  return {
    Rect: vi.fn().mockImplementation(() => ({
      getLayer: vi.fn().mockReturnValue({}),
      getAttr: vi.fn().mockReturnValue({}),
      setAttr: vi.fn().mockReturnValue({}),
      opacity: 0,
    })),
  };
});

describe('konva-fade-in 유틸리티 함수', () => {
  describe('fadeBackgroundLayer', () => {
    it('트윈 애니메이션이 실행되고, 상태가 PLAYING → PAUSED로 변경', async () => {
      const rect = new Rect();
      const res = fadeBackgroundLayer(rect, true).play();

      expect(res.tween.state).toBe(2); // PLAYING

      await new Promise((res) => setTimeout(res, 700));

      expect(res.tween.state).toBe(1); // PAUSED
    });
  });
});
