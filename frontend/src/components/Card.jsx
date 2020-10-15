import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  margin: 2rem;
  padding: 2rem;

  width: 30rem;
  height: 40rem;
  min-width: 30rem;
  min-height: 40rem;

  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.outline};
  border-bottom: 4px solid ${({ theme }) => theme.colors.outline};
  border-right: 4px solid ${({ theme }) => theme.colors.outline};

  transition-property: width, height, border-bottom, border-right;
  transition-duration: 200ms;
  transition-timing-function: ease-out;

  /* cursor: pointer; */

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  @media (max-width: 1000px) {
    /* transform: scale(0.6); */
    width: 20rem;
    height: 30rem;
    min-width: 20rem;
    min-height: 30rem;
  }

  @media (max-width: 768px) {
    max-width: 30rem;
    max-height: 40rem;
    width: 90%;
    height: 40rem;
    min-width: 20rem;
    min-height: 40rem;
  }

  @media (max-width: 400px) {
    /* transform: scale(0.6); */
    width: 90%;
    height: 30rem;
  }

  &:hover {
    /* border: 1px solid ${({ theme }) => theme.colors.primary}; */
    border-bottom: 4px solid ${({ theme }) => theme.colors.primary};
    border-right: 4px solid ${({ theme }) => theme.colors.primary};
  }

  svg {
    width: 70%;
    height: 50%;
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.onBackground};
  font-size: 2rem;
  font-weight: bold;

  margin-bottom: 1rem;
  width: 100%;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.onBackground};

  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  width: 100%;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  font-size: inherit;
  font-style: italic;
`;

const Card = ({ children }) => {
  return <CardContainer>{children}</CardContainer>;
};

export default Card;
