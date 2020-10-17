import React, { useState, useEffect, memo } from "react";
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
  Label,
} from "./ToolStyles";

// icons:
import { BiRotateLeft, BiRotateRight } from "react-icons/bi";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";

// Node states and defaults:
import { FloorMapItems, DEFAULT_NODE_DATA } from "../../recoil/FloorMapItems";

const ToolNode = memo(
  ({
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
    const [items, setItems] = useRecoilState(FloorMapItems);

    useEffect(() => {
      // console.log("ToolNodeChanged", id, type, rotateAngle, data.rotateAngle);
    }, [data.rotateAngle, data.size, data.label]);

    // const updateNodeData = () => {
    //   const deleteIndex = items.findIndex((item, i) => item.id === id);

    //   if (deleteIndex > -1) {
    //     const itemCopy = items[deleteIndex];

    //     const updatedItem = {
    //       ...itemCopy,
    //       data: { ...itemCopy.data, rotateAngle, size, label },
    //     };

    //     const updatedItems = [
    //       ...items.slice(0, deleteIndex),
    //       ...items.slice(deleteIndex + 1, items.length),
    //       updatedItem,
    //     ];

    //     setItems(updatedItems);
    //   }
    // };

    // useEffect(() => {
    //   updateNodeData();
    // }, [selected]);

    // useEffect(() => {
    //   updateNodeData();
    // }, [rotateAngle, size, label]);

    return (
      <ToolContainer {...props}>
        {/* <Shape size={size} rotateAngle={rotateAngle} type={type} info={info} /> */}
        <Shape
          className="shape"
          size={data.size}
          rotateAngle={data.rotateAngle}
          type={type}
          // info={info}
        />
        <Label shapeType={type}>{data.label}</Label>
      </ToolContainer>
    );
  }
);

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
