/**
 * @file check-device 유틸리티 함수 단위 테스트
 * @description 화면 크기 및 뷰포트 방향 감지 함수 검증
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { detectMobileSize, detectViewportMode } from '../function/check-device';

const originalScreen = structuredClone(window.screen);

describe('check-device 유틸리티', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    Object.defineProperty(window, 'screen', {
      configurable: true,
      value: originalScreen,
    });
  });

  describe('detectMobileSize', () => {
    it('화면 높이가 1024 이상이면 false 반환', () => {
      Object.defineProperty(window.screen, 'availHeight', {
        configurable: true,
        value: 1024,
      });

      expect(detectMobileSize()).toBe(false);
    });

    it('화면 높이가 1024 미만이면 true 반환', () => {
      Object.defineProperty(window.screen, 'availHeight', {
        configurable: true,
        value: 1023,
      });

      expect(detectMobileSize()).toBe(true);
    });
  });

  describe('detectViewportMode', () => {
    it('orientation.type이 portrait-primary이면 해당 문자열 반환', () => {
      Object.defineProperty(window.screen, 'orientation', {
        configurable: true,
        value: {
          type: 'portrait-primary',
          angle: 0,
          lock: () => Promise.resolve(),
          unlock: () => {},
          onchange: null,
        },
      });

      expect(detectViewportMode()).toBe('portrait-primary');
    });

    it('orientation.type이 landscape-primary이면 해당 문자열 반환', () => {
      Object.defineProperty(window.screen, 'orientation', {
        configurable: true,
        value: {
          type: 'landscape-primary',
          angle: 0,
          lock: () => Promise.resolve(),
          unlock: () => {},
          onchange: null,
        },
      });

      expect(detectViewportMode()).toBe('landscape-primary');
    });
  });
});
