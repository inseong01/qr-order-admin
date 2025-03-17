export function detectMobile() {
  const userAgent = navigator.userAgent;
  const isMobile = /android|iPhone|iPad|CrOS/i.test(userAgent);

  return isMobile;
}

export function detectLandscapeViewport() {
  const isLandscape = window.matchMedia('(orientation: landscape)').matches;

  return isLandscape;
}
