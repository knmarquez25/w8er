import React, { useState, useEffect, useRef } from "react";
import ReactFlow, { Background, MiniMap } from "react-flow-renderer";
import { useTheme } from "emotion-theming";
import { rgba } from "emotion-rgba";
import { HiUser } from "react-icons/hi";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import {
  Square,
  Circle,
  HalfCircle,
  Lshape,
  Rectangle,
  Triangle,
} from "../components/layout-tools/ToolNodeEdit";

const shortid = require("shortid");

export const DEFAULT_NODE_DATA = {
  rotateAngle: 0,
  size: { height: 60, width: 60 },
  label: "",
};

// const elements = [
//   {
//     type: "halfCircle",
//     id: shortid.generate(),
//     data: { ...DEFAULT_NODE_DATA, label: "12", rotateAngle: 30 },
//     position: { x: -25, y: 50 },
//   },
//   {
//     type: "circle",
//     id: shortid.generate(),
//     data: { ...DEFAULT_NODE_DATA, label: "B" },
//     position: { x: 0, y: 0 },
//   },
//   {
//     type: "lshape",
//     id: shortid.generate(),
//     data: { label: "F", size: { width: 120, height: 120 }, rotateAngle: 0 },
//     position: { x: 0, y: 0 },
//   },
//   {
//     type: "square",
//     id: shortid.generate(),
//     data: { ...DEFAULT_NODE_DATA, label: "T5" },
//     position: { x: 0, y: 0 },
//   },
//   {
//     type: "rectangle",
//     id: shortid.generate(),
//     data: { ...DEFAULT_NODE_DATA, label: "A4" },
//     position: { x: 0, y: 0 },
//   },
//   {
//     type: "square",
//     id: shortid.generate(),
//     data: { ...DEFAULT_NODE_DATA, label: "F5" },
//     position: { x: 0, y: 0 },
//   },

//   {
//     type: "triangle",
//     id: shortid.generate(),
//     data: { ...DEFAULT_NODE_DATA, label: "B5" },
//     position: { x: 0, y: 0 },
//   },
// ];

const FloorMapContainer = styled.div`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
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
  halfCircle: HalfCircle,
  lshape: Lshape,
  test: HiUser,
  rectangle: Rectangle,
  triangle: Triangle,
};

const FloorMap = () => {
  const [reactFlow, setReactFlow] = useState({});
  const theme = useTheme();
  // const fmRef = useResizeObserver();
  // const [items, setItems] = useState(elements);

  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
    reactFlowInstance.zoomTo(1);
    setReactFlow(reactFlowInstance);
  };

  return (
    <FloorMapContainer>
      <ReactFlow
        zoomOnScroll={false}
        onLoad={onLoad}
        // elements={items}
        // snapToGrid
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
      </ReactFlow>
    </FloorMapContainer>
  );
};

export default FloorMap;
