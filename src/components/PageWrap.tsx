import { useBoundStore } from '../lib/store/useBoundStore';
import { InitLoadState } from '../types/common';
import Footer from './Footer';
import Main from './Main';
import Header from './Header';

import { Dispatch, SetStateAction, useEffect } from 'react';

function SuccessComponent() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
function ErrorComponent() {
  return <></>;
}

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
    // 초기 뷰포트 모드 상태 할당
    detectViewportMode();

    function detectViewportOnWindow() {
      detectViewportMode();
    }

    window.addEventListener('resize', detectViewportOnWindow);

    return () => {
      window.removeEventListener('resize', detectViewportOnWindow);
    };
  }, []);

  useEffect(() => {
    // 로딩 중이면 반환
    if (isLoading) return;
    // 초기 UI 반복 마운트 방지
    if (isMounted) return;
    // 데이터 패치되었다면 페이지 보여주는 트리거
    setMount(true);
  }, [isLoading]);

  return <>{!isError && isCompleted ? <SuccessComponent /> : <ErrorComponent />}</>;
}
