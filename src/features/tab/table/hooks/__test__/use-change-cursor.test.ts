/**
 * @file useOnMouseChangeCursor 커스텀 훅의 단위 테스트입니다.
 * @description 사용자의 마우스 위치와 편집 모드 상태에 따라
 *              Konva Stage의 커서 스타일이 올바르게 변경되는지 검증합니다.
 */
import Konva from 'konva';
import { useAtomValue } from 'jotai';
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';

import useOnMouseChangeCursor from '../use-change-cursor';
import { editModeAtom, selectedTableIdsAtom } from '../../store/table-edit-state';

// jotai의 useAtomValue 훅 모킹
vi.mock('jotai', async (importOriginal) => {
  const origin = await importOriginal<typeof import('jotai')>();
  return {
    ...origin,
    useAtomValue: vi.fn(),
  };
});

// Konva Stage 모킹
const mockStage = {
  container: () => ({
    style: {
      cursor: 'default',
    },
  }),
} as unknown as Konva.Stage;

describe('useOnMouseChangeCursor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // 각 테스트 실행 전 커서 스타일 초기화
    mockStage.container().style.cursor = 'default';
  });

  it('changeDefaultCursor 호출 시, 커서가 "default"로 변경되어야 한다', () => {
    const { result } = renderHook(() => useOnMouseChangeCursor(mockStage, 'table-1'));
    result.current.changeDefaultCursor();
    expect(mockStage.container().style.cursor).toBe('default');
  });

  it('일반 모드에서 changePointerCursor 호출 시, 커서가 "default"로 변경되어야 한다', () => {
    (useAtomValue as Mock).mockImplementation((atom) => {
      if (atom === selectedTableIdsAtom) return [];
      if (atom === editModeAtom) return null;
      return null;
    });

    const { result } = renderHook(() => useOnMouseChangeCursor(mockStage, 'table-1'));
    result.current.changePointerCursor();
    expect(mockStage.container().style.cursor).toBe('default');
  });

  /*
    Expected: "move"
    Received: "default"
  */
  it('편집 모드에서 선택된 테이블 위일 때, 커서가 "move"로 변경되어야 한다', () => {
    (useAtomValue as Mock).mockImplementation((atom) => {
      if (atom === selectedTableIdsAtom) return ['table-1'];
      if (atom === editModeAtom) return 'edit'; // 'delete'가 아닌 모든 편집 모드
      return null;
    });

    const { result } = renderHook(() => useOnMouseChangeCursor(mockStage, 'table-1'));
    result.current.changePointerCursor();
    expect(mockStage.container().style.cursor).toBe('move');
  });

  /*
    Expected: "pointer"
    Received: "default"
  */
  it('편집 모드에서 선택되지 않은 테이블 위일 때, 커서가 "pointer"로 변경되어야 한다', () => {
    (useAtomValue as Mock).mockImplementation((atom) => {
      if (atom === selectedTableIdsAtom) return ['table-2']; // 다른 테이블이 선택됨
      if (atom === editModeAtom) return 'edit';
      return null;
    });

    const { result } = renderHook(() => useOnMouseChangeCursor(mockStage, 'table-1'));
    result.current.changePointerCursor();
    expect(mockStage.container().style.cursor).toBe('pointer');
  });

  /*
    Expected: "pointer"
    Received: "default"
  */
  it('삭제 모드에서는 선택된 테이블이라도 커서가 "pointer"로 변경되어야 한다', () => {
    (useAtomValue as Mock).mockImplementation((atom) => {
      if (atom === selectedTableIdsAtom) return ['table-1'];
      if (atom === editModeAtom) return 'delete'; // 삭제 모드
      return null;
    });

    const { result } = renderHook(() => useOnMouseChangeCursor(mockStage, 'table-1'));
    result.current.changePointerCursor();
    expect(mockStage.container().style.cursor).toBe('pointer');
  });

  it('stageRef가 null일 때, 에러 없이 함수가 종료되어야 한다', () => {
    const { result } = renderHook(() => useOnMouseChangeCursor(null, 'table-1'));

    // 에러가 발생하는지 여부만 확인
    expect(() => result.current.changeDefaultCursor()).not.toThrow();
    expect(() => result.current.changePointerCursor()).not.toThrow();
  });
});
