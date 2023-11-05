import React, { ForwardedRef, forwardRef, useCallback, useEffect } from "react";
import "./DragItem.scss";
import { getCoords } from "../helpers";

interface BlockProps {
  id: string;
  isDragging: boolean;
  onStartDragging: (id: string) => void;
  onStopDragging: (id: string) => void;
  //onInit: (item: HTMLDivElement) => void;
  color?: string;
  x?: number;
  y?: number;
}

export const DragItem = forwardRef(({ id, isDragging, onStartDragging, onStopDragging, color = "#ccc", x = 0, y = 0 }: BlockProps, forwardRef: any) => {
  const onMouseDownHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      // //if (!ref.current) return;

      // var coords = getCoords(ref.current);

      // const shiftX = event.pageX - coords.left;
      // const shiftY = event.pageY - coords.top;

      onStartDragging(id);
    },
    [id, onStartDragging]
  );

  const onMouseUpHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {


      onStopDragging(id);
    },
    [id, onStopDragging]
  );

  // useEffect(() => {
  //   if (!ref.current) return;

  //   init(ref.current);
  // }, [ref, init]);

  return (
    <div
      className={`block ${isDragging ? "block--drag" : ""}`}
      style={{ background: color, left: x, top: y }}
      onMouseDown={onMouseDownHandler}
      onMouseUp={onMouseUpHandler}
      ref={forwardRef}
    />
  );
});
