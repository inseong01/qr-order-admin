import { detectLandscapeViewport, detectMobile } from '../../lib/function/checkDevice';
import TableAlertMsg from '../alertMsg/TableAlertMsg';
import MainModal from '../modal/MainModal';
import KonvaSection from './konva/KonvaSection';

import { useEffect, useRef, useState } from 'react';

function TableTabComponent() {
  return (
    <>
      <KonvaSection />
      <MainModal />
      <TableAlertMsg />
    </>
  );
}

export default function MainPageTableTab() {
  // state
  const [enableMount, setMount] = useState(false);
  // ref
  const prevWidthRef = useRef(window.innerWidth);

  // resize 이벤트 설정
  useEffect(() => {
    function detectViewportOnWindow(e: Event) {
      const isMobile = detectMobile();
      const isViewportLandscape = detectLandscapeViewport();

      // 모바일 전용
      if (!isMobile) {
        setMount(true);
        return;
      }

      // width 감지
      const target = e.target as Window;
      if (target) {
        const currentWidth = target.innerWidth;
        if (prevWidthRef.current === currentWidth) return;
      }

      // 화면 감지
      if (isViewportLandscape) {
        setMount(true);
      } else {
        setMount(false);
      }

      prevWidthRef.current = target.innerWidth;
    }

    window.addEventListener('resize', detectViewportOnWindow);

    return () => {
      window.removeEventListener('resize', detectViewportOnWindow);
    };
  }, []);

  return <>{enableMount ? <TableTabComponent /> : '화면을 돌려주세요'}</>;
}
