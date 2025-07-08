/**
 * 사용자의 User Agent를 기반으로 모바일 장치 여부를 확인합니다.
 * @returns {boolean} 모바일 장치인 경우 true, 그렇지 않은 경우 false를 반환합니다.
 */
export function detectMobile(): boolean {
  const userAgent = navigator.userAgent;
  // 정규 표현식을 사용하여 주요 모바일 운영체제 키워드를 확인합니다.
  const isMobile = /Android|iPhone|iPad|CrOS/i.test(userAgent);

  return isMobile;
}

/**
 * 현재 뷰포트가 가로 모드인지 확인합니다.
 * @returns {boolean} 가로 모드인 경우 true, 그렇지 않은 경우 false를 반환합니다.
 */
export function detectLandscapeViewport(): boolean {
  // matchMedia API를 사용하여 뷰포트의 방향을 확인합니다.
  const isLandscape = window.matchMedia('(orientation: landscape)').matches;

  return isLandscape;
}

/**
 * 화면의 현재 방향 유형을 반환합니다.
 * @returns {ScreenOrientation['type']} 화면 방향 유형 (예: 'portrait-primary', 'landscape-primary').
 */
export function detectViewportMode(): ScreenOrientation['type'] {
  const viewType = screen.orientation.type;

  return viewType;
}