import React from "react";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const btnSize = "2.5rem";

const textIconSeparator = css`
  margin-right: 0.5rem;
`;

const circleBtn = css`
  border-radius: 5rem;
  width: ${btnSize};

  .btn-text,
  .btn-icon {
    width: 100%;
  }
`;

const regularBtn = css`
  border-radius: 4px;
  padding: 0 0.75rem;
`;

const ButtonContainer = styled.button`
  /* padding: 0 0.75rem; */
  height: ${btnSize};
  /* border-radius: 4px; */
  background-color: ${(props) => props.theme.colors.primary};

  display: flex;
  /* flex-direction: column; */

  .btn-text {
    height: 100%;
    /* background-color: #fff; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0px;
  }

  .btn-icon {
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      /* background-color: #fff; */
      width: 1rem;
      height: 1rem;

      path {
        fill: ${(props) => props.theme.colors.onPrimary};
      }
    }
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;

const Button = ({ type, text, icon, ...props }) => {
  return (
    <ButtonContainer
      {...props}
      css={type === "circle" ? circleBtn : regularBtn}
    >
      {text ? (
        <span
          className="btn-text"
          css={icon && text ? textIconSeparator : null}
        >
          {text}
        </span>
      ) : null}
      {icon ? <span className="btn-icon">{icon}</span> : null}
    </ButtonContainer>
  );
};

export default Button;
