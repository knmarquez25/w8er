import React, { useState, useEffect } from "react";
import {ReactComponent as ConfirmationGraphic} from "../assets/illustrations/done.svg";
import {ReactComponent as IGGraphic} from "../assets/illustrations/ig.svg";
// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const ConfContainer = styled.div`
    width 80%;
    height 80%;
    background-color: blue; 
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  margin-top: 5rem;

  svg {
    width: 30rem;
    height: 30rem;

    //fill-opacity: 0;
    //stroke: #fff;
    //stroke-dashoffset: 0;
    stroke-dasharray: 1000;
    animation: man 6s ease-in-out;
  }
`;

const IGStyle = styled.svg`
  width: 3rem;
  height: 3rem;
`;

const TextStyle = styled.p`
  font-family: Arial, "Times New Roman";
  font-size: 3rem;
  font-style: italic;
  font-weight: 100;
  text-align: center;
  text-transform: capitalize;
`;
const Confirmation = () => {
  return (
    <ConfContainer>
      <TextContainer>
        <TextStyle>waitlisting has been confirmed!</TextStyle>

        <ConfirmationGraphic/>
        <TextStyle>thank you for waitlisting!</TextStyle>
        <TextStyle>a confirmation has been sent.</TextStyle>
        <TextStyle>tell your friends about us!</TextStyle>
        <IGStyle><IGGraphic/></IGStyle>
      </TextContainer>

    </ConfContainer>
  );
};

export default Confirmation;
