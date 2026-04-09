/**
 * Whether the app should refuse to run (phones / tablets).
 * Heuristic: common mobile UA tokens plus iPadOS 13+ Safari “desktop” mode.
 */
export function isMobileClient() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
  ) {
    return true;
  }
  const platform = navigator.platform || "";
  const maxTouch =
    typeof navigator.maxTouchPoints === "number"
      ? navigator.maxTouchPoints
      : 0;
  if (platform === "MacIntel" && maxTouch > 1) {
    return true;
  }
  return false;
}
