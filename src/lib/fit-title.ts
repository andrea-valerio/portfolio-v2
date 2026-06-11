export function fitTitleToWidth(
  titleEl: HTMLElement,
  wrapWidth: number,
  maxPx: number,
  minPx: number,
) {
  titleEl.style.removeProperty("overflow");
  titleEl.style.removeProperty("text-overflow");

  titleEl.style.fontSize = `${maxPx}px`;
  if (titleEl.scrollWidth <= wrapWidth) return;

  let lo = minPx;
  let hi = maxPx;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    titleEl.style.fontSize = `${mid}px`;
    if (titleEl.scrollWidth <= wrapWidth) lo = mid;
    else hi = mid;
  }
  titleEl.style.fontSize = `${lo}px`;

  if (titleEl.scrollWidth > titleEl.clientWidth) {
    titleEl.style.overflow = "hidden";
    titleEl.style.textOverflow = "ellipsis";
  }
}
