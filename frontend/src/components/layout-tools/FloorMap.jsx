import React, { useState, useEffect, useRef } from "react";
import ReactFlow, { Background, MiniMap } from "react-flow-renderer";
import { useTheme } from "emotion-theming";
import { rgba } from "emotion-rgba";
import { HiUser } from "react-icons/hi";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/draggables";

import { FloorMapItems } from "../../recoil/FloorMapItems";

import {
  Square,
  Circle,
  HalfCircle,
  Lshape,
  Rectangle,
  Triangle,
} from "../layout-tools/ToolNodeDisplay";
import { useRecoilState } from "recoil";

const shortid = require("shortid");

const FloorMapContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  /* background-color: red; */

  /* VERY IMPORTANT LINE: */
  /* ensures that the right margin is accounted for it overflows */
  display: inline-block;
`;

const TestComp = styled.div`
  z-index: 5;
  position: absolute;
  top: 0;
  right: 0;
  width: 10rem;
  height: 5rem;

  background-color: red;

  margin: 5rem;
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
  const fmRef = useRef();
  // const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [items, setItems] = useRecoilState(FloorMapItems);
  const [endDropCoords, setEndDropCoords] = useState({ x: 0, y: 0 });

  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
    reactFlowInstance.zoomTo(1);
    setReactFlow(reactFlowInstance);
  };

  return (
    <FloorMapContainer
      ref={fmRef}
      // onClick={(e) => console.log("xy", e.clientX, e.clientY)}
    >
      {/* <button onClick={() => console.log(items)}>REGULAR FLOOR MAP</button> */}
      <ReactFlow
        // onClick={() => consle.log(items)}
        onLoad={onLoad}
        elements={items}
        // snapToGrid
        nodeTypes={nodeTypes}
        snapGrid={[theme.dimensions.gridUnit, theme.dimensions.gridUnit]}
        // translateExtent={[
        //   [0, 0],
        //   [500, 500],
        // ]}
        nodesDraggable={false}
        onElementClick={(e, el) => console.log("coming from the east", el)}
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
        {/* <TestComp /> */}
      </ReactFlow>
    </FloorMapContainer>
  );
};

export default FloorMap;
