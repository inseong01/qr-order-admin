import styles from '@/style/top/HeaderLeft.module.css';
import getTabCategory from '@/lib/supabase/func/getTabCategory';
import HeaderCategorySwiper from '../swiper/HeaderCategorySwiper';
import AddCategoryBox from './AddCategoryBox';

import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function HeaderLeft() {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);
  const modalType = useSelector((state) => state.modalState.type);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  const submitStatus = useSelector((state) => state.submitState.status);
  // useQuery
  const categoryList = useQuery({
    queryKey: ['categoryList', { tab }],
    queryFn: () => getTabCategory(tab),
    refetchOnWindowFocus: false,
  });
  // variant
  const isNotCateogoryEdit = !modalType.includes('category');

  // 메뉴 카테고리 데이터 패칭 요청
  useEffect(() => {
    /*
      메뉴 카테고리 리패치, useEffect 사용 이유
      - ModalFormState.jsx에서 폼 제출 이후 리패치는 새로운 데이터를 받아오지 못함
      dispatch, await 코드 순은 순서대로 동작하지 않음
    */
    if (isNotCateogoryEdit) return;
    if (tab !== 'menu') return;
    if (!isSubmit) return;
    if (submitStatus === 'fulfilled') {
      categoryList.refetch();
    }
  }, [tab, isSubmit, submitStatus, isNotCateogoryEdit, categoryList]);

  if (categoryList.isFetching) {
    return <div className={styles.left}></div>;
  }

  return (
    <div className={styles.left}>
      <HeaderCategorySwiper />
      <AddCategoryBox />
    </div>
  );
}
