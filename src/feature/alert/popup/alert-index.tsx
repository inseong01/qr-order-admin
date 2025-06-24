import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { useBoundStore } from '../../../lib/store/use-bound-store';

import styles from './alert-index.module.css';

export default function AlertTableMessage() {
  const alertType = useBoundStore((state) => state.submit.alertType);
  const submitStatus = useBoundStore((state) => state.submit.status);
  const callCount = useBoundStore((state) => state.submit.callCount);

  const [isAlert, setIsAlert] = useState(false);

  // 알림 메시지 등장/퇴장
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (submitStatus === 'fulfilled' || submitStatus === 'rejected') {
      setIsAlert(true);

      // 오류 발생 5번 이후 사라짐 제한
      if (callCount < 5) {
        timer = setTimeout(() => {
          setIsAlert(false);
        }, 1700);
      }
    }
    return () => {
      if (timer && submitStatus === 'fulfilled') return; // menu 탭에서 메시지 사라지지 않는 현상 방지
      clearTimeout(timer);
    };
  }, [submitStatus]);

  if (submitStatus === 'pending') return; // fulfilled 때 alertMsg 사라지는 현상 방지

  switch (alertType) {
    case 'menu':
    case 'category':
    case 'list':
    case 'product': {
      return <CommonMsgType isAlert={isAlert} />;
    }
  }
}

function CommonMsgType({ isAlert }: { isAlert: boolean }) {
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
