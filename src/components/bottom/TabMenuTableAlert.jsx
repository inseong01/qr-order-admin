import styles from '@/style/bottom/TabMenu.module.css';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function TabMenuTableAlert({ tab }) {
  // useState
  const [isUnreadAlert, setUndreadAlert] = useState(false);
  // useQueryClient
  const queryClient = useQueryClient();
  // variant
  const requestList = queryClient.getQueryData(['requestList']);

  // 하단 탭, 요청 알림 여부 알림 띄우기
  useEffect(() => {
    if (!requestList) return;
    if (tab.title !== '좌석') return;
    // 읽지 않은 알림 있는지
    const isUndreadAlertList = requestList.some((list) => !list.isRead);
    setUndreadAlert(isUndreadAlertList);
  }, [requestList, tab]);

  return (
    <>
      {isUnreadAlert && (
        <div
          className={`${styles.alertStatus} ${
            requestList.filter((list) => !list.isRead).slice(4).length > 0 ? styles.moreAlert : ''
          }`}
        ></div>
      )}
    </>
  );
}
