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
  isLoading,
  isMounted,
  isError,
  setMount,
}: {
  isLoading: boolean;
  isMounted: boolean;
  isError: boolean;
  setMount: Dispatch<SetStateAction<boolean>>;
}) {
  useEffect(() => {
    // 로딩 중이면 반환
    if (isLoading) return;
    // 초기 UI 반복 마운트 방지
    if (isMounted) return;
    // 데이터 패치되었다면 페이지 보여주는 트리거 설정
    setMount(true);
  }, [isLoading]);

  return <>{!isError ? <SuccessComponent /> : <ErrorComponent />}</>;
}
