import styles from '@/style/bottom/TabMenu.module.css';
import useQueryRequestList from '../../lib/hook/useQuery/useQueryRequestList';
import { TabCategoryList } from '../../types/common';

import { useEffect, useState } from 'react';

export default function TabMenuTableAlert({ tab }: { tab: TabCategoryList }) {
  // useState
  const [isUnreadAlert, setUndreadAlert] = useState(false);
  // hook
  const { data, isFetching } = useQueryRequestList();
  // variant
  const isAlertMoreThanFour = data ? data.filter((list) => !list.isRead).slice(4).length > 0 : false;

  // 하단 탭, 요청 알림 여부 알림 띄우기
  useEffect(() => {
    if (!data) return;
    if (isFetching) return;
    if (tab.title !== '좌석') return;
    // 읽지 않은 알림 있는지
    const isUndreadAlertList = data ? data.some((list) => !list.isRead) : false;
    setUndreadAlert(isUndreadAlertList);
  }, [data, isFetching, tab]);

  return (
    <>
      {isUnreadAlert && (
        <div className={`${styles.alertStatus} ${isAlertMoreThanFour ? styles.moreAlert : ''}`}></div>
      )}
    </>
  );
}
