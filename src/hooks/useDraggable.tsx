import { useCallback, useContext } from "react";

export const useDraggable = (context: React.Context<IDragContext>, id: string) => {
  const { setItem, draggingBlockId, startDragging: startDraggingHandler, stopDragging: stopDraggingHandler } = useContext<IDragContext>(context);

  const initDraggable = useCallback(
    (element: HTMLElement) => {
      setItem(id, element);
    },
    [id, setItem]
  );

  const isDragging = id === draggingBlockId;

  const startDragging = (shiftX?: number, shiftY?: number) => startDraggingHandler(id, shiftX, shiftY);

  const stopDragging = () => stopDraggingHandler(id);

  return { initDraggable, startDragging, stopDragging, isDragging };
};
