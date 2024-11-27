'use client';

import styles from '@/style/AlertMsg.module.css';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const requestAlertListArr = new Array(1).fill(0).map((value, idx) => idx + 1);

export default function AlertMsg() {
  // useSelector
  const alertType = useSelector((state) => state.submitState.type);
  const submitStatus = useSelector((state) => state.submitState.status);
  const msgType = useSelector((state) => state.modalState.type);
  // useState
  const [requestAlertList, setRequestAlertList] = useState(requestAlertListArr);
  const [isAlert, setIsAlert] = useState(false);
  // useRef
  const reqeustMsgRef = useRef(null);

  useEffect(() => {
    let timer;
    if (submitStatus === 'fulfilled') {
      setIsAlert(true);
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
    case 'product': {
      let str = '';

      switch (msgType) {
        case 'edit': {
          str = '수정되었습니다.';
          break;
        }
        case 'add': {
          str = '추가되었습니다.';
          break;
        }
      }

      return (
        <AnimatePresence>
          {isAlert && (
            <motion.div
              className={styles.alertMsg}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              style={{ translateX: '-50%' }}
            >
              <div className={styles.title}>{str}</div>
            </motion.div>
          )}
        </AnimatePresence>
      );
    }
  }
}
