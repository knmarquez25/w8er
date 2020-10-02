import React, { useState, useEffect } from "react";
import Example from "./Example";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const sldfj = css``;

const FMHContainer = styled.div`
  width: 100%;
  min-height: 3rem;
  /* background-color: ${({ theme }) => theme.colors.background}; */
  /* border-radius: 4px; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    border-radius: 4px;

    width: 100%;
    /* background-color: ${({ theme }) => theme.colors.background}; */

    /* border-bottom: 2px solid ${({ theme }) => theme.colors.primary}; */
    min-height: 3rem;
    margin-bottom: 1rem;

    color: ${({ theme }) => theme.colors.onBackground};
    font-size: 1.2rem;
    text-transform: uppercase;

    /* font-style: italic; */
    letter-spacing: 2px;
    font-weight: bold;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const FloorMapHeader = () => {
  return (
    <FMHContainer>
      <h1>Floor Map</h1>
      <Example />
    </FMHContainer>
  );
};

export default FloorMapHeader;
