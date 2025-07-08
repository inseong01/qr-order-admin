import { useEffect } from 'react';
import { useSetAtom } from 'jotai';

import { detectViewportModeAtom } from '../../store/atom/window-atom';

import Header from './header';
import Footer from './footer';
import Main from './main';

export default function PageWrap({ dataState }: { dataState: string }) {
  const detectViewportMode = useSetAtom(detectViewportModeAtom);

  // 화면 감지
  useEffect(() => {
    detectViewportMode(); // 초기 뷰포트 모드 상태 할당

    function detectViewportOnWindow() {
      detectViewportMode();
    }
    window.addEventListener('resize', detectViewportOnWindow);

    return () => {
      window.removeEventListener('resize', detectViewportOnWindow);
    };
  }, []);

  return <>{dataState === 'fulfilled' ? <SuccessComponent /> : <ErrorComponent />}</>;
}

function SuccessComponent() {
  return (
    <>
      {/* 페이지 */}
      <Header />
      <Main />
      <Footer />

      {/* 알림 */}
      {/* <AlertTableMessage /> */}

      {/* 위젯
      <Widget /> */}
    </>
  );
}
function ErrorComponent() {
  return <>오류가 발생했습니다.</>;
}
