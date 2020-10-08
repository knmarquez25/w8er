import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../utils/draggables";
import { circle, diamond, ToolContainer, opacityStyle } from "./ToolStyles";

const Tool = ({ type = "square", info, ...props }) => {
  const [{ isDragging, end, coords, ...dragProps }, drag] = useDrag({
    item: { type: ItemTypes.TOOL, data: info },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      end: monitor.getDropResult(),
    }),
  });

  return (
    <ToolContainer
      {...props}
      info={info}
      ref={drag}
      type={type}
      css={isDragging ? opacityStyle : null}
    ></ToolContainer>
  );
};

export default Tool;
