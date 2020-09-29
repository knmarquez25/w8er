import React from "react";
import { MdBrightnessLow } from "react-icons/md";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// export interface ToggleInputProps {
//   value: boolean;
//   onClick: () => {};
//   label: string;

//   // htmlFor: String;
//   // label: String;
// }

const on = css`
  transform: translateX(100%);
`;

const off = css`
  transform: translateX(0);
`;

const ToggleContainer = styled.div`
  background-color: ${(props) => props.theme.colors.surface};

  width: 4.3rem;

  padding: 0.15rem;
  border-radius: 5rem;
  /* margin: 0.25rem; */
  margin: 0.25rem 0;
`;

const ToggleButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};

  font-size: 0px;

  transition-property: transform, background-color;
  transition-timing-function: ease-out;
  transition-duration: 250ms;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;

const ToggleInput = ({ value, onClick, label, ...props }) => {
  return (
    <ToggleContainer>
      <ToggleButton
        type="button"
        aria-pressed={value}
        onClick={onClick}
        css={value ? on : off}
      >
        {label}
      </ToggleButton>
    </ToggleContainer>
  );
};

export default ToggleInput;
