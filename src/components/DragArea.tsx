import { useState, useEffect, useRef, ReactNode, Context, Provider, useContext, useCallback } from "react";
import "./DragArea.scss";
import { DragItem } from "./DragItem";
import { getCoords } from "../../src/helpers";

interface DragAreaProps {
  itemsData?: IDragItem[];
  children?: ReactNode;
  ContextProvider: React.Provider<IDragContext>;
}

export const DragArea = ({ children, ContextProvider }: DragAreaProps) => {
  const [draggingBlockId, setDraggingBlockId] = useState<string | null>("");
  const itemsRef = useRef<Record<string, HTMLElement>>({});

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const moveBlock = (event: MouseEvent) => {
      if (!draggingBlockId) return;

      const element = itemsRef.current[draggingBlockId];

      if (!element) return;

      const conrainerCords = getCoords(container);
      const elementCords = getCoords(element);

      let elementNewLeft = event.pageX - conrainerCords.left - element.offsetWidth / 2;
      let elementNewTop = event.pageY - conrainerCords.top - element.offsetHeight / 2;

      elementNewTop = elementNewTop < 0 ? 0 : elementNewTop;
      elementNewLeft = elementNewLeft < 0 ? 0 : elementNewLeft;

      elementNewTop = elementNewTop > conrainerCords.height - elementCords.height ? conrainerCords.height - elementCords.height : elementNewTop;
      elementNewLeft = elementNewLeft > conrainerCords.width - elementCords.width ? conrainerCords.width - elementCords.width : elementNewLeft;

      //elementNewLeft = elementNewLeft < conrainerCords.left ? conrainerCords.left : elementNewLeft;

      element.style.left = elementNewLeft + "px";
      element.style.top = elementNewTop + "px";
    };

    const mouseMoveHandler = (event: MouseEvent) => {
      moveBlock(event);
    };

    document.addEventListener("mousemove", mouseMoveHandler, true);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler, true);
    };
  }, [draggingBlockId]);

  const setItem = useCallback((id: string, element: HTMLElement) => {
    itemsRef.current = { ...itemsRef.current, [id]: element };
  }, []);

  const contextProps = {
    draggingBlockId,
    setDraggingBlockId,
    setItem,
  };

  return (
    <div className="drag-area" ref={containerRef}>
      <ContextProvider value={contextProps}>{children}</ContextProvider>
    </div>
  );
};
