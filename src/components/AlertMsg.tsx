import { useBoundStore } from '../lib/store/useBoundStore';
import CommonMsgType from './alertMsg/CommonMsgType';

import { useEffect, useState } from 'react';

export default function AlertMsg() {
  // store
  const alertType = useBoundStore((state) => state.submit.alertType);
  const submitStatus = useBoundStore((state) => state.submit.status);
  const callCount = useBoundStore((state) => state.submit.callCount);
  // useState
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
      // menu 탭에서 메시지 사라지지 않는 현상 방지
      if (timer && submitStatus === 'fulfilled') return;
      clearTimeout(timer);
    };
  }, [submitStatus]);

  // fulfilled 때 alertMsg 사라지는 현상 방지
  if (submitStatus === 'pending') return;

  switch (alertType) {
    case 'menu':
    case 'category':
    case 'list':
    case 'product': {
      return <CommonMsgType isAlert={isAlert} />;
    }
  }
}
