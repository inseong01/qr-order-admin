export function detectMobile() {
  const userAgent = navigator.userAgent;
  const isMobile = /android|iPhone|iPad|CrOS/i.test(userAgent);
  console.log('userAgent: ', userAgent, 'isMobile: ', isMobile);
  return isMobile;
}

export function detectLandscapeViewport() {
  const isLandscape = window.matchMedia('(orientation: landscape)').matches;

  return isLandscape;
}

export function detectViewportMode() {
  const viewType = screen.orientation.type;

  return viewType;
}
