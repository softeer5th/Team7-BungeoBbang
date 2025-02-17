export const updateThemeColor = (color: string) => {
  // meta 태그 업데이트
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', color);
  }

  // PWA 매니페스트 업데이트
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.active?.postMessage({
        type: 'UPDATE_THEME_COLOR',
        color: color,
      });
    });
  }
};
