import styles from '@/style/bottom/TabMenu.module.css';
import fetchTableRequestList from '../../lib/supabase/func/fetchTableRequestList';

import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function TabeMenuTableAlert({ list }) {
  // useState
  const [isUnreadAlert, setUndreadAlert] = useState(false);
  // useSelector
  const requestTrigger = useSelector((state) => state.realtimeState.tableRequestList.trigger);
  // useQuery
  const requestList = useQuery({
    queryKey: ['requestList', requestTrigger],
    queryFn: () => fetchTableRequestList('select'),
    initialData: [],
  });

  // requestList DB 수신 감지
  useEffect(() => {
    if (requestList.isFetching) return;
    const isUndreadAlertList = requestList.data.some((list) => !list.isRead);
    const correctTab = list.title === '좌석';
    setUndreadAlert(correctTab && isUndreadAlertList);
  }, [requestList.isFetching, requestList.data]);

  return (
    <>
      {isUnreadAlert && (
        <div
          className={`${styles.alertStatus} ${
            requestList.data.filter((list) => !list.isRead).slice(4).length > 0 ? styles.moreAlert : ''
          }`}
        ></div>
      )}
    </>
  );
}
