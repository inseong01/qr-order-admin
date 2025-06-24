import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'motion/react';

import { useBoundStore } from '../../../lib/store/use-bound-store';
import { throttle } from '../../../util/function/optimize';

import { useQueryAllOrderList } from '../../../hook/use-query';

import { AllOrderList, MenuCategoryList } from '../../../types/common';

import UnderLine from '../../../components/styles/under-line/line-index';

import useScroll from './hook/use-scroll';

import styles from './header-left.module.css';

export default function HeaderLeft() {
  const tab = useBoundStore((state) => state.tab.title);
  const alertType = useBoundStore((state) => state.submit.alertType);
  const submitStatus = useBoundStore((state) => state.submit.status);
  const setInitSubmitStatus = useBoundStore((state) => state.setInitSubmitStatus);

  const [isAbleRefetch, setAbleRefetch] = useState(true);

  const queryClient = useQueryClient();
  const queryState = queryClient.getQueryState(['categoryList', { tab }]);
  const refetch = () => queryClient.refetchQueries({ queryKey: ['categoryList', { tab }] });

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
      setInitSubmitStatus(); // fulfilled 상태서 클릭 시 리패치 되는 상황 방지
    }
  }, [submitStatus]);

  const categoryId = useBoundStore((state) => state.category.id);
  const isModalOpen = useBoundStore((state) => state.modal.isOpen);
  const changeCategory = useBoundStore((state) => state.changeCategory);

  const headerleftSliderRef = useRef<HTMLUListElement>(null);

  const { onDrag, onDragStart } = useScroll(headerleftSliderRef);
  const allOrder = useQueryAllOrderList();

  const categoryData = queryClient.getQueryData(['categoryList', { tab }]) as MenuCategoryList[];
  const notServedOrder = allOrder.data ? allOrder.data.filter((list: AllOrderList) => !list.isDone).length : 0;

  // 카테고리 클릭
  function changeTabCategory({ id, title }: MenuCategoryList) {
    return async () => {
      if (isModalOpen) return;
      if (categoryId == id) return;

      // 해당 메뉴 카테고리 정보 변경, CSS/애니메이션 적용
      changeCategory({ id, title });

      // 메뉴 새로운 카테고리 ID로 데이터 패칭 요청
      await queryClient.refetchQueries({ queryKey: ['menuList', id] }, { throwOnError: true });
    };
  }

  // 패치되면 리렌더링 발생 트리거
  if (queryState?.fetchStatus === 'fetching') {
    return <div className={styles.left}></div>;
  }

  return (
    <div className={styles.left}>
      <ul
        ref={headerleftSliderRef}
        className={styles.swiper}
        onDragStart={onDragStart}
        onDrag={throttle(onDrag, 15)}
        onDragEnd={onDrag}
        draggable
      >
        {categoryData?.map((list) => {
          return (
            <li key={list.id} className={styles.categorySlide}>
              <div
                className={`${categoryId === list.id ? styles.clicked : ''} ${styles.category}`}
                onClick={changeTabCategory(list)}
              >
                <motion.div className={styles.title} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  {/* 카테고리명 */}
                  <div>{list.title}</div>

                  {/* 접수 주문 개수 */}
                  {list.title === '접수' && <div>{notServedOrder ? notServedOrder : null}</div>}
                </motion.div>

                <UnderLine tab={list} selectedId={categoryId} position={'bottom'} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
