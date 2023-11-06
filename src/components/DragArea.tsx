import { useState, useEffect, useRef, ReactNode, Context, Provider, useContext, useCallback } from "react";
import { useDispatch } from "react-redux";
import "./DragArea.scss";
import { DragItem } from "./DragItem";
import { getCoords } from "../../src/helpers";
import { removeMouseLine } from "../../src/store/reducer";

interface DragAreaProps {
  itemsData?: IDragItem[];
  children?: ReactNode;
  ContextProvider: React.Provider<IDragContext>;
}

export const DragArea = ({ children, ContextProvider }: DragAreaProps) => {
  const [draggingBlockId, setDraggingBlockId] = useState<string | null>("");
  const [draggingShiftX, setDraggingShiftX] = useState<number>(0);
  const [draggingShiftY, setDraggingShiftY] = useState<number>(0);

  const itemsRef = useRef<Record<string, HTMLElement>>({});

  const containerRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch()

  const startDraggingHandler = (id: string, shiftX: number = 0, shiftY: number = 0) => {
    console.log("1111", id);
    setDraggingBlockId(id);
    setDraggingShiftX(shiftX);
    setDraggingShiftY(shiftY);
  };

  const stopDraggingHandler = (id: string) => {
    if (id !== draggingBlockId) return;

    setDraggingBlockId(null);
    setDraggingShiftX(0);
    setDraggingShiftY(0);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const moveBlock = (event: MouseEvent) => {
      if (!draggingBlockId) return;

      const element = itemsRef.current[draggingBlockId];

      if (!element) return;

      const conrainerCords = getCoords(container);
      const elementCords = getCoords(element);

      let elementNewLeft = event.pageX - conrainerCords.left - draggingShiftX - 4; //TODO: fix 4
      let elementNewTop = event.pageY - conrainerCords.top - draggingShiftY - 4;

      elementNewTop = elementNewTop < 0 ? 0 : elementNewTop;
      elementNewLeft = elementNewLeft < 0 ? 0 : elementNewLeft;

      elementNewTop = elementNewTop > container.clientHeight - elementCords.height ? container.clientHeight - elementCords.height : elementNewTop;
      elementNewLeft = elementNewLeft > container.clientHeight - elementCords.width ? container.clientHeight - elementCords.width : elementNewLeft;
      //elementNewLeft = elementNewLeft < conrainerCords.left ? conrainerCords.left : elementNewLeft;

      element.style.left = elementNewLeft + "px";
      element.style.top = elementNewTop + "px";
    };

    const mouseMoveHandler = (event: MouseEvent) => {
      moveBlock(event);
    };

    const mouseUpHandler = (event: MouseEvent) => {
      if (draggingBlockId) {
        setDraggingBlockId(null);
      }

      dispatch(removeMouseLine())
    };

    document.addEventListener("mousemove", mouseMoveHandler);

    document.addEventListener("mouseup", mouseUpHandler);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [draggingBlockId, draggingShiftX, draggingShiftY]);

  const setItem = useCallback((id: string, element: HTMLElement) => {
    itemsRef.current = { ...itemsRef.current, [id]: element };
  }, []);

  const contextProps = {
    draggingBlockId,
    setItem,
    startDragging: startDraggingHandler,
    stopDragging: stopDraggingHandler,
  };

  return (
    <div className="drag-area" ref={containerRef}>
      <ContextProvider value={contextProps}>{children}</ContextProvider>
    </div>
  );
};
