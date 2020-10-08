import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";

// custom components:
import Button from "./buttons/Button";
import DetailBit from "./DetailBit";
import AddGuest from "./AddGuest";
import DrawerHeader from "./DrawerHeader";
import Tool from "./layout-tools/Tool";

// icon:
import { IoMdAddCircle } from "react-icons/io";
import { ImCheckmark } from "react-icons/im";
import { MdAddBox } from "react-icons/md";
import { FaCaretSquareDown } from "react-icons/fa";
import { AiOutlineCaretDown } from "react-icons/ai";
import { BsCaretDownFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { useRef } from "react";

const FMTContainer = styled.div`
  position: relative;
  /* margin: 1rem; */
  width: 100%;
  height: 100%;
  /* padding: 1rem; */

  /* background-color: ${({ theme }) => theme.colors.background}; */
  /* border-radius: 4px; */
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  .add-btn-container {
    width: 100%;
    display: flex;
  }
`;

const FMTContent = styled.ul`
  width: 100%;
  padding: 0.5rem;

  /* flex: 1; */
  margin-top: 1.5rem;

  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const GLExtras = styled.div`
  width: 100%;
  /* margin: 0 1rem; */

  background-color: ${({ theme }) => theme.colors.surface};

  color: ${({ theme }) => theme.colors.onBackground};

  /* display: flex;
  justify-content: center;
  align-items: center; */
  /* margin-top: ${({ glExtrasOpen }) => (glExtrasOpen ? "1rem" : "0")}; */
`;

const margin = css`
  margin: 1rem;
`;

const FloorMapTools = () => {
  return (
    <FMTContainer>
      <DrawerHeader headerTitle="Floor Map Tools" />

      <FMTContent className="floor-map-tools-content">
        <Tool
          type="square"
          info={{ id: "", data: { type: "square" }, position: { x: 0, y: 0 } }}
          css={margin}
        />
        <Tool
          type="circle"
          info={{ id: "", data: { type: "circle" }, position: { x: 0, y: 0 } }}
          css={margin}
        />
        <Tool
          type="diamond"
          info={{ id: "", data: { type: "diamond" }, position: { x: 0, y: 0 } }}
          css={margin}
        />

        <Tool
          type="lshape"
          info={{ id: "", data: { type: "lshape" }, position: { x: 0, y: 0 } }}
          css={margin}
        />
      </FMTContent>
    </FMTContainer>
  );
};

export default FloorMapTools;
