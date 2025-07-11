import { useEffect } from 'react';
import { useSetAtom } from 'jotai';

import { detectViewportModeAtom } from '../../store/atom/window-atom';
import { openSubmissionStatusAlertAtom } from '../alert/popup/store/atom';
import WidgetCateogryModal from '../modal/widget';
import ConfirmModal from '../modal/confirm';
import SubmissionStatusAlert from '../alert/popup';
import Header from './header';
import Footer from './footer';
import Main from './main';

export default function PageWrap({ dataState }: { dataState: string }) {
  const detectViewportMode = useSetAtom(detectViewportModeAtom);
  const openSubmissionStatusAlert = useSetAtom(openSubmissionStatusAlertAtom);

  // 화면 감지
  useEffect(() => {
    openSubmissionStatusAlert('안녕하세요'); // 제출 처리 결과 알림
    detectViewportMode(); // 초기 뷰포트 모드 상태 할당

    function detectViewportOnWindow() {
      detectViewportMode();
    }
    window.addEventListener('resize', detectViewportOnWindow);

    return () => {
      window.removeEventListener('resize', detectViewportOnWindow);
    };
  }, []);

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

function SuccessComponent() {
  return (
    <>
      {/* 페이지 */}
      <Header />
      <Main />
      <Footer />

      {/* 알림 */}
      <SubmissionStatusAlert />

      {/* 확인 */}
      <ConfirmModal />

      {/* 위젯 모달 */}
      <WidgetCateogryModal />
    </>
  );
}

function ErrorComponent() {
  return <>오류가 발생했습니다.</>;
}
