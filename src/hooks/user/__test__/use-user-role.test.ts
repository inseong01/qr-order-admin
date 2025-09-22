/**
 * @file useUserRole 커스텀 훅의 단위 테스트입니다.
 * @description 사용자의 역할(role)에 따라 접근 권한을 올바르게 확인하는지 검증합니다.
 */
import { useAtomValue, useSetAtom } from 'jotai';
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';

import useUserRole from '../use-user-role';
import { userSessionAtom } from '@/features/auth/store/auth-atom';
import { showToastAtom } from '@/features/alert/toast/store/atom';

vi.mock('jotai', async (importOriginal) => {
  const original = await importOriginal<typeof import('jotai')>();
  return {
    ...original,
    useAtomValue: vi.fn(),
    useSetAtom: vi.fn(),
  };
});

// 모의 함수들 타입 캐스팅
const mockUseAtomValue = useAtomValue as Mock;
const mockUseSetAtom = useSetAtom as Mock;
const mockShowToast = vi.fn();

describe('useUserRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // useSetAtom(showToastAtom)이 mockShowToast 함수를 반환하도록 설정
    mockUseSetAtom.mockImplementation((atom) => {
      if (atom === showToastAtom) {
        return mockShowToast;
      }
      return vi.fn();
    });
  });

  describe('checkAccessByRole', () => {
    it("사용자 역할이 'admin'일 때, false를 반환해야 한다", () => {
      mockUseAtomValue.mockImplementation((atom) => {
        if (atom === userSessionAtom) {
          return { user: { user_metadata: { role: 'admin' } } };
        }
        return null;
      });

      const { result } = renderHook(() => useUserRole());

      const isAccessDenied = result.current.checkAccessByRole();

      expect(isAccessDenied).toBe(false);
      expect(mockShowToast).not.toHaveBeenCalled();
    });

    it("사용자 역할이 'guest'일 때, 접근 거부 메시지를 표시하고 true를 반환해야 한다", () => {
      mockUseAtomValue.mockImplementation((atom) => {
        if (atom === userSessionAtom) {
          return { user: { user_metadata: { role: 'guest' } } };
        }
        return null;
      });

      const { result } = renderHook(() => useUserRole());

      const isAccessDenied = result.current.checkAccessByRole();

      expect(isAccessDenied).toBe(true);
      expect(mockShowToast).toHaveBeenCalledWith('접근 권한이 없습니다.');
    });

    it("사용자 역할이 'viewer'일 때, 접근 거부 메시지를 표시하고 true를 반환해야 한다", () => {
      mockUseAtomValue.mockImplementation((atom) => {
        if (atom === userSessionAtom) {
          return { user: { user_metadata: { role: 'viewer' } } };
        }
        return null;
      });

      const { result } = renderHook(() => useUserRole());

      const isAccessDenied = result.current.checkAccessByRole();

      expect(isAccessDenied).toBe(true);
      expect(mockShowToast).toHaveBeenCalledWith('접근 권한이 없습니다.');
    });

    it('사용자 세션이 없을 때, guest로 간주하고 접근 거부 메시지를 표시하며 true를 반환해야 한다', () => {
      mockUseAtomValue.mockImplementation((atom) => {
        if (atom === userSessionAtom) {
          return null;
        }
        return null;
      });

      const { result } = renderHook(() => useUserRole());

      const isAccessDenied = result.current.checkAccessByRole();

      expect(isAccessDenied).toBe(true);
      expect(mockShowToast).toHaveBeenCalledWith('접근 권한이 없습니다.');
    });

    it('사용자 메타데이터에 역할이 없을 때, guest로 간주하고 접근 거부 메시지를 표시하며 true를 반환해야 한다', () => {
      mockUseAtomValue.mockImplementation((atom) => {
        if (atom === userSessionAtom) {
          return { user: { user_metadata: {} } };
        }
        return null;
      });

      const { result } = renderHook(() => useUserRole());

      const isAccessDenied = result.current.checkAccessByRole();

      expect(isAccessDenied).toBe(true);
      expect(mockShowToast).toHaveBeenCalledWith('접근 권한이 없습니다.');
    });
  });
});
