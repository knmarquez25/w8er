import React, { useState, useEffect } from "react";
import { circle, diamond, ToolContainer, opacityStyle } from "./ToolStyles";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const ToolNode = ({ type = "square", info }) => {
  return <ToolContainer type={type} info={info}></ToolContainer>;
};

const Square = () => {
  return <ToolNode type="square"></ToolNode>;
};

const Circle = () => {
  return <ToolNode type="circle"></ToolNode>;
};

const Diamond = () => {
  return <ToolNode type="diamond"></ToolNode>;
};

const Lshape = () => {
  return <ToolNode type="lshape"></ToolNode>;
};

export default ToolNode;
export { Square, Circle, Diamond, Lshape };
