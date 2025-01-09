import { useState } from "react";

export default function useScroll(ref) {
  const [scrollStart, geScrollX] = useState({});

  // 카테고리 드래그 이동
  function onDrag(e) {
    const lastPosX = e.clientX;
    const move = lastPosX - scrollStart.x;
    const slider = ref.current;
    // 드래그 이동 계산
    const newScrollLeft = scrollStart.scrollX - move;
    const maxScrollLeft = slider.scrollWidth - slider.offsetWidth;
    const scrollAmount = Math.max(0, Math.min(newScrollLeft, maxScrollLeft));
    // 드래그 이동
    ref.current.scrollLeft = scrollAmount
  }

  // 드래그 시작
  function onDragStart(e) {
    geScrollX({ x: e.clientX, scrollX: ref.current.scrollLeft });
    // 드래그 사진 잔상 투명화
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    e.dataTransfer.setDragImage(img, 0, 0);
  }

  return { onDrag, onDragStart, scrollStart, geScrollX }
}