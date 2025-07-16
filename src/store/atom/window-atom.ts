import { atom } from 'jotai';

import { detectMobile, detectViewportMode } from '../../utils/function/check-device';

type WindowState = {
  viewportMode: 'portrait' | 'landscape';
  isMobile: boolean;
  mainSection: {
    width: number;
    height: number;
  };
};

const paddingX = 70;
const paddingY = 85 + 70 + 85;
const initialWindowState: WindowState = {
  viewportMode: 'portrait',
  isMobile: false,
  mainSection: {
    width: window.innerWidth - paddingX,
    height: window.innerHeight - paddingY,
  },
};

// 윈도우 상태
export const windowStateAtom = atom<WindowState>(initialWindowState);

// 뷰포트 모드 감지
export const detectViewportModeAtom = atom(null, (_, set) => {
  const isMobile = detectMobile();
  const viewportMode = detectViewportMode().includes('landscape') ? 'landscape' : 'portrait';
  set(windowStateAtom, (prev: WindowState) => ({ ...prev, isMobile, viewportMode }));
});

// main section 크기 설정
export const resizeMainSectionAtom = atom(null, (_, set) => {
  set(windowStateAtom, (prev: WindowState) => ({
    ...prev,
    mainSection: {
      width: window.innerWidth - paddingX,
      height: window.innerHeight - paddingY,
    },
  }));
});
