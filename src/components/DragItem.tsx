import React, { useRef, useEffect, useCallback } from "react";
import "./DragItem.scss";
import { getCoords } from "../helpers";
import { useDraggable } from "../../src/hooks/useDraggable";

interface BlockProps {
  id: string;
  color?: string;
  x?: number;
  y?: number;
  context: any;
}

const mainClass = "block";

export const DragItem = ({ id, color = "#ccc", x = 0, y = 0, context }: BlockProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { initDraggable, startDragging, stopDragging, isDragging } = useDraggable(context, id);

  const onMouseDownHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {

      const target = event.target as HTMLDivElement;
      const span = target.closest('span');

      if(!span) return;

      if (!ref.current) return;

      var coords = getCoords(ref.current);

      const shiftX = event.pageX - coords.left;
      const shiftY = event.pageY - coords.top;

      startDragging(shiftX, shiftY);
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
      className={`${mainClass} ${isDragging ? `${mainClass}--drag` : ""}`}
      style={{ background: color, left: x, top: y }}
      onMouseUp={onMouseUpHandler}
      onMouseDown={onMouseDownHandler}
      ref={ref}
    >
      <span className={`${mainClass}__head`} />
    </div>
  );
};
