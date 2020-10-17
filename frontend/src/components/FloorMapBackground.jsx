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
} from "../components/layout-tools/ToolNodeEdit";

const shortid = require("shortid");

const elements = [
  {
    type: "halfCircle",
    id: 1,
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
    id: 2,
    data: { label: <div>b</div> },
    position: { x: 60, y: 40 },
  },
  {
    type: "square",
    id: 3,
    data: { label: <div>c</div> },
    position: { x: -40, y: 80 },
  },
  {
    type: "circle",
    id: 4,
    data: { label: <div>d</div> },
    position: { x: 120, y: 220 },
  },
  {
    type: "square",
    id: 5,
    data: { label: <div>d</div> },
    position: { x: 120, y: 220 },
  },

  // { id: "e1-2", source: "1", target: "2", animated: true },
];

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
};

const FloorMap = () => {
  const [reactFlow, setReactFlow] = useState({});
  const theme = useTheme();
  // const fmRef = useResizeObserver();
  const [items, setItems] = useState(elements);

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
        elements={items}
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
