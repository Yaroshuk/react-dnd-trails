export const getCoords = (elem: HTMLElement): { top: number; left: number } => {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + window.scrollY,
    left: box.left + window.scrollX,
  };
};
