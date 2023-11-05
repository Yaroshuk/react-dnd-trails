import React, { useState, useEffect, useReducer } from "react";
import "./App.scss";
import { DragItem } from "./components/DragItem";
import { useDrag } from "./hooks/useDrag";

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

function App() {
  const renderItems = (context: any) => {
    return blockArray.map(({ id, color, x, y }: IDragItem) => {
      return <DragItem key={id} id={id} color={color} x={x} y={y} context={context} />;
    });
  };

  const { DragContainer, DragContext } = useDrag();

  const { DragContainer: DragContainer2, DragContext: DragContext2 } = useDrag();

  return (
    <div className="App">
      <DragContainer2>{renderItems(DragContext2)}</DragContainer2>
      <DragContainer>{renderItems(DragContext)}</DragContainer>
    </div>
  );
}

export default App;
