/**
 * @file menu-validation 모듈 단위 테스트입니다.
 * @description 메뉴 카테고리, 메뉴, 주문, 회원 인증 관련 데이터 검증 함수와 스키마가
 *              올바르게 동작하는지 검증합니다.
 */

import { describe, it, expect } from 'vitest';
import validate from '../function/validate';

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
      expect(result.error?.issues[0].message).toBe('분류를 입력해주세요.');
    });

    it('잘못된 문자 포함 시, 오류 반환', async () => {
      const result = await validate.createCategoryValue('abc123');
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe('한글, &만 입력 가능합니다.');
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
      expect(result.error?.issues[0].message).toBe('분류를 선택해주세요.');
    });

    it('title 누락 시, 오류 반환', async () => {
      const data = [{ id: '1', title: '' }];
      const result = await validate.updateCategoryValue(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe('분류를 입력해주세요.');
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
      expect(result.error?.issues[0].message).toBe('분류를 선택해주세요.');
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
      expect(result.error?.issues[0].message).toBe('가격은 0 이상의 숫자여야 합니다.');
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
      expect(result.error?.issues[0].message).toBe('메뉴 아이디는 포함되어야 합니다.');
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
      expect(result.error?.issues[0].message).toBe('주문이 선택되지 않았습니다.');
    });
  });

  /* 인증 스키마 검증 */
  describe('schema.login', () => {
    it('올바른 이메일/비밀번호 입력 시, 성공 반환', async () => {
      const data = { id: 'test@example.com', password: 'Aa1!aaaa' };
      const result = validate.schema.login.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('잘못된 이메일 입력 시, 오류 반환', async () => {
      const data = { id: 'test', password: 'Aa1!aaaa' };
      const result = validate.schema.login.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('규칙에 맞지 않는 비밀번호 입력 시, 오류 반환', async () => {
      const data = { id: 'test@example.com', password: 'aaaa' };
      const result = validate.schema.login.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('schema.signup', () => {
    it('비밀번호와 확인 일치 시, 성공 반환', async () => {
      const data = { id: 'test@example.com', password: 'Aa1!aaaa', confirmPassword: 'Aa1!aaaa' };
      const result = validate.schema.signup.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('비밀번호와 확인 불일치 시, 오류 반환', async () => {
      const data = { id: 'test@example.com', password: 'Aa1!aaaa', confirmPassword: 'Bb2!bbbb' };
      const result = validate.schema.signup.safeParse(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe('비밀번호가 일치하지 않습니다.');
    });
  });

  describe('schema.findPassword', () => {
    it('올바른 이메일 입력 시, 성공 반환', async () => {
      const data = { id: 'test@example.com' };
      const result = validate.schema.findPassword.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('빈 이메일 입력 시, 오류 반환', async () => {
      const data = { id: '' };
      const result = validate.schema.findPassword.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('schema.resetPassword', () => {
    it('규칙에 맞는 비밀번호 입력 시, 성공 반환', async () => {
      const data = { password: 'Aa1!aaaa' };
      const result = validate.schema.resetPassword.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('규칙에 맞지 않는 비밀번호 입력 시, 오류 반환', async () => {
      const data = { password: 'aaa' };
      const result = validate.schema.resetPassword.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('schema.captchaToken', () => {
    it('토큰 존재 시, 성공 반환', async () => {
      const data = 'token123';
      const result = validate.schema.captchaToken.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('빈 문자열 입력 시, 오류 반환', async () => {
      const data = '';
      const result = validate.schema.captchaToken.safeParse(data);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toBe('캡챠 토큰이 누락되었습니다.');
    });
  });
});
