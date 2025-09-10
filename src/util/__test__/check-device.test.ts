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
    it('화면 높이가 720 미만이면 너비와 상관없이 true 반환', () => {
      Object.defineProperty(window.screen, 'availWidth', {
        configurable: true,
        value: 1024,
      });
      Object.defineProperty(window.screen, 'availHeight', {
        configurable: true,
        value: 0,
      });

      expect(detectMobileSize()).toBe(true);
    });

    it('화면 너비가 1024 미만이면 높이와 상관없이 true 반환', () => {
      Object.defineProperty(window.screen, 'availWidth', {
        configurable: true,
        value: 1023,
      });
      Object.defineProperty(window.screen, 'availHeight', {
        configurable: true,
        value: 1080,
      });

      expect(detectMobileSize()).toBe(true);
    });

    it('화면 높이가 720 이상이고 너비가 1024 이상이면 false 반환', () => {
      Object.defineProperty(window.screen, 'availWidth', {
        configurable: true,
        value: 1024,
      });
      Object.defineProperty(window.screen, 'availHeight', {
        configurable: true,
        value: 730,
      });

      expect(detectMobileSize()).toBe(false);
    });
  });

  describe('detectViewportMode', () => {
    it('세로 모드(portrait-primary)일 경우 해당 문자열 반환', () => {
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

    it('가로 모드(landscape-primary)일 경우 해당 문자열 반환', () => {
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
