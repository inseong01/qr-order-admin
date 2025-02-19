import { measureCallbackCount } from '../function/measureCallbackCount';

import { DragEvent, RefObject, useState } from 'react';

export default function useScroll(ref: RefObject<HTMLUListElement | null>) {
  const [scrollStart, geScrollX] = useState({ x: 0, scrollX: 0 });

  // 카테고리 드래그 이동
  function onDrag(e: DragEvent<HTMLUListElement> | null) {
    // ref, e null 방지
    if (!ref?.current || !e) return;
    const slider = ref.current;
    const lastPosX = e.clientX;
    const move = lastPosX - scrollStart.x;
    // 드래그 이동 계산
    const newScrollLeft = scrollStart.scrollX - move;
    const maxScrollLeft = slider.scrollWidth - slider.offsetWidth;
    const scrollAmount = Math.max(0, Math.min(newScrollLeft, maxScrollLeft));
    // 드래그 이동
    slider.scrollLeft = scrollAmount;
  }

  // 드래그 시작
  function onDragStart(e: DragEvent<HTMLUListElement> | null) {
    // ref, e null 방지
    if (!ref?.current || !e) return;
    // throttle 측정 시작
    if (import.meta.env.DEV) {
      // 60fps 지향, delay는 최대 16.666ms
      measureCallbackCount(0, 15);
    }
    geScrollX({ x: e.clientX, scrollX: ref.current.scrollLeft });
    // 드래그 사진 잔상 투명화
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    e.dataTransfer.setDragImage(img, 0, 0);
  }

  return { onDrag, onDragStart, scrollStart, geScrollX };
}
