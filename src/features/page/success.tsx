import SubmissionStatusAlert from '../alert/popup';
import WidgetCateogryModal from '../modal/widget';
import ConfirmModal from '../modal/confirm';

import Footer from './footer';
import Header from './header';
import Main from './main';

export default function SuccessComponent() {
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
