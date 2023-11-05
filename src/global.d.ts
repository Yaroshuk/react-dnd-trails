interface IDragItem {
  id: string;
  x?: number;
  y?: number;
  color?: string;
}

interface IDragContext {
  draggingBlockId: string | null,
  setDraggingBlockId: (id: string | null) => void,
  setItem: (id: string, element: HTMLElement) => void,
}