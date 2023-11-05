export const getCoords = (elem: HTMLElement): { top: number; left: number; width: number; height: number } => {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.scrollY,
    left: box.left + window.scrollX,
    width: box.width,
    height: box.height,
  };
};
