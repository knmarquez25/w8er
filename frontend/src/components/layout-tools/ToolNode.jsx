import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

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
  LabelInput,
} from "./ToolStyles";

// icons:
import { BiRotateLeft, BiRotateRight } from "react-icons/bi";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";

// Node states and defaults:
import { FloorMapItems, DEFAULT_NODE_DATA } from "../../recoil/FloorMapItems";

const ToolNode = ({
  id,
  type = "square",
  selected,
  data = DEFAULT_NODE_DATA,
  mode = "normal",
  info,
  rotateUnit = 15,
  sizeUnit = 20,
  ...props
}) => {
  const [rotateAngle, setRotateAngle] = useState(data.rotateAngle);
  const [size, setSize] = useState(data.size);
  const [label, setLabel] = useState(data.label);
  const [items, setItems] = useRecoilState(FloorMapItems);

  useEffect(() => {
    // console.log("ToolNodeChanged", id, type, rotateAngle, data.rotateAngle);
  }, [rotateAngle, size, label]);

  const updateNodeData = (dataUpdate) => {
    const deleteIndex = items.findIndex((item, i) => item.id === id);
    if (deleteIndex > -1) {
      const itemCopy = items[deleteIndex];

      const updatedItem = {
        ...itemCopy,
        data: { ...itemCopy.data, ...dataUpdate },
      };

      const updatedItems = [
        ...items.slice(0, deleteIndex),
        ...items.slice(deleteIndex + 1, items.length),
        updatedItem,
      ];
      setItems(updatedItems);
    }
  };

  const rotateCW = () => {
    const newValue = rotateAngle + rotateUnit;
    setRotateAngle(newValue);
    updateNodeData({ rotateAngle: newValue });
  };

  const rotateCCW = () => {
    const newValue = rotateAngle - rotateUnit;
    setRotateAngle(newValue);
    updateNodeData({ rotateAngle: newValue });
  };

  const increaseSize = () => {
    const { height, width } = size;
    const newValue = { height: height + sizeUnit, width: width + sizeUnit };
    setSize(newValue);
    updateNodeData({ size: newValue });
  };

  const decreaseSize = () => {
    const { height, width } = size;
    const newValue = { height: height - sizeUnit, width: width - sizeUnit };
    setSize(newValue);
    updateNodeData({ size: newValue });
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
      {/* <Shape size={size} rotateAngle={rotateAngle} type={type} info={info} /> */}
      <Shape
        className="shape"
        size={size}
        rotateAngle={rotateAngle}
        type={type}
        // info={info}
      />
      <LabelInput
        type="text"
        shapeType={type}
        value={label}
        onChange={(e) => {
          setLabel(e.target.value);
        }}
      />
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
