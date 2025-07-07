import { Dispatch, SetStateAction, useEffect } from 'react';

import { useBoundStore } from '../../../lib/store/use-bound-store';

import { InitLoadState } from '../../../types/common';

import AlertTableMessage from '../alert/popup/alert-index';
import Header from './header';
// import Header from './header/header-index';
import Footer from './footer';
// import Footer from './footer-index';
import Main from './main/main-index';
import Widget from '../widget';

export default function PageWrap({
  state,
  setMount,
}: {
  state: InitLoadState;
  setMount: Dispatch<SetStateAction<boolean>>;
}) {
  const { isCompleted, isLoading, isMounted, isError } = state;

  const detectViewportMode = useBoundStore((state) => state.detectViewportMode);

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

  useEffect(() => {
    if (isLoading) return; // 로딩 중이면 반환
    if (isMounted) return; // 초기 UI 반복 마운트 방지

    setMount(true); // 데이터 패치되었다면 페이지 보여주는 트리거
  }, [isLoading]);

  return <>{isCompleted ? <SuccessComponent /> : isError ? <ErrorComponent /> : <></>}</>;
}

function SuccessComponent() {
  return (
    <>
      {/* 페이지 */}
      <Header />
      <Main />
      <Footer />

      {/* 알림 */}
      <AlertTableMessage />

      {/* 위젯 */}
      <Widget />
    </>
  );
}
function ErrorComponent() {
  return <>오류가 발생했습니다.</>;
}
