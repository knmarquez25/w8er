import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// custom hooks:
import useRepeatLongPress from "../../hooks/useRepeatLongPress";

// styles:
import {
  ToolContainer,
  RotateCWControl,
  RotateCCWControl,
  Shape,
  IncreaseSize,
  DecreaseSize,
  HiddenHack,
} from "./ToolStyles";

// icons:
import { BiRotateLeft, BiRotateRight } from "react-icons/bi";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";

const ToolNode = ({
  type = "square",
  mode = "normal",
  info,
  selected,
  rotateUnit = 15,
  sizeUnit = 20,
  ...props
}) => {
  const [rotateAngle, setRotateAngle] = useState(0);
  const [size, setSize] = useState({ height: 60, width: 60 });

  const rotateCW = () => {
    setRotateAngle(rotateAngle + rotateUnit);
  };

  const rotateCCW = () => {
    setRotateAngle(rotateAngle - rotateUnit);
  };

  const increaseSize = () => {
    const { height, width } = size;
    setSize({ height: height + sizeUnit, width: width + sizeUnit });
  };

  const decreaseSize = () => {
    const { height, width } = size;
    setSize({ height: height - sizeUnit, width: width - sizeUnit });
  };

  const cwLongPressAction = useRepeatLongPress(rotateCW, 200);
  const ccwLongPressAction = useRepeatLongPress(rotateCCW, 200);
  const increaseSizePressActions = useRepeatLongPress(increaseSize, 200);
  const decreaseSizePressActions = useRepeatLongPress(decreaseSize, 200);

  useEffect(() => {
    // console.log("TOOL NODE", type);
  }, [rotateAngle, size]);

  return (
    <ToolContainer {...props}>
      <Shape size={size} rotateAngle={rotateAngle} type={type} info={info} />

      <HiddenHack selected={selected}>
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
      </HiddenHack>
    </ToolContainer>
  );
};

const Square = ({ selected, ...props }) => {
  return <ToolNode {...props} selected={selected} type="square"></ToolNode>;
};

const Circle = ({ selected, ...props }) => {
  return <ToolNode {...props} selected={selected} type="circle"></ToolNode>;
};

const HalfCircle = ({ selected, ...props }) => {
  return <ToolNode {...props} selected={selected} type="halfCircle"></ToolNode>;
};

const Lshape = ({ selected, ...props }) => {
  return <ToolNode {...props} selected={selected} type="lshape"></ToolNode>;
};

const Rectangle = ({ selected, ...props }) => {
  return <ToolNode {...props} selected={selected} type="rectangle"></ToolNode>;
};

export default ToolNode;
export { Square, Circle, HalfCircle, Lshape, Rectangle };
