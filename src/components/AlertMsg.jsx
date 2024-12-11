import CommonMsgType from './alertMsg/CommonMsgType';
import TableMsgType from './alertMsg/TableMsgType';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const requestAlertListArr = new Array(1).fill(0).map((value, idx) => idx + 1);

export default function AlertMsg() {
  // useSelector
  const alertType = useSelector((state) => state.submitState.alertType);
  const submitStatus = useSelector((state) => state.submitState.status);
  const callCount = useSelector((state) => state.submitState.callCount);
  // useState
  const [requestAlertList, setRequestAlertList] = useState(requestAlertListArr);
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

  useEffect(() => {
    // setTimeout(() => {
    //   setRequestAlertList((prev) => [...prev, ...requestAlertListArr]);
    // }, 1000);
    // reqeustMsgRef.current.scrollTop = reqeustMsgRef.current.scrollHeight;
  }, [requestAlertList]);

  // fulfilled 때 resetSubmitState() 하면 alertMsg 사라지는 현상 발생
  if (submitStatus === 'pending') return;

  switch (alertType) {
    case 'request': {
      return <TableMsgType requestAlertList={requestAlertList} />;
    }
    case 'list':
    case 'product': {
      return <CommonMsgType isAlert={isAlert} />;
    }
  }
}
