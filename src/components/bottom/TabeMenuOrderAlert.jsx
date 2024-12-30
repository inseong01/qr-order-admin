import styles from '@/style/bottom/TabMenu.module.css';
import fetchOrderList from '../../lib/supabase/func/fetchOrderList';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function TabeMenuOrderAlert({ list }) {
  // useState
  const [isUnDoneList, setUndDoneList] = useState(false);
  // useSelector
  const orderTrigger = useSelector((state) => state.realtimeState.allOrderList.trigger);
  // useQuery
  const allOrderList = useQuery({
    queryKey: ['allOrderList', orderTrigger],
    queryFn: () => fetchOrderList('select'),
    initialData: [],
  });

  useEffect(() => {
    if (allOrderList.isFetching) return;
    const isUnDoneOrderList = allOrderList.data.some((list) => !list.isDone);
    const isCorrectTab = list.title === '주문';
    setUndDoneList(isCorrectTab && isUnDoneOrderList);
  }, [allOrderList.isFetching, allOrderList.data]);

  return <>{isUnDoneList && <div className={`${styles.alertStatus}`}></div>}</>;
}
