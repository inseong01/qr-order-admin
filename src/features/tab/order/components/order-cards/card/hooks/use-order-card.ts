import { useState } from 'react';
import { Order } from '@/lib/supabase/function/order';

export function useOrderCard(order: Order) {
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
