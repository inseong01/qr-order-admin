import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import { Dispatch, useEffect } from 'react';

export default function PageWrap({
  isCompleted,
  setLoadComplete,
  isLoading,
}: {
  isCompleted: boolean;
  setLoadComplete: Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}) {
  useEffect(() => {
    // 로딩 중이면 반환
    if (isLoading) return;
    // 초기 UI 반복 마운트 방지
    if (isCompleted) return;
    // 데이터 패치되었다면 페이지 보여주는 트리거 설정
    setLoadComplete(true);
  }, [isLoading]);

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
