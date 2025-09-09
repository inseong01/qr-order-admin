import Konva from 'konva';
import { Rect } from 'konva/lib/shapes/Rect';
import { Text } from 'konva/lib/shapes/Text';

/**
 * Konva Layer에 페이드 인 또는 페이드 아웃 애니메이션을 생성합니다.
 *
 * @param ref - 애니메이션을 적용할 Konva Layer 참조
 * @param isVisible - true: opacity 1, false: opacity 0
 * @returns Konva.Tween 인스턴스 반환
 */
export function fadeBackgroundLayer(ref: Rect | Text, isVisible: boolean) {
  return new Konva.Tween({
    node: ref,
    duration: 0.5,
    opacity: isVisible ? 1 : 0,
    easing: Konva.Easings.EaseInOut,
  });
}
