import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const DetailBitContainer = styled.div`
  width: 1.7rem;
  height: 1.7rem;
  min-width: 1.7rem;
  min-height: 1.7rem;
  border-radius: 50%;

  background-color: ${({ theme }) => theme.colors.onSurface};

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    color: black;
    text-transform: uppercase;
    font-style: normal;
    font-weight: bold;
    font-size: 1rem;
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
