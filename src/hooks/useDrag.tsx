import { ReactNode, createContext, useState, useRef, useMemo, useCallback } from "react";
import { DragArea } from "../components/DragArea";

export const useDrag = () => {
  const DragContext = createContext<IDragContext>({
    draggingBlockId: null,
    setDraggingBlockId: (id: string | null) => {},
    setItem: (id: string, element: HTMLElement) => {},
  });

  const DragContainer = useCallback(
    ({ children }: { children: ReactNode }) => {
      return <DragArea ContextProvider={DragContext.Provider}>{children}</DragArea>;
    },
    [DragContext]
  );

  return { DragContainer, DragContext };
};
