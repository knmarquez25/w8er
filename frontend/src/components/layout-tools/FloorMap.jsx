import React, { useState, useEffect, useRef } from "react";
import ReactFlow, { Background, MiniMap } from "react-flow-renderer";
import { useTheme } from "emotion-theming";
import { rgba } from "emotion-rgba";
import useResizeObserver from "use-resize-observer";
import { HiUser } from "react-icons/hi";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/draggables";
import Tool from "./Tool";
import ToolNode, {
  Square,
  Circle,
  Diamond,
  Lshape,
} from "../layout-tools/ToolNode";

const shortid = require("shortid");

const elements = [
  {
    type: "diamond",
    id: shortid.generate(),
    data: { label: "3" },
    position: { x: 0, y: 0 },
  },
  {
    type: "circle",
    id: shortid.generate(),
    data: { label: "a" },
    position: { x: 240, y: 0 },
  },
  // you can also pass a React component as a label
  {
    type: "lshape",
    id: shortid.generate(),
    data: { label: <div>b</div> },
    position: { x: 60, y: 40 },
  },
  {
    type: "square",
    id: shortid.generate(),
    data: { label: <div>c</div> },
    position: { x: -40, y: 80 },
  },
  {
    type: "circle",
    id: shortid.generate(),
    data: { label: <div>d</div> },
    position: { x: 120, y: 220 },
  },
  {
    type: "square",
    id: shortid.generate(),
    data: { label: <div>d</div> },
    position: { x: 120, y: 220 },
  },

  // { id: "e1-2", source: "1", target: "2", animated: true },
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

const DropTarget = styled.div`
  width: 100%;
  height: 100%;
`;

const nodeTypes = {
  square: Square,
  circle: Circle,
  diamond: Diamond,
  lshape: Lshape,
  test: HiUser,
};

const FloorMap = () => {
  const [reactFlow, setReactFlow] = useState({});
  const theme = useTheme();
  const fmRef = useResizeObserver();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [items, setItems] = useState(elements);
  const [endDropCoords, setEndDropCoords] = useState({ x: 0, y: 0 });

  const [{ item, isOver, didDrop, ...addedProps }, drop] = useDrop({
    accept: ItemTypes.TOOL,
    // hover: (item, monitor) => {
    //   const fin = monitor.getClientOffset();

    //   const diffX = Math.abs(endDropCoords.x - fin.x);
    //   const diffY = Math.abs(endDropCoords.y - fin.y);

    //   if (diffX > 5 || diffY > 5) {
    //     setEndDropCoords({ x: fin.x - offset.x, y: fin.y - offset.y });
    //   }
    // },
    collect: (monitor, componen) => ({
      isOver: monitor.isOver(),
      didDrop: monitor.didDrop(),
      item: monitor.getItem(),
    }),
    drop: (props, monitor, component) => {
      const fin = monitor.getClientOffset();

      // const diffX = Math.abs(endDropCoords.x - fin.x);
      // const diffY = Math.abs(endDropCoords.y - fin.y);

      // if (diffX > 5 || diffY > 5) {
      setEndDropCoords({ x: fin.x - offset.x, y: fin.y - offset.y });
      // }
    },
  });

  useEffect(() => {
    console.log("didDrop", didDrop, item);
    if (item) {
      const newItem = {
        type: item.data.data.type,
        id: shortid.generate(),
        data: item.data.data,
        position: reactFlow.project(endDropCoords),
      };
      console.log("newItem", newItem);
      setItems([...items, newItem]);
    }
  }, [didDrop]);

  useEffect(() => {
    console.log("isOver", isOver, item);
  }, [isOver]);

  useEffect(() => {
    if (fmRef) {
      const { x, y } = fmRef.ref.current.getBoundingClientRect();
      setOffset({ x, y });
    }
  }, [fmRef]);

  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
    reactFlowInstance.zoomTo(1);
    setReactFlow(reactFlowInstance);
  };

  return (
    <FloorMapContainer ref={fmRef.ref}>
      <DropTarget ref={drop}>
        <ReactFlow
          onLoad={onLoad}
          elements={items}
          snapToGrid
          nodeTypes={nodeTypes}
          snapGrid={[theme.dimensions.gridUnit, theme.dimensions.gridUnit]}
          // translateExtent={[
          //   [0, 0],
          //   [500, 500],
          // ]}
        >
          <Background
            variant="dots"
            gap={theme.dimensions.gridUnit}
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
      </DropTarget>
    </FloorMapContainer>
  );
};

export default FloorMap;
