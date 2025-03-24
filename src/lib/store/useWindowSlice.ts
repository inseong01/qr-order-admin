import { detectMobile, detectViewportMode } from '../function/checkDevice';

import { StateCreator } from 'zustand';

type InitialState = {
  windowState: {
    viewportMode: 'portrait' | 'landscape';
    isMobile: boolean;
  };
};

const initialState: InitialState = {
  windowState: {
    viewportMode: 'portrait',
    isMobile: false,
  },
};

export interface UseWindowSlice {
  windowState: {
    viewportMode: 'portrait' | 'landscape';
    isMobile: boolean;
  };
  detectViewportMode: () => void;
}

export const useWindowSlice: StateCreator<
  UseWindowSlice,
  [['zustand/devtools', never]],
  [],
  UseWindowSlice
> =
  import.meta.env.MODE === 'development'
    ? (set) => ({
        ...initialState,
        detectViewportMode: () => {
          const isMobile = detectMobile();
          const viewportMode = detectViewportMode().includes('landscape')
            ? 'landscape'
            : 'portrait';
          set(
            { windowState: { isMobile, viewportMode } },
            undefined,
            'windowState/detectViewportMode'
          );
        },
      })
    : (set) => ({
        ...initialState,
        detectViewportMode: () => {
          const isMobile = detectMobile();
          const viewportMode = detectViewportMode().includes('landscape')
            ? 'landscape'
            : 'portrait';
          set({ windowState: { isMobile, viewportMode } });
        },
      });
