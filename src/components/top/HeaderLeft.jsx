import styles from '@/style/top/HeaderLeft.module.css';
import useQueryCategoryList from '../../lib/hook/useQuery/useQueryCategoryList';
import HeaderCategorySwiper from '../swiper/HeaderCategorySwiper';
import AddCategoryBox from './AddCategoryBox';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function HeaderLeft() {
  // useSelector
  const tab = useSelector((state) => state.tabState.title);
  const modalType = useSelector((state) => state.modalState.type);
  const isSubmit = useSelector((state) => state.submitState.isSubmit);
  const submitStatus = useSelector((state) => state.submitState.status);
  // hook
  const categoryList = useQueryCategoryList();
  // variant
  const isNotCategoryEdit = !modalType.includes('category');
  // useState
  const [isAbleRefetch, setAlbeRefetch] = useState(true);

  // 메뉴 카테고리 데이터 패칭 요청
  useEffect(() => {
    /*
      메뉴 카테고리 리패치, useEffect 사용 이유
      - ModalFormState.jsx에서 폼 제출 이후 리패치는 새로운 데이터를 받아오지 못함
      dispatch, await 코드 순은 순서대로 동작하지 않음
      - fulfilled 무한 리패치
      isSubmit true 일 때 무한 리패치, flag 세워서 한 번만 되도록 설정  
    */
    if (isNotCategoryEdit || tab !== 'menu') return;

    if (!isSubmit) {
      setAlbeRefetch(true);
      return;
    }

    if (isAbleRefetch && submitStatus === 'fulfilled') {
      categoryList.refetch();
      console.log('refetch');
      setAlbeRefetch(false);
    }
  }, [isSubmit, submitStatus, isNotCategoryEdit, isAbleRefetch]);

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
