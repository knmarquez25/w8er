import React, { useState, useEffect } from "react";
import {ReactComponent as ConfirmationGraphic} from "../assets/illustrations/done.svg";
import {ReactComponent as IGGraphic} from "../assets/illustrations/ig.svg";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const ConfContainer = styled.div`
    width 100%;
    height 100%;
    //background-color: blue; 

    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    overflow: auto;

`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  border: white;

  svg {
    width: 30rem;
    height: 30rem;

    //fill-opacity: 0;
    //stroke: #fff;
    //stroke-dashoffset: 0;
    stroke-dasharray: 1000;
    animation: man 6s ease-in-out;
  }
  
  padding: 40px 50px;
  border: 2px white;
  box-shadow: 3px 5px 10px white;

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
  color: ${({ theme }) => theme.colors.onBackground};

`;
const Confirmation = () => {
  return (
    <ConfContainer >
      <TextContainer style={{borderRadius:  20}}>
        <TextStyle>waitlisting has been confirmed!</TextStyle>

        <ConfirmationGraphic/>
        <TextStyle>thank you for waitlisting!</TextStyle>
        <TextStyle>a confirmation has been sent.</TextStyle>

      </TextContainer>

    </ConfContainer>
  );
};

export default Confirmation;
