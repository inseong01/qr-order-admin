import styles from '@/style/bottom/TabMenu.module.css';
import useQueryRequestList from '../../lib/hook/useQuery/useQueryRequestList';

import { useEffect, useState } from 'react';

export default function TabMenuTableAlert({ tab }) {
  // useState
  const [isUnreadAlert, setUndreadAlert] = useState(false);
  // hook
  const { data } = useQueryRequestList();

  // 하단 탭, 요청 알림 여부 알림 띄우기
  useEffect(() => {
    if (!data) return;
    if (tab.title !== '좌석') return;
    // 읽지 않은 알림 있는지
    const isUndreadAlertList = data.some((list) => !list.isRead);
    setUndreadAlert(isUndreadAlertList);
  }, [data, tab]);

  return (
    <>
      {isUnreadAlert && (
        <div
          className={`${styles.alertStatus} ${
            data?.filter((list) => !list.isRead).slice(4).length > 0 ? styles.moreAlert : ''
          }`}
        ></div>
      )}
    </>
  );
}
