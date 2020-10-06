import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const FMTContainer = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  background-color: ${({ theme, drawOpen }) =>
    drawOpen ? "red" : theme.colors.primary};

  background-color: ${(props) =>
    props.drawOpen ? "red" : props.theme.colors.primary};

  width: 100%;
  height: 100%;

  /* container */
  display: flex;

  /* row => main axis = x => sub axis = y */
  /* column => main axis = y => sub axis = x */
  flex-direction: column;

  align-items: center;
`;

const Header = styled.div`
  background-color: #fff;

  width: 100%;

  height: 5rem;
  min-height: 5rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Square = styled.div`
  width: 5rem;
  height: 5rem;

  background-color: #fff;
  margin: 0.5rem;

  display: flex;

  justify-content: center;
  align-items: center;
`;

const Circle = styled.div`
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  margin: 0.5rem;

  background-color: #fff;
`;

const greenStyle = css`
  background-color: green;
`;

const MyButton = styled.button`
  width: 5rem;
  height: 5rem;
  background-color: red;
  color: black;
`;

const HiddenStuff = styled.div`
  ${(props) => {
    console.log("------------", props);
  }}

  transition: height 200ms linear;

  height: ${(props) => (props.expand ? "20rem" : "0")};
  width: 100%;
  background-color: green;
`;

const HeaderText = styled.h1`
  background-color: blue;
  height: 3rem;
  flex: 1;
`;

const FloorMapTools = ({ color, ...props }) => {
  const [green, setGreen] = useState(false);
  const [expand, setExpand] = useState(false);

  return (
    <FMTContainer className="flex-container">
      <Header className="header">
        <HeaderText>Floor Map Tools</HeaderText>
        <MyButton
          onClick={() => {
            setExpand(!expand);
          }}
        ></MyButton>
      </Header>
      <HiddenStuff expand={expand} />

      <Square className="flex-child">
        <div>lskjdflksdjf</div>
      </Square>
      <Square
        className="flex-child"
        css={green ? greenStyle : null}
        onClick={() => {
          // console.log("lsdjf");
          setGreen(!green);
        }}
      />
      <Circle
        css={green ? greenStyle : null}
        className="flex-child"
        onClick={() => {
          console.log();
        }}
      />
    </FMTContainer>
  );
};

export default FloorMapTools;
