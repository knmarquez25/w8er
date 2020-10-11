import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// const size = 1.7;
const size = 2;

const DetailBitContainer = styled.div`
  /* width: 1.7rem;
  height: 1.7rem;
  min-width: 1.7rem;
  min-height: 1.7rem; */
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.2);

  height: ${size}rem;
  min-height: ${size}rem;
  width: ${size}rem;
  min-width: ${size}rem;

  border-radius: 50%;

  background-color: ${({ theme }) => theme.colors.onSurface};

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    cursor: default;
    color: black;
    text-transform: uppercase;
    font-style: normal;
    font-weight: bold;
    font-size: 1rem;
    user-select: none;
  }
`;

const DetailBit = ({ text, textColor, shape, shapeColor, ...props }) => {
  return (
    <DetailBitContainer {...props}>
      <p>{text}</p>
    </DetailBitContainer>
  );
};

export default DetailBit;
