import React, { useState, useEffect } from "react";
import useRepeatLongPress from "../../hooks/useRepeatLongPress";

import {
  ToolContainer,
  RotateCWControl,
  RotateCCWControl,
  Shape,
  IncreaseSize,
  DecreaseSize,
} from "./ToolStyles";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// icons:
import { BiRotateLeft, BiRotateRight } from "react-icons/bi";

import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";

const ToolNode = ({ type = "square", mode = "normal", info }) => {
  const [rotateAngle, setRotateAngle] = useState(0);
  const [size, setSize] = useState({ height: 60, width: 60 });
  const [clicked, setClicked] = useState(false);

  const rotateCW = () => {
    setRotateAngle(rotateAngle + 15);
  };
  const rotateCCW = () => {
    setRotateAngle(rotateAngle - 15);
  };

  const cwLongPressAction = useRepeatLongPress(rotateCW, 150);
  const ccwLongPressAction = useRepeatLongPress(rotateCCW, 150);
  const increaseSizePressActions = useRepeatLongPress(() => {
    const { height, width } = size;
    setSize({ height: height + 20, width: width + 20 });
  }, 200);

  const decreaseSizePressActions = useRepeatLongPress(() => {
    const { height, width } = size;
    setSize({ height: height - 20, width: width - 20 });
  }, 200);

  return (
    <ToolContainer>
      <Shape
        size={size}
        rotateAngle={rotateAngle}
        type={type}
        info={info}
        onMouseUp={() => {
          setClicked(!clicked);
        }}
        onTouchEnd={() => {
          setClicked(!clicked);
        }}
      />
      {clicked && (
        <React.Fragment>
          <IncreaseSize {...increaseSizePressActions}>
            <MdAddCircleOutline />
          </IncreaseSize>
          <DecreaseSize {...decreaseSizePressActions}>
            <MdRemoveCircleOutline />
          </DecreaseSize>
          <RotateCWControl {...cwLongPressAction}>
            <BiRotateRight />
          </RotateCWControl>
          <RotateCCWControl {...ccwLongPressAction}>
            <BiRotateLeft />
          </RotateCCWControl>
        </React.Fragment>
      )}
    </ToolContainer>
  );
};

const Square = () => {
  return <ToolNode type="square"></ToolNode>;
};

const Circle = () => {
  return <ToolNode type="circle"></ToolNode>;
};

const HalfCircle = () => {
  return <ToolNode type="halfCircle"></ToolNode>;
};

const Lshape = () => {
  return <ToolNode type="lshape"></ToolNode>;
};

const Rectangle = () => {
  return <ToolNode type="rectangle"></ToolNode>;
};

export default ToolNode;
export { Square, Circle, HalfCircle, Lshape, Rectangle };
