export function detectMobile() {
  const userAgent = navigator.userAgent;
  const isMobile = /Android|iPhone|iPad|CrOS/i.test(userAgent);
  console.log('userAgent: ', userAgent);
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
