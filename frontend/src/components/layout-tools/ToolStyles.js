// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const halfCircle = css`
  clip-path: circle(50.2% at 50% 0);
  /* clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); */
`;

const circle = css`
  border-radius: 50%;
`;

const lshape = css`
  clip-path: polygon(0 0, 50% 0, 50% 50%, 100% 50%, 100% 100%, 0 100%);
`;

const rectangle = (theme, size) => css`
  width: ${size ? size.width / 2 : (theme.dimensions.gridUnit / 2) * 3}px;
`;

const ToolContainer = styled.div``;

const Shape = styled.div`
  position: relative;

  width: ${({ theme, size }) =>
    size ? size.width : theme.dimensions.gridUnit * 3}px;
  height: ${({ theme, size }) =>
    size ? size.height : theme.dimensions.gridUnit * 3}px;
  background-color: ${({ theme }) => theme.colors.primary};

  border: 1px solid ${({ theme }) => theme.colors.onBackground};
  /* border: 1px solid red; */

  transform: rotate(${({ rotateAngle }) => rotateAngle}deg);

  transition-property: transform, width, height;
  transition-duration: 200ms;
  transition-timing-function: linear;

  cursor: move;

  &:active {
    background-color: red;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  ${({ type, theme, size }) => {
    switch (type) {
      case "square":
        return null;
      case "circle":
        return circle;
      case "halfCircle":
        return halfCircle;
      case "lshape":
        return lshape;
      case "rectangle":
        return rectangle(theme, size);
      default:
        return null;
    }
  }}
`;

const overlayControls = (theme) => css`
  position: absolute;
  background-color: transparent;

  top: -3rem;
  cursor: pointer;

  svg {
    width: 2rem;
    height: 2rem;
    path {
      fill: ${theme.colors.onBackground};
    }
  }
`;

const RotateCCWControl = styled.button`
  ${({ theme }) => overlayControls(theme)}
  left: 0;
`;

const RotateCWControl = styled.button`
  ${({ theme }) => overlayControls(theme)}
  left: 3rem;
`;

const DecreaseSize = styled.button`
  ${({ theme }) => overlayControls(theme)}
  left:6rem;
`;

const IncreaseSize = styled.button`
  ${({ theme }) => overlayControls(theme)}
  left: 9rem;
`;

/* 
  this hidden hack was made because using the prop "selected" to conditionally render
  the four controls (+, -, cw, ccw) made it so that the controls did not fire onTouchStart
  or any event on MOBILE; it still worked as normal on desktop or minimized desktop.
*/
const HiddenHack = styled.div`
  ${({ selected }) =>
    !selected
      ? css`
          display: none;
        `
      : null}
`;

const opacityStyle = css`
  /* opacity: 0.5; */
  background-color: red;
`;

export {
  ToolContainer,
  opacityStyle,
  Shape,
  RotateCWControl,
  RotateCCWControl,
  IncreaseSize,
  DecreaseSize,
  HiddenHack,
};
