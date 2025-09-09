/**
 * @file useConfirmModal 커스텀 훅의 단위 테스트입니다.
 * @description 사용자가 확인 모달을 열 때, jotai의 setConfirmModal 함수가
 *              올바른 상태와 함께 호출되는지 검증합니다.
 */
import { renderHook } from '@testing-library/react';
import { useSetAtom } from 'jotai';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';

import { useConfirmModal } from '../use-confirm-modal';

// jotai의 useSetAtom 훅 모킹
vi.mock('jotai', async (importOriginal) => {
  const original = await importOriginal<typeof import('jotai')>();
  return {
    ...original,
    useSetAtom: vi.fn(),
  };
});

const mockSetConfirmModal = vi.fn();

describe('useConfirmModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // 모킹된 useSetAtom이 mockSetConfirmModal 함수를 반환하도록 설정
    (useSetAtom as Mock).mockReturnValue(mockSetConfirmModal);
  });

  it('showConfirmModal 호출 시, setConfirmModal이 올바른 인자와 함께 호출되어야 한다', () => {
    const { result } = renderHook(() => useConfirmModal());
    const { showConfirmModal } = result.current;

    const onConfirmMock = vi.fn();
    const onCancelMock = vi.fn();

    const modalParams = {
      title: '테스트 타이틀',
      onConfirm: onConfirmMock,
      onCancle: onCancelMock,
    };

    showConfirmModal(modalParams);

    expect(mockSetConfirmModal).toHaveBeenCalledTimes(1);
    expect(mockSetConfirmModal).toHaveBeenCalledWith({
      isOpen: true,
      title: modalParams.title,
      onConfirm: modalParams.onConfirm,
      onCancle: modalParams.onCancle,
    });
  });

  it('onCancle 콜백이 제공되지 않았을 때도 올바르게 호출되어야 한다', () => {
    const { result } = renderHook(() => useConfirmModal());
    const { showConfirmModal } = result.current;

    const onConfirmMock = vi.fn();

    const modalParams = {
      title: '취소 콜백 없음',
      onConfirm: onConfirmMock,
    };

    showConfirmModal(modalParams);

    expect(mockSetConfirmModal).toHaveBeenCalledTimes(1);
    expect(mockSetConfirmModal).toHaveBeenCalledWith({
      isOpen: true,
      title: modalParams.title,
      onConfirm: modalParams.onConfirm,
      onCancle: undefined,
    });
  });
});
