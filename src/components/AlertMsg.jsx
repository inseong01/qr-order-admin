'use client';

import styles from '@/style/AlertMsg.module.css';
import { changeModalState } from '@/lib/features/modalState/modalSlice';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const requestAlertListArr = new Array(1).fill(0).map((value, idx) => idx + 1);

export default function AlertMsg() {
  // useSelector
  const alertType = useSelector((state) => state.submitState.alertType);
  const submitStatus = useSelector((state) => state.submitState.status);
  const msgType = useSelector((state) => state.modalState.type);
  const callCount = useSelector((state) => state.submitState.callCount);
  // useState
  const [requestAlertList, setRequestAlertList] = useState(requestAlertListArr);
  const [isAlert, setIsAlert] = useState(false);
  // useRef
  const reqeustMsgRef = useRef(null);

  useEffect(() => {
    let timer;
    setIsAlert(true);
    if (callCount < 5) {
      // 클릭 4번 제한
      timer = setTimeout(() => {
        setIsAlert(false);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [submitStatus]);

  useEffect(() => {
    // setTimeout(() => {
    //   setRequestAlertList((prev) => [...prev, ...requestAlertListArr]);
    // }, 1000);
    // reqeustMsgRef.current.scrollTop = reqeustMsgRef.current.scrollHeight;
  }, [requestAlertList]);

  switch (alertType) {
    case 'request': {
      return (
        <div className={styles.reqeustMsgWrap} ref={reqeustMsgRef}>
          <motion.ul className={styles.reqeustMsg}>
            <AnimatePresence mode="popLayout">
              {requestAlertList.map((list, idx) => {
                return (
                  <motion.li
                    key={idx}
                    className={styles.msg}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ y: 10 }}
                    layout
                  >
                    <div className={styles.top}>
                      <div className={styles.index}>#{idx + 1}</div>
                      <div className={styles.title}> 테이블 1</div>
                    </div>
                    <div className={styles.bottom}>
                      <span>요청사항: </span>
                      <br />
                      <span>qqqqqqqqqqqqqqqqqqqqq</span>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        </div>
      );
    }
    case 'list':
    case 'product': {
      if (submitStatus === 'pending') return;

      let str = '';
      switch (msgType) {
        case 'edit': {
          str = submitStatus !== 'rejected' ? '수정되었습니다.' : '요청에 실패했습니다';
          break;
        }
        case 'add': {
          str = submitStatus !== 'rejected' ? '추가되었습니다.' : '요청에 실패했습니다';
          break;
        }
        default: {
          if (submitStatus === 'rejected') {
            str = '요청에 실패했습니다.';
          } else {
            return;
          }
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
              exit={callCount <= 5 ? { opacity: 0, y: 10 } : false}
              style={{ translateX: '-50%' }}
            >
              <div className={styles.title}>{callCount < 5 ? str : '페이지를 새로고침 해주세요!'}</div>
            </motion.div>
          )}
        </AnimatePresence>
      );
    }
  }
}
