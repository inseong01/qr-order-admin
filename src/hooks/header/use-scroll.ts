import { DragEvent, RefObject, useState } from 'react';

import { measureCallbackCount } from '../../utils/function/measure-callback-count';

/**
 * 드래그로 스크롤하는 커스텀 훅
 * @param ref 스크롤을 적용할 요소의 RefObject
 */
export default function useScroll(ref: RefObject<HTMLUListElement | null>) {
  // 스크롤 시작 위치와 스크롤된 거리를 저장하는 상태
  const [scrollStart, setScrollStart] = useState({ x: 0, scrollX: 0 });

  /**
   * 드래그 중 스크롤을 처리하는 함수
   * @param e 드래그 이벤트 객체
   */
  const onDrag = (e: DragEvent<HTMLUListElement> | null) => {
    // ref나 event가 없으면 함수 종료
    if (!ref?.current || !e) return;

    const slider = ref.current;
    const lastPosX = e.clientX;
    const move = lastPosX - scrollStart.x;

    // 드래그 이동에 따른 새로운 스크롤 위치 계산
    const newScrollLeft = scrollStart.scrollX - move;
    const maxScrollLeft = slider.scrollWidth - slider.offsetWidth;
    const scrollAmount = Math.max(0, Math.min(newScrollLeft, maxScrollLeft));

    // 계산된 양만큼 스크롤 이동
    slider.scrollLeft = scrollAmount;
  };

  /**
   * 드래그 시작 시 호출되는 함수
   * @param e 드래그 이벤트 객체
   */
  const onDragStart = (e: DragEvent<HTMLUListElement> | null) => {
    // ref나 event가 없으면 함수 종료
    if (!ref?.current || !e) return;

    // 개발 환경에서 throttle 측정 시작 (60fps 목표)
    if (import.meta.env.DEV) {
      measureCallbackCount(0, 15);
    }

    // 드래그 시작 위치와 현재 스크롤 위치 저장
    setScrollStart({ x: e.clientX, scrollX: ref.current.scrollLeft });

    // 드래그 시 나타나는 기본 이미지 숨기기
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  return { onDrag, onDragStart };
}
