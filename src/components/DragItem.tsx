import React, { useRef, useEffect, useCallback } from "react";
import "./DragItem.scss";
import { getCoords } from "../helpers";
import { useDraggable } from "../../src/hooks/useDraggable";

interface BlockProps {
  id: string;
  // isDragging: boolean;
  // onStartDragging: (id: string) => void;
  // onStopDragging: (id: string) => void;
  color?: string;
  x?: number;
  y?: number;
  context: any;
}

export const DragItem = ({ id, color = "#ccc", x = 0, y = 0, context }: BlockProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { initDraggable, startDragging, stopDragging, isDragging } = useDraggable(context, id);

  const onMouseDownHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      // //if (!ref.current) return;

      // var coords = getCoords(ref.current);

      // const shiftX = event.pageX - coords.left;
      // const shiftY = event.pageY - coords.top;

      startDragging();
    },
    [startDragging]
  );

  const onMouseUpHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      stopDragging();
    },
    [stopDragging]
  );

  useEffect(() => {
    if (!ref.current) return;

    initDraggable(ref.current);
  }, [ref, initDraggable]);

  return (
    <div
      className={`block ${isDragging ? "block--drag" : ""}`}
      style={{ background: color, left: x, top: y }}
      onMouseDown={onMouseDownHandler}
      onMouseUp={onMouseUpHandler}
      ref={ref}
    />
  );
};
