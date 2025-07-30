/**
 * 반응형 최소 너비, 높이 기반으로 모바일 화면 감지
 * @returns {boolean} 모바일 사이즈인 경우 true, 그렇지 않은 경우 false 반환
 */
export function detectMobileSize(): boolean {
  const isMobile = window.screen.availHeight < 768 || window.screen.availHeight < 1024;
  return isMobile;
}

/**
 * 현재 뷰포트가 가로 모드인지 확인
 * @returns {boolean} 가로 모드인 경우 true, 그렇지 않은 경우 false 반환
 */
export function detectLandscapeViewport(): boolean {
  // matchMedia API를 사용하여 뷰포트의 방향을 확인
  const isLandscape = window.matchMedia('(orientation: landscape)').matches;

  return isLandscape;
}

/**
 * 화면의 현재 방향 유형을 반환
 * @returns {ScreenOrientation['type']} 화면 방향 유형 (예: 'portrait-primary', 'landscape-primary').
 */
export function detectViewportMode(): ScreenOrientation['type'] {
  const viewType = screen.orientation.type;

  return viewType;
}
