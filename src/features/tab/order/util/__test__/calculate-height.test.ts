/**
 * @file 주문 카드 레이아웃 계산 함수 단위 테스트
 * @description 주문 데이터를 기반으로 카드 UI 레이아웃 높이 계산을 검증합니다
 */
import { describe, expect, it } from 'vitest';
import { calculateFooter, calculateHeader, calculateMain } from '../calculate-height';

describe('generate card 함수 테스트', () => {
  describe('calculateHeader', () => {
    it('시작 카드 헤더 높이', () => {
      const headerHeight = calculateHeader(true);
      expect(headerHeight).toBe(143);
    });

    it('일반 카드 헤더 높이', () => {
      const headerHeight = calculateHeader(false);
      expect(headerHeight).toBe(45);
    });
  });

  describe('calculateMain', () => {
    it('메뉴 1개 메인 높이', () => {
      const mainHeight = calculateMain();
      expect(mainHeight).toBe(69);
    });

    it('메뉴 2개 메인 높이', () => {
      const mainHeight = calculateMain() * 2;
      expect(mainHeight).toBe(138);
    });

    it('메뉴 7개 메인 높이', () => {
      const mainHeight = calculateMain() * 7;
      expect(mainHeight).toBe(483);
    });
  });

  describe('calculateFooter', () => {
    it('푸터 높이', () => {
      const footerHeight = calculateFooter();
      expect(footerHeight).toBe(79);
    });
  });
});
