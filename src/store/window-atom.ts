import { atom } from 'jotai';

import { detectMobileSize, detectViewportMode } from '@/util/function/check-device';

type WindowState = {
  viewportMode: 'portrait' | 'landscape';
  isMobile: boolean;
  mainSection: {
    width: number;
    height: number;
  };
};

const paddingX = 70; // main section padding X
const paddingY = 79 + 70 + 79; // header + main section padding Y + footer height
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
  const isMobile = detectMobileSize();
  const viewportMode = detectViewportMode().includes('landscape') ? 'landscape' : 'portrait';
  set(windowStateAtom, (prev: WindowState) => ({ ...prev, isMobile, viewportMode }));
});

// main section 크기 설정
export const resizeMainSectionAtom = atom(null, (_, set) => {
  set(windowStateAtom, (prev: WindowState) => ({
    ...prev,
    mainSection: {
      width: Math.floor(window.innerWidth - paddingX),
      height: Math.floor(window.innerHeight - paddingY),
    },
  }));
});
