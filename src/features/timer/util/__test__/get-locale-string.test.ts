/**
 * @file getLocaleString 유틸리티 함수의 단위 테스트입니다.
 * @description 현재 날짜와 시간을 지역화된 문자열로 올바르게 변환하는지 검증합니다.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getLocaleString } from '../get-locale-string';

describe('getLocaleString 유틸리티 함수', () => {
  const MOCK_DATE = new Date('2024-08-28T10:00:00.000Z');

  beforeEach(() => {
    // Date 객체를 모킹하여 항상 고정된 시간을 반환하도록 설정
    vi.spyOn(global, 'Date').mockImplementation(() => MOCK_DATE as any);
  });

  afterEach(() => {
    // 각 테스트 후 모킹 복원
    vi.restoreAllMocks();
  });

  it('호출 시, 현재 날짜와 시간의 지역화된 문자열을 객체 형태 반환', () => {
    const { newDate, newTime } = getLocaleString();

    // 모킹된 Date 객체 결과와 일치하는지 확인
    expect(newDate).toBe(MOCK_DATE.toLocaleDateString());
    expect(newTime).toBe(MOCK_DATE.toLocaleTimeString());
  });
});
