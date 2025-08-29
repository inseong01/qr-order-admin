/**
 * @file generateNumberId 유틸리티 함수의 단위 테스트입니다.
 * @description 함수 호출 시 10자리의 랜덤 숫자 문자열 ID가
 *              정상적으로 생성되는지 검증합니다.
 */
import { describe, expect, it } from 'vitest';
import { generateNumberId } from '../generate-id';

describe('generateNumberId 유틸', () => {
  it('10자리 숫자 문자열을 생성', () => {
    const id = generateNumberId();

    expect(id).toBeTypeOf('string');
    expect(id).toHaveLength(10);
  });
});
