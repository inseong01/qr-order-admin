import styles from '@/style/bottom/TabMenu.module.css';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function TabeMenuOrderAlert({ tab }) {
  // useState
  const [isUnDoneList, setUndDoneList] = useState(false);
  // useQueryClient
  const queryClient = useQueryClient();
  // variant
  const allOrderList = queryClient.getQueryData(['allOrderList']);

  // 하단 탭, 완료되지 않은 주문 여부 알림 띄우기
  useEffect(() => {
    if (!allOrderList) return;
    if (tab.title !== '주문') return;
    // 완료 되지 않은 주문 여부
    const isUnDoneOrderList = allOrderList.some((list) => !list.isDone);
    setUndDoneList(isUnDoneOrderList);
  }, [allOrderList, tab]);

  return <>{isUnDoneList && <div className={`${styles.alertStatus}`}></div>}</>;
}
