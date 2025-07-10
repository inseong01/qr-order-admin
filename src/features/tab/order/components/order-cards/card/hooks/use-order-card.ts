
import { useState, useEffect } from 'react';
import { Order } from '@/lib/supabase/function/order';

// TODO: Zustand 스토어 마이그레이션 후 아래 주석 해제
// import { useBoundStore } from '@/store'; 

export function useOrderCard(order: Order) {
  // const categoryId = useBoundStore((state) => state.category.id);
  // const submitError = useBoundStore((state) => state.submit.isError);
  // const submitStatus = useBoundStore((state) => state.submit.status);
  // const getSelectedListId = useBoundStore((state) => state.getSelectedListId);

  const [isDragging, setDragState] = useState(false);
  const [isSlideClicked, clickSlide] = useState(false);

  const isMobileSize = window.innerWidth <= 720;

  // 기능: 슬라이드 상태 초기화
  // useEffect(() => {
  //   if (submitStatus === 'fulfilled' || submitStatus === 'rejected') {
  //     clickSlide(false);
  //   }
  // }, [submitStatus]);

  // 기능: 슬라이드 선택 (모바일)
  function selectSlide() {
    if (!isMobileSize) return;
    if (isDragging) return;
    // if (submitError) return;
    // if (categoryId === 0) {
    //   getSelectedListId({ selectedListId: order.id });
    // }

    clickSlide((prev) => !prev);
  }

  return {
    isDragging,
    setDragState,
    isSlideClicked,
    isMobileSize,
    selectSlide,
  };
}
