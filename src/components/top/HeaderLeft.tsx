import styles from '@/style/top/HeaderLeft.module.css';
import { useBoundStore } from '../../lib/store/useBoundStore';
import HeaderCategorySwiper from '../swiper/header/HeaderCategorySwiper';

import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export default function HeaderLeft() {
  // store
  const tab = useBoundStore((state) => state.tab.title);
  const alertType = useBoundStore((state) => state.submit.alertType);
  const submitStatus = useBoundStore((state) => state.submit.status);
  const setInitSubmitStatus = useBoundStore((state) => state.setInitSubmitStatus);
  // query
  const query = useQueryClient();
  const queryState = query.getQueryState(['categoryList', { tab }]);
  const refetch = () => query.refetchQueries({ queryKey: ['categoryList', { tab }] });
  // useState
  const [isAbleRefetch, setAbleRefetch] = useState(true);

  // 메뉴 카테고리 데이터 패칭 요청
  useEffect(() => {
    /*
      메뉴 카테고리 리패치, useEffect 사용 이유
        - useModalSubmitData.js에서 폼 제출 이후 리패치는 새로운 데이터를 받아오지 못함
          : 제출 상태 변화로 불가능
        - 무한 리패치
          : flag 세워서 한 번만 되도록 설정, 불필요 의존성 제외  
    */
    // 카테고리 관련일 때 리패치
    if (tab !== 'menu') return;
    if (alertType !== 'category') return;

    setAbleRefetch(true);

    if (isAbleRefetch && submitStatus === 'fulfilled') {
      refetch();
      setAbleRefetch(false);
      // fulfilled 상태서 클릭 시 리패치 되는 상황 방지
      setInitSubmitStatus();
    }
  }, [submitStatus]);

  // 패치되면 리렌더링 발생 트리거
  if (queryState?.fetchStatus === 'fetching') {
    return <div className={styles.left}></div>;
  }

  return (
    <div className={styles.left}>
      <HeaderCategorySwiper />
    </div>
  );
}
