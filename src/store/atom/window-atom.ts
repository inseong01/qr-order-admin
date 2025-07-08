import { atom } from 'jotai';
import { detectMobile, detectViewportMode } from '../../utils/function/check-device';

//- zustand
// type InitialState = {
//   windowState: {
//     viewportMode: 'portrait' | 'landscape';
//     isMobile: boolean;
//   };
// };

//- jotai
type WindowState = {
  viewportMode: 'portrait' | 'landscape';
  isMobile: boolean;
};

const initialWindowState: WindowState = {
  viewportMode: 'portrait',
  isMobile: false,
};

// 윈도우 상태
export const windowStateAtom = atom<WindowState>(initialWindowState);

// 뷰포트 모드 감지
export const detectViewportModeAtom = atom(null, (_, set) => {
  const isMobile = detectMobile();
  const viewportMode = detectViewportMode().includes('landscape') ? 'landscape' : 'portrait';
  set(windowStateAtom, { isMobile, viewportMode });
});
