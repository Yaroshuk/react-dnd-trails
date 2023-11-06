interface IDragItem {
  id: string;
  x?: number;
  y?: number;
  color?: string;
}

interface IDragContext {
  draggingBlockId: string | null;
  setItem: (id: string, element: HTMLElement) => void;
  startDragging: (id: string, shiftX?: number, shiftY?: number) => void;
  stopDragging: (id: string) => void;
}
