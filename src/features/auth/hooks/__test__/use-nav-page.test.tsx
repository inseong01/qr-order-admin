/**
 * @file useNavPage 커스텀 훅의 단위 테스트입니다.
 * @description UI 요소의 비활성화 상태(disabled)에 따라
 *              페이지 이동 이벤트(handleNav)가 올바르게 제어되는지 검증합니다.
 */
import { MouseEvent } from 'react';
import { useSetAtom } from 'jotai';
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import useDisabled from '../use-disabled';
import useNavPage from '../use-nav-page';

// Jotai의 useSetAtom 훅 모킹
vi.mock('jotai', async (importOriginal) => {
  const original = await importOriginal<typeof import('jotai')>();
  return {
    ...original,
    useSetAtom: vi.fn(),
  };
});

// useDisabled 커스텀 훅 모킹
vi.mock('../../hooks/use-disabled');

const mockUseSetAtom = vi.fn();
const mockPreventDefault = vi.fn();
const mockMouseEvent = {
  preventDefault: mockPreventDefault,
} as unknown as MouseEvent<HTMLAnchorElement>;

describe('useNavPage 훅', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // useSetAtom 모의 함수가 mockUseSetAtom을 반환하도록 설정
    (useSetAtom as Mock).mockReturnValue(mockUseSetAtom);
  });

  describe('handleNav 함수', () => {
    it('disabled 상태가 true일 때, 이벤트의 기본 동작 제한', () => {
      (useDisabled as Mock).mockReturnValue({ disabled: true });
      const { result } = renderHook(() => useNavPage());

      result.current.handleNav(mockMouseEvent);

      expect(mockPreventDefault).toHaveBeenCalledTimes(1);
      expect(mockUseSetAtom).not.toHaveBeenCalled();
    });

    it('disabled 상태가 false일 때, resetForm 호출', () => {
      (useDisabled as Mock).mockReturnValue({ disabled: false });
      const { result } = renderHook(() => useNavPage());

      result.current.handleNav(mockMouseEvent);

      expect(mockPreventDefault).not.toHaveBeenCalled();
      expect(mockUseSetAtom).toHaveBeenCalled();
    });
  });
});
