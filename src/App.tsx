import React, { useState, useEffect, useReducer } from "react";
import "./App.scss";
import { Block } from "./components/Block";

const blockArray = [
  {
    id: "1",
    x: 200,
    y: 200,
    color: "red",
  },
  {
    id: "2",
    x: 150,
    color: "blue",
  },
  {
    id: "3",
    color: "green",
  },
];

interface IAction {
  type: string;
  id: string;
  element: HTMLDivElement;
}

interface IState {
  [id: string]: HTMLDivElement;
}

function reducer(state: IState, action: IAction) {
  if (action.type === "add_element") {
    state[action.id] = action.element;
  }

  return state;
}

function App() {
  const [draggingBlock, setDraggingBlock] = useState<string | null>(null);
  const [blockShiftX, setBlockShiftX] = useState<number>(0);
  const [blockShiftY, setBlockShiftY] = useState<number>(0);

  const [state, dispatch] = useReducer(reducer, {});

  const startDraggingHandler = (id: string, shiftX: number, shiftY: number) => {
    setDraggingBlock(id);
    setBlockShiftX(shiftX);
    setBlockShiftY(shiftY);
  };

  const stopDraggingHandler = (id: string) => {
    if (id !== draggingBlock) return;

    setDraggingBlock(null);
    setBlockShiftX(0);
    setBlockShiftY(0);
  };

  const blockInitHandler = (id: string, element: HTMLDivElement) => {
    dispatch({ type: "add_element", id, element });
  };

  useEffect(() => {
    const moveBlock = (event: MouseEvent) => {
      if (!draggingBlock) return;

      const element = state[draggingBlock];

      element.style.left = event.pageX - blockShiftX + "px";
      element.style.top = event.pageY - blockShiftY + "px";
    };

    const mouseMoveHandler = (event: MouseEvent) => {
      moveBlock(event);
    };

    document.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [draggingBlock, state, blockShiftX, blockShiftY]);

  const blockRender = () => {
    return blockArray.map(({ id, color, x, y }) => {
      return (
        <Block
          key={id}
          id={id}
          isDragging={id === draggingBlock}
          onStartDragging={startDraggingHandler}
          onStopDragging={() => stopDraggingHandler(id)}
          init={(element: HTMLDivElement) => blockInitHandler(id, element)}
          color={color}
          x={x}
          y={y}
        />
      );
    });
  };

  return <div className="App">{blockRender()}</div>;
}

export default App;
