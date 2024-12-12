import CommonMsgType from './alertMsg/CommonMsgType';
import TableMsgType from './alertMsg/TableAlertMsg';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function AlertMsg() {
  // useSelector
  const alertType = useSelector((state) => state.submitState.alertType);
  const submitStatus = useSelector((state) => state.submitState.status);
  const callCount = useSelector((state) => state.submitState.callCount);
  // useState
  const [isAlert, setIsAlert] = useState(false);

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

  // fulfilled 때 resetSubmitState() 하면 alertMsg 사라지는 현상 발생
  if (submitStatus === 'pending') return;

  switch (alertType) {
    case 'list':
    case 'product': {
      return <CommonMsgType isAlert={isAlert} />;
    }
  }
}
