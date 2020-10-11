import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";

const glowEffect = keyframes`
  from {
    transform: scale(1);
  }

  to {
    transform: scale(0.65);

  }
`;

const GBContainer = styled.button`
  height: 3rem;
  width: 3rem;
  min-height: 3em;
  min-width: 3rem;

  position: relative;

  background-color: transparent;

  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover,
  &:active {
    div {
      animation: none;
      box-shadow: none;
    }
  }
`;

const GlowEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  animation: ${glowEffect} 1s ease infinite;
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  min-height: 3rem;
  min-width: 3rem;

  transition: none;
  background-color: ${({ theme, color, effectOpacity }) =>
    rgba(color ? color : theme.colors.primary, effectOpacity)};
`;

const BaseButton = styled.div`
  position: relative;
  z-index: 1;

  background-color: ${({ theme, color }) =>
    color ? color : theme.colors.primary};
  border-radius: 50%;

  font-weight: bold;

  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.2);

  height: 2rem;
  width: 2rem;
  min-height: 2rem;
  min-width: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const GlowButton = ({ text, icon, color, effectOpacity = 0.2, ...props }) => {
  return (
    <GBContainer {...props}>
      <GlowEffect color={color} effectOpacity={effectOpacity}></GlowEffect>
      <BaseButton color={color}>
        {icon && React.createElement(icon)}
        {!icon && text && text.charAt(0)}
      </BaseButton>
    </GBContainer>
  );
};

export default GlowButton;
