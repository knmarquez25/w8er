// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const diamond = css`
  transform: rotate(45deg);
  /* clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); */
`;

const circle = css`
  border-radius: 50%;
`;

const lshape = css`
  clip-path: polygon(0 0, 50% 0, 50% 50%, 100% 50%, 100% 100%, 0 100%);
`;

const ToolContainer = styled.div`
  width: ${({ theme }) => theme.dimensions.gridUnit * 3}px;
  height: ${({ theme }) => theme.dimensions.gridUnit * 3}px;
  background-color: ${({ theme }) => theme.colors.primary};

  ${({ type }) => {
    switch (type) {
      case "square":
        return null;
      case "circle":
        return circle;
      case "diamond":
        return diamond;
      case "lshape":
        return lshape;
      default:
        return null;
    }
  }}
`;

const opacityStyle = css`
  /* opacity: 0.5; */
  background-color: red;
`;

export { circle, diamond, ToolContainer, opacityStyle };
