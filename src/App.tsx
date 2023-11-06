import React from "react";
import "./App.scss";
import { DragItem } from "./components/DragItem";
import { useDrag } from "./hooks/useDrag";
import { COLOR } from "./constants";

const blockArray = [
  {
    id: "1",
    x: 200,
    y: 200,
    color: COLOR.blue,
  },
  {
    id: "2",
    x: 150,
    color: COLOR.orange,
  },
  {
    id: "3",
    color: COLOR.yellow,
  },
];

function App() {
  const renderItems = (context: any) => {
    return blockArray.map(({ id, color, x, y }: IDragItem) => {
      return <DragItem key={id} id={id} color={color} x={x} y={y} context={context} />;
    });
  };

  const { DragContainer, DragContext } = useDrag();

  return (
    <div className="App">
      <DragContainer>
        {renderItems(DragContext)}
        <canvas id="canvas" className="canvas" />
      </DragContainer>
    </div>
  );
}

export default App;
