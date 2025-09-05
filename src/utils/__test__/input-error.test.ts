/**
 * @file input-error 유틸리티 함수 단위 테스트입니다.
 * @description Zod 검증 에러를 필드별로 맵핑하고,
 *              특정 필드의 에러를 초기화하는 기능을 검증합니다.
 */

import { ZodIssue } from 'zod';
import { describe, expect, it } from 'vitest';
import { clearZodErrorForField, mapZodFieldErrors } from '../function/input-error';

type Inputs = {
  id: string;
  password: string;
  name: string;
};

const mockZodIssues: ZodIssue[] = [
  {
    code: 'invalid_type',
    expected: 'string',
    received: 'number',
    path: ['name'],
    message: '이름은 문자열이어야 합니다.',
    fatal: false,
  },
  {
    code: 'invalid_type',
    expected: 'string',
    received: 'number',
    path: ['password'],
    message: '비밀번호는 문자열이어야 합니다.',
    fatal: false,
  },
  {
    code: 'custom',
    path: ['id'],
    message: '유효하지 않은 아이디 형식입니다.',
    fatal: false,
  },
];

describe('input-error 유틸리티 함수', () => {
  describe('mapZodFieldErrors', () => {
    it('Zod issues가 존재할 때, 필드별 맵핑된 에러 반환', () => {
      const res = mapZodFieldErrors<Inputs>(mockZodIssues);

      expect(res.size).toBe(3);
      expect(res.has('password')).toBe(true);
      expect(res.has('id')).toBe(true);
      expect(res.has('name')).toBe(true);
    });
  });

  describe('clearZodErrorForField', () => {
    it('지정한 필드의 에러만 초기화하고 나머지는 유지', () => {
      const res = mapZodFieldErrors<Inputs>(mockZodIssues);
      const results = clearZodErrorForField(res, 'password');

      expect(results.has('password')).toBe(false);
      expect(results.has('id')).toBe(true);
      expect(results.has('name')).toBe(true);
    });
  });
});
