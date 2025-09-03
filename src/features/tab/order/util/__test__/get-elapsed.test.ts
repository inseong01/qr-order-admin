/**
 * @file getElapsed 유틸리티 함수의 단위 테스트입니다.
 * @description 주문 시작 시간과 현재 시간 또는 완료 시간의 차이를 계산하여
 *              경과 시간을 상태(good, bad)와 함께 올바르게 반환하는지 검증합니다.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { getElapsed } from '../get-elapsed';
import { CardObj } from '../types';

describe('getElapsed', () => {
  const baseStart = new Date('2025-08-14T12:00:00Z').getTime();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(baseStart);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('startAt이 없으면 elapsed -1 반환', () => {
    const header = {} as CardObj['header'];
    expect(getElapsed(header)).toEqual({ state: 'error', type: '초', elapsed: -1 });
  });

  it('경과 시간이 59초면 초 단위(good)', () => {
    const header = { startAt: new Date(baseStart - 59_000).toISOString() } as CardObj['header'];
    expect(getElapsed(header)).toEqual({ state: 'good', type: '초', elapsed: 59 });
  });

  it('경과 시간이 16분이면 분 단위(bad)', () => {
    const header = { startAt: new Date(baseStart - 16 * 60_000).toISOString() } as CardObj['header'];
    expect(getElapsed(header)).toEqual({ state: 'bad', type: '분', elapsed: 16 });
  });

  it('경과 시간이 10분이면 분 단위(good)', () => {
    const header = { startAt: new Date(baseStart - 10 * 60_000).toISOString() } as CardObj['header'];
    expect(getElapsed(header)).toEqual({ state: 'good', type: '분', elapsed: 10 });
  });

  it('경과 시간이 5시간이면 시간 단위(bad)', () => {
    const header = { startAt: new Date(baseStart - 5 * 60 * 60_000).toISOString() } as CardObj['header'];
    expect(getElapsed(header)).toEqual({ state: 'bad', type: '시간', elapsed: 5 });
  });

  it('경과 시간이 2일이면 일 단위(bad)', () => {
    const header = { startAt: new Date(baseStart - 2 * 24 * 60 * 60_000).toISOString() } as CardObj['header'];
    expect(getElapsed(header)).toEqual({ state: 'bad', type: '일', elapsed: 2 });
  });

  it('updatedAt이 있으면 해당 시점까지만 계산', () => {
    const header = {
      startAt: new Date(baseStart - 10 * 60_000).toISOString(),
      updatedAt: new Date(baseStart - 5 * 60_000).toISOString(),
    } as CardObj['header'];
    expect(getElapsed(header)).toEqual({ state: 'good', type: '분', elapsed: 5 });
  });
});
