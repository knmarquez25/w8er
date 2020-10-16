import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import { useDrag } from "react-dnd";
import { ItemTypes } from "../../utils/draggables";
import { Shape, opacityStyle } from "./ToolStyles";

import { DEFAULT_NODE_DATA } from "../../recoil/FloorMapItems";

const Tool = ({ type = "square", data = DEFAULT_NODE_DATA, ...props }) => {
  const [{ isDragging, end, coords, ...dragProps }, drag] = useDrag({
    item: { type: ItemTypes.TOOL, data: { ...data, type } },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      end: monitor.getDropResult(),
    }),
  });

  return (
    <Shape
      {...props}
      ref={drag}
      type={type}
      css={isDragging ? opacityStyle : null}
    ></Shape>
  );
};

export default Tool;
