import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { REALTIME_POSTGRES_CHANGES_LISTEN_EVENT } from '@supabase/realtime-js';

import { useQueryClientTable } from '@/hooks/use-query/query-client';

import { detectViewportModeAtom, resizeMainSectionAtom } from '@/store/window-atom';

import { debounce } from '@/utils/function/optimize';

import ConfirmModal from '@/features/modal/confirm';
import WidgetCateogryModal from '@/features/modal/widget';
import ToastNotification from '@/features/alert/toast';
import ErrorComponent from '@/features/page/error';
import Footer, { footerAtom } from '@/features/page/footer';
import Header from '@/features/page/header';
import Main from '@/features/page/main';

export default function LoadPage() {
  const { dataStatus } = useQueryClientTable(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.ALL);
  const tab = useAtomValue(footerAtom);
  const resizeMainSection = useSetAtom(resizeMainSectionAtom);
  const detectViewportMode = useSetAtom(detectViewportModeAtom);

  /**
   * 화면 감지
   */
  useEffect(() => {
    detectViewportMode(); // 초기 뷰포트 모드 상태 할당
    window.addEventListener('resize', detectViewportMode);
    return () => {
      window.removeEventListener('resize', detectViewportMode);
    };
  }, []);

  /**
   * main section 크기 동적 조절
   */
  useEffect(() => {
    resizeMainSection();
    const debouncedResize = debounce(resizeMainSection, 200);
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, [tab]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      {/* 페이지 */}
      <Header />
      {dataStatus === 'rejected' ? <ErrorComponent /> : <Main />}
      <Footer />

      {/* 토스트 알림 */}
      <ToastNotification />

      {/* 확인 */}
      <ConfirmModal />

      {/* 위젯 모달 */}
      <WidgetCateogryModal />
    </motion.div>
  );
}
