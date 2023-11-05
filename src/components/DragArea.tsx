import { useState, useEffect, useRef } from "react";
import "./DragArea.scss";
import { DragItem } from "./DragItem";
import { getCoords } from "../../src/helpers";

interface DragAreaProps {
  itemsData: IDragItem[];
}

export const DragArea = ({ itemsData }: DragAreaProps) => {
  const [draggingBlockId, setDraggingBlockId] = useState<string | null>("");

  const itemsRef = useRef<Record<string, HTMLElement>>({});

  const containerRef = useRef<HTMLDivElement | null>(null);

  const startDraggingHandler = (id: string) => {
    setDraggingBlockId(id);
  };

  const stopDraggingHandler = (id: string) => {
    if (id !== draggingBlockId) return;

    setDraggingBlockId(null);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const moveBlock = (event: MouseEvent) => {
      if (!draggingBlockId) return;

      const element = itemsRef.current[draggingBlockId];

      const conrainerCords = getCoords(containerRef.current!);
      const elementCords = getCoords(element);

      let elementNewLeft = event.pageX - conrainerCords.left - itemsRef.current[draggingBlockId].offsetWidth / 2;
      let elementNewTop = event.pageY - conrainerCords.top - itemsRef.current[draggingBlockId].offsetHeight / 2;

      elementNewTop = elementNewTop < 0 ? 0 : elementNewTop;
      elementNewLeft = elementNewLeft < 0 ? 0 : elementNewLeft;

      elementNewTop = elementNewTop > conrainerCords.height - elementCords.height ? conrainerCords.height - elementCords.height : elementNewTop;
      elementNewLeft = elementNewLeft > conrainerCords.width - elementCords.width ? conrainerCords.width - elementCords.width : elementNewLeft;

      //elementNewLeft = elementNewLeft < conrainerCords.left ? conrainerCords.left : elementNewLeft;

      element.style.left = elementNewLeft + "px";
      element.style.top = elementNewTop + "px";

      console.log(elementCords, conrainerCords);
    };

    const mouseMoveHandler = (event: MouseEvent) => {
      console.log("move");
      moveBlock(event);
      event.stopPropagation();
      event.stopImmediatePropagation();
      return false;
    };

    document.addEventListener("mousemove", mouseMoveHandler, true);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler, true);
    };
  }, [draggingBlockId]);

  const renderItems = () => {
    return itemsData.map(({ id, color, x, y }: IDragItem) => {
      return (
        <DragItem
          key={id}
          id={id}
          color={color}
          x={x}
          y={y}
          onStartDragging={startDraggingHandler}
          onStopDragging={stopDraggingHandler}
          isDragging
          ref={(element: HTMLElement) => {
            console.log("fff");
            itemsRef.current = { ...itemsRef.current, [id]: element };
          }}
        />
      );
    });
  };

  return (
    <div className="drag-area" ref={containerRef}>
      {renderItems()}
    </div>
  );
};
