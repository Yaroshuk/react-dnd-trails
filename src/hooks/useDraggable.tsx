import { useCallback, useContext } from "react";

export const useDraggable = (context: React.Context<IDragContext>, id: string) => {
  const { setItem, setDraggingBlockId, draggingBlockId } = useContext<IDragContext>(context);

  const initDraggable = useCallback(
    (element: HTMLElement) => {
      setItem(id, element);
    },
    [id, setItem]
  );

  const startDragging = () => setDraggingBlockId(id);

  const stopDragging = () => {
    if (draggingBlockId === id) {
      setDraggingBlockId(null);
    }
  };

  const isDragging = id === draggingBlockId;

  return { initDraggable, startDragging, stopDragging, isDragging };
};
