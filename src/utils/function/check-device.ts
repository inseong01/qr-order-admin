/**
 * 반응형 최소 너비, 높이 기반으로 모바일 화면 감지
 * @returns true(모바일 사이즈), false(그 외)
 */
export function detectMobileSize(): boolean {
  const isMobile = window.screen.availHeight < 720 || window.screen.availWidth < 1024;
  return isMobile;
}

/**
 * 화면의 현재 방향 유형을 반환
 * @returns 'portrait-primary', 'landscape-primary'
 */
export function detectViewportMode(): ScreenOrientation['type'] {
  const viewType = screen.orientation.type;

  return viewType;
}
