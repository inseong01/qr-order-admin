/**
 * @file useSuccessRedirect 커스텀 훅의 단위 테스트입니다.
 * @description authStatus 상태(atom)에 따라 페이지 리다이렉트가
 *              올바르게 동작하는지 검증합니다.
 */
import { ReactNode } from 'react';
import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { PATHS } from '@/constants/paths';

import { TestProvider } from './components/atom-provider';
import useSuccessRedirect from '../use-success-redirect';
import { REDIRECT_DELAY } from '../../const';
import { authStatusAtom } from '../../store/auth-atom';

// useNavigate 훅 모킹
const mockUseNavigate = vi.fn();
const mockUseLocation = vi.fn().mockReturnValue({ pathname: PATHS.AUTH.LOGIN });
vi.mock('react-router', async (importActual) => {
  const actual = await importActual<typeof import('react-router')>();
  return {
    ...actual,
    useNavigate: () => mockUseNavigate,
    useLocation: () => mockUseLocation(),
  };
});

describe('useSuccessRedirect 훅', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers(); // 타이머 모킹 활성화
  });

  afterEach(() => {
    vi.useRealTimers(); // 실제 타이머로 복원
  });

  describe('authStatus 상태에 따른 리다이렉트 동작', () => {
    it("authStatus가 'success'일 때, 일정 시간 후 메인 페이지 이동", () => {
      const initialValues = new Map<any, any>([[authStatusAtom, 'success']]);
      const wrapper = ({ children }: { children: ReactNode }) => (
        <TestProvider initialValues={initialValues}>{children}</TestProvider>
      );

      renderHook(() => useSuccessRedirect(), { wrapper });
      // REDIRECT_DELAY 만큼 시간 진행
      vi.advanceTimersByTime(REDIRECT_DELAY);

      expect(mockUseLocation).toHaveBeenCalled();
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
      expect(mockUseNavigate).toHaveBeenCalledWith('/', { replace: true });
    });

    it("authStatus가 'success'가 아닐 때, 페이지를 이동하지 않음", () => {
      const initialValues = new Map<any, any>([[authStatusAtom, 'loading']]);
      const wrapper = ({ children }: { children: ReactNode }) => (
        <TestProvider initialValues={initialValues}>{children}</TestProvider>
      );

      renderHook(() => useSuccessRedirect(), { wrapper });

      expect(mockUseNavigate).not.toHaveBeenCalled();
      expect(mockUseLocation).toHaveBeenCalled();
    });

    it('컴포넌트 언마운트 시, 타이머 정리하지 않음', () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
      const { unmount } = renderHook(() => useSuccessRedirect());

      unmount();

      expect(clearTimeoutSpy).not.toHaveBeenCalledTimes(1);
    });
  });
});
