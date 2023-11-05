import React, { MouseEventHandler, useCallback, useEffect, useRef } from "react";
import "./styles.scss";
import { getCoords } from "../../helpers";

interface BlockProps {
  id: string;
  isDragging: boolean;
  onStartDragging: (id: string, shiftX: number, shiftY: number) => void;
  onStopDragging: () => void;
  init: (item: HTMLDivElement) => void;
  color?: string;
  x?: number;
  y?: number;
}

export const Block = ({ id, isDragging, onStartDragging, onStopDragging, init, color = "#ccc", x = 0, y = 0 }: BlockProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMouseDownHandler = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;

      var coords = getCoords(ref.current);

      const shiftX = event.pageX - coords.left;
      const shiftY = event.pageY - coords.top;

      onStartDragging(id, shiftX, shiftY);
    },
    [id, ref, onStartDragging]
  );

  useEffect(() => {
    if (!ref.current) return;

    init(ref.current);
  }, [ref, init]);

  return (
    <div
      className={`block ${isDragging ? "block--drag" : ""}`}
      style={{ background: color, left: x, top: y }}
      onMouseDown={onMouseDownHandler}
      onMouseUp={onStopDragging}
      ref={ref}
    />
  );
};
