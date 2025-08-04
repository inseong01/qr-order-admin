import { motion } from 'motion/react';

import SubmissionStatusAlert from '../alert/popup';
import WidgetCateogryModal from '../modal/widget';
import ConfirmModal from '../modal/confirm';

import Footer from './footer';
import Header from './header';
import Main from './main';

export default function SuccessComponent() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
    </motion.div>
  );
}
