import React, { useState, useEffect, useRef } from "react";
import ReactFlow, { Background, MiniMap } from "react-flow-renderer";
import { useTheme } from "emotion-theming";
import { rgba } from "emotion-rgba";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/draggables";
import Tool from "./Tool";

const elements = [
  { id: "1", data: { label: "Node 1" }, position: { x: 240, y: 0 } },
  // you can also pass a React component as a label
  { id: "2", data: { label: <div>Node 2</div> }, position: { x: 100, y: 100 } },
  { id: "e1-2", source: "1", target: "2", animated: true },
];

const FloorMapContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  /* background-color: red; */

  /* VERY IMPORTANT LINE: */
  /* ensures that the right margin is accounted for it overflows */
  display: inline-block;
`;

const BoardWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  background-color: #fff;
  position: relative;
`;

const opacityStyle = css`
  background-color: blue;
`;

const Board = ({ offset = { x: 0, y: 0 }, ...props }) => {
  const [items, setItems] = useState([]);

  const [endDropCoords, setEndDropCoords] = useState({ x: 0, y: 0 });
  const [{ item, isOver, didDrop, ...addedProps }, drop] = useDrop({
    accept: ItemTypes.TOOL,
    hover: (item, monitor) => {
      const fin = monitor.getClientOffset();

      const diffX = Math.abs(endDropCoords.x - fin.x);
      const diffY = Math.abs(endDropCoords.y - fin.y);

      if (diffX > 5 || diffY > 5) {
        setEndDropCoords({ x: fin.x - offset.x, y: fin.y - offset.y });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      didDrop: monitor.didDrop(),
      item: monitor.getItem(),
    }),
  });

  useEffect(() => {
    console.log("hel", didDrop, item);

    if (item) {
      if (item.data.dropped) {
        const minusItemArray = items.filter(
          (f_i, i) => item.data.id !== f_i.id
        );
        const updatedItem = {
          id: item.data.id,
          data: item.data.data,
          coordinates: endDropCoords,
          dropped: true,
        };

        setItems([...minusItemArray, updatedItem]);
      } else {
        const newItem = {
          id: Math.random(),
          data: item.data.data,
          coordinates: endDropCoords,
          dropped: true,
        };
        console.log("newItem", newItem);
        setItems([...items, newItem]);
      }
    }
  }, [didDrop]);

  return (
    <BoardWrapper
      ref={drop}
      css={isOver ? opacityStyle : null}
      onClick={() => {
        console.log("items", items);
      }}
    >
      {items.map((item, i) => (
        <Tool key={i} info={item} />
      ))}
    </BoardWrapper>
  );
};

const FloorMap = () => {
  const fmRef = useRef();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const theme = useTheme();

  useEffect(() => {
    if (fmRef) {
      const offsetBounds = fmRef.current.getBoundingClientRect();
      console.log(offsetBounds);
      setOffset({ x: offsetBounds.x, y: offsetBounds.y });
    }
  }, [fmRef]);
  return (
    <FloorMapContainer ref={fmRef}>
      {/* <Board offset={offset}></Board> */}
      <ReactFlow
        elements={elements}
        snapToGrid
        snapGrid={[20, 20]}
        // translateExtent={[
        //   [0, 0],
        //   [500, 500],
        // ]}
      >
        <Background
          variant="dots"
          gap={20}
          size={4}
          color={rgba(theme.colors.onBackground, 0.3)}
          size={1}
        />

        <MiniMap
          nodeColor={(node) => {
            switch (node.type) {
              case "input":
                return "red";
              case "default":
                return "#00ff00";
              case "output":
                return "rgb(0,0,255)";
              default:
                return "#eee";
            }
          }}
        />
      </ReactFlow>
    </FloorMapContainer>
  );
};

export default FloorMap;
