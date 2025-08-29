import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { languageAtom, themeAtom } from '@/store/settings-atom';

/**
 * @description 전역 설정을 관리하고 DOM에 적용하는 컴포넌트
 * - 테마 변경을 감지하고 html 태그에 data-theme 속성을 업데이트합니다.
 */
export default function GlobalSettingsHandler() {
  const [_, setTheme] = useAtom(themeAtom);
  const [__, setLanguage] = useAtom(languageAtom);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const themeHandler = (e: MediaQueryListEvent) => {
      const theme = e.matches ? 'dark' : 'light';
      setTheme(theme);
    };
    mediaQuery.addEventListener('change', themeHandler);

    // 색상 테마 설정
    setTheme(mediaQuery.matches ? 'dark' : 'light');

    // 언어 설정
    setLanguage(navigator.language);

    return () => mediaQuery.removeEventListener('change', themeHandler);
  }, []);

  // 이 컴포넌트는 UI를 렌더링하지 않습니다.
  return null;
}
