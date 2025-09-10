/**
 * @file menu-validation 모듈 단위 테스트입니다.
 * @description 메뉴 카테고리, 메뉴, 주문 관련 데이터 검증 함수와 스키마가
 *              올바르게 동작하는지 검증합니다.
 */

import { describe, it, expect } from 'vitest';
import { FEATURE_MESSAGES } from '@/constants/message/feature';
import validate from '../function/menu-validate';

describe('menu-validation 모듈', () => {
  /* 메뉴 카테고리 검증 함수 */
  describe('createCategoryValue', () => {
    it('올바른 문자열 입력 시, 성공 반환', async () => {
      const result = await validate.createCategoryValue('한글&카테고리');
      expect(result.success).toBe(true);
    });

    it('빈 문자열 입력 시, 오류 반환', async () => {
      const result = await validate.createCategoryValue('');
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(FEATURE_MESSAGES.category.required);
    });
  });

  describe('updateCategoryValue', () => {
    it('올바른 배열 입력 시, 성공 반환', async () => {
      const data = [{ id: '1', title: '한글&카테고리' }];
      const result = await validate.updateCategoryValue(data);
      expect(result.success).toBe(true);
    });

    it('id 누락 시, 오류 반환', async () => {
      const data = [{ id: '', title: '카테고리' }];
      const result = await validate.updateCategoryValue(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(FEATURE_MESSAGES.category.select);
    });

    it('title 누락 시, 오류 반환', async () => {
      const data = [{ id: '1', title: '' }];
      const result = await validate.updateCategoryValue(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(FEATURE_MESSAGES.category.required);
    });
  });

  describe('deleteCategoryValue', () => {
    it('올바른 배열 입력 시, 성공 반환', async () => {
      const result = await validate.deleteCategoryValue(['1', '2']);
      expect(result.success).toBe(true);
    });

    it('빈 배열 입력 시, 오류 반환', async () => {
      const result = await validate.deleteCategoryValue([]);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(FEATURE_MESSAGES.category.select);
    });
  });

  /* 메뉴 검증 함수 */
  describe('createMenuValue', () => {
    it('올바른 데이터 입력 시, 성공 반환', async () => {
      const data = {
        category_id: '1',
        name: '메뉴명',
        price: 1000,
        tag: '추천',
        img_url: 'https://example.com/img.png',
      };
      const result = await validate.createMenuValue(data);
      expect(result.success).toBe(true);
    });

    it('가격 음수 입력 시, 오류 반환', async () => {
      const data = {
        category_id: '1',
        name: '메뉴명',
        price: -1000,
        tag: '추천',
      };
      const result = await validate.createMenuValue(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(FEATURE_MESSAGES.menu.priceInvalid);
    });

    it('분류 미선택 시, 오류 반환', async () => {
      const data = {
        category_id: '',
        name: '메뉴명',
        price: 1000,
        tag: '추천',
      };
      const result = await validate.createMenuValue(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(FEATURE_MESSAGES.menu.categoryRequired);
    });

    it('이름 미입력 시, 오류 반환', async () => {
      const data = {
        category_id: '1',
        name: '',
        price: 1000,
        tag: '추천',
      };
      const result = await validate.createMenuValue(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(FEATURE_MESSAGES.menu.nameRequired);
    });

    it('태그 미선택 시, 오류 반환', async () => {
      const data = {
        category_id: '1',
        name: '메뉴명',
        price: 1000,
        tag: '',
      };
      const result = await validate.createMenuValue(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(FEATURE_MESSAGES.menu.tagRequired);
    });
  });

  describe('updateMenuValue', () => {
    it('올바른 데이터 입력 시, 성공 반환', async () => {
      const data = {
        id: '1',
        category_id: '1',
        name: '메뉴명',
        price: 1000,
        tag: '추천',
        img_url: 'https://example.com/img.png',
      };
      const result = await validate.updateMenuValue(data);
      expect(result.success).toBe(true);
    });

    it('id 누락 시, 오류 반환', async () => {
      const data = {
        id: '',
        category_id: '1',
        name: '메뉴명',
        price: 1000,
        tag: '추천',
        img_url: 'https://example.com/img.png',
      };
      const result = await validate.updateMenuValue(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(FEATURE_MESSAGES.menu.idRequired);
    });
  });

  /* 주문 검증 함수 */
  describe('orderIdValue', () => {
    it('올바른 id 입력 시, 성공 반환', async () => {
      const result = await validate.orderIdValue('order1');
      expect(result.success).toBe(true);
    });

    it('빈 문자열 입력 시, 오류 반환', async () => {
      const result = await validate.orderIdValue('');
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe(FEATURE_MESSAGES.order.idRequired);
    });
  });
});
