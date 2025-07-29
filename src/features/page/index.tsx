import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';

import { debounce } from '@/utils/function/optimize';

import { detectViewportModeAtom, resizeMainSectionAtom } from '../../store/atom/window-atom';

import SuccessComponent from './success';
import ErrorComponent from './error';
import { footerAtom } from './footer';

export default function PageWrap({ dataState }: { dataState: string }) {
  const tab = useAtomValue(footerAtom);
  const resizeMainSection = useSetAtom(resizeMainSectionAtom);
  const detectViewportMode = useSetAtom(detectViewportModeAtom);

  // 화면 감지
  useEffect(() => {
    detectViewportMode(); // 초기 뷰포트 모드 상태 할당
    window.addEventListener('resize', detectViewportMode);
    return () => {
      window.removeEventListener('resize', detectViewportMode);
    };
  }, []);

  // main section 크기 동적 조절
  useEffect(() => {
    resizeMainSection();
    const debouncedResize = debounce(resizeMainSection, 200);
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, [tab]);

  if (dataState === 'pending') {
    return <></>;
  }

  if (dataState === 'fulfilled') {
    return <SuccessComponent />;
  }

  if (dataState === 'rejected') {
    return <ErrorComponent />;
  }

  return <></>;
}
