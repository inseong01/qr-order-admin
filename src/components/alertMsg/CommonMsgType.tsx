import styles from '@/style/AlertMsg.module.css';
import { useBoundStore } from '../../lib/store/useBoundStore';

import { motion, AnimatePresence } from 'motion/react';

export default function CommonMsgType({ isAlert }: { isAlert: boolean }) {
  // store
  const msgType = useBoundStore((state) => state.submit.msgType);
  const submitStatus = useBoundStore((state) => state.submit.status);
  const callCount = useBoundStore((state) => state.submit.callCount);

  let str = '';
  switch (msgType) {
    case 'complete': {
      str = submitStatus !== 'rejected' ? '완료되었습니다.' : '요청에 실패했습니다';
      break;
    }
    case 'update': {
      str = submitStatus !== 'rejected' ? '수정되었습니다.' : '요청에 실패했습니다';
      break;
    }
    case 'insert': {
      str = submitStatus !== 'rejected' ? '생성되었습니다.' : '요청에 실패했습니다';
      break;
    }
    case 'delete': {
      str = submitStatus !== 'rejected' ? '삭제되었습니다.' : '요청에 실패했습니다';
      break;
    }
    default: {
      if (submitStatus === 'rejected') str = '요청에 실패했습니다.';
    }
  }

  return (
    <AnimatePresence>
      {isAlert && (
        <motion.div
          key={'alert'}
          className={`${styles.alertMsg} ${submitStatus !== 'rejected' ? '' : styles.error}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={callCount <= 5 ? { opacity: 0, y: 10 } : undefined}
          style={{ translateX: '-50%' }}
        >
          <div className={styles.title}>{callCount < 5 ? str : '페이지를 새로고침 해주세요!'}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
