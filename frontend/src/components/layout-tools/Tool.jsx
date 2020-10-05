import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../utils/draggables";

const ToolContainer = styled.div`
  width: 10rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.primary};

  position: ${({ info }) => (info.dropped ? "absolute" : "relative")};
  top: ${({ info }) => info.coordinates.y}px;
  left: ${({ info }) => info.coordinates.x}px;
`;

const opacityStyle = css`
  /* opacity: 0.5; */
  background-color: red;
`;

const Tool = ({ info }) => {
  const [{ isDragging, end, coords, ...props }, drag] = useDrag({
    item: { type: ItemTypes.TOOL, data: info },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      end: monitor.getDropResult(),
      coords: monitor.getInitialClientOffset(),
    }),
  });

  return (
    <ToolContainer
      info={info}
      ref={drag}
      css={isDragging ? opacityStyle : null}
      onClick={() => {
        console.log("Tool", info);
      }}
    ></ToolContainer>
  );
};

export default Tool;
