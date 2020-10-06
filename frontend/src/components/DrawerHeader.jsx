import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";

import useResizeObserver from "use-resize-observer";
// import useResizeObserver from "../hooks/useResizeObserver"

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";

// custom components:
import Button from "./buttons/Button";

// icon:
import { IoMdAddCircle } from "react-icons/io";
import { ImCheckmark } from "react-icons/im";
import { MdAddBox } from "react-icons/md";
import { FaCaretSquareDown } from "react-icons/fa";
import { AiOutlineCaretDown } from "react-icons/ai";
import { BsCaretDownFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";

const contentPadding = 28;

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  ${({ drawerStatus, headerHeight, cHeight1, cHeight2 }) =>
    drawerStatus
      ? css`
          height: ${headerHeight +
          (cHeight1 ? cHeight1 : cHeight2) +
          contentPadding}px;
          min-height: ${headerHeight +
          (cHeight1 ? cHeight1 : cHeight2) +
          contentPadding}px;
        `
      : css`
          height: ${headerHeight}px;
          min-height: ${headerHeight}px;
        `}

  overflow-y: hidden;

  transition-property: min-height, height;
  transition-duration: 200ms;
  transition-timing-function: ease-out;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderContainer = styled.div`
  z-index: 3;
  background-color: ${({ theme }) => theme.colors.background};

  /* border-bottom: 1px solid red; */

  box-shadow: inset 0px -1px 0px 0px ${({ theme }) => theme.colors.outline};
  /* box-shadow: 0px 1px 0px 0px
    ${({ theme }) => theme.colors.outline}; */

  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  /* min-height: 3rem; */
  /* margin-bottom: 1rem; */
  /* margin: 1rem; */

  box-sizing: border-box;

  h1 {
    /* background-color: ${({ theme }) => theme.colors.background}; */

    /* border-bottom: 2px solid ${({ theme }) => theme.colors.primary}; */

    color: ${({ theme }) => theme.colors.onBackground};
    font-size: 1.2rem;
    text-transform: uppercase;

    /* font-style: italic; */
    letter-spacing: 2px;
    font-weight: bold;

    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  .btn-container {
  }
`;

const HeaderButton = styled(Button)`
  background-color: transparent;

  border-radius: 0;

  width: 4rem;
  min-width: 4rem;
  height: 4rem;
  min-height: 4rem;

  .btn-icon {
    svg {
      width: 1.5rem;
      height: 1.5rem;
      transition: transform 200ms ease-out;
      transform: ${({ openContent, rotation = -180 }) =>
        openContent ? css`rotate(${rotation}deg)` : css`rotate(0)`};
      path {
        fill: ${({ openContent, theme }) =>
          !openContent ? theme.colors.onBackground : theme.colors.error};
      }
    }
  }

  &:hover {
    background-color: ${({ theme }) => rgba("black", 0.1)};
    .btn-icon {
      svg {
        path {
          fill: ${({ openContent, theme }) =>
            !openContent ? theme.colors.primary : theme.colors.error};
        }
      }
    }
  }
`;

const DrawerContent = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  /* 
  padding: ${({ drawerStatus }) =>
    drawerStatus ? `${contentPadding}px` : "0"}; */

  width: 100%;
  /* height: ${({ drawerStatus, height }) =>
    drawerStatus ? `${height + contentPadding * 2}px` : "0"};
  min-height: ${({ drawerStatus, height }) =>
    drawerStatus ? `${height + contentPadding * 2}px` : "0"}; */

  ${({ drawerStatus, height }) =>
    drawerStatus
      ? css`
          height: ${height + contentPadding}px;
          min-height: ${height + contentPadding}px;
          padding: ${contentPadding / 2}px ${contentPadding}px;
        `
      : css`
          height: 0;
          min-height: 0;
          padding: 0;
        `}

  border-bottom: ${({ theme, drawerStatus }) =>
    drawerStatus ? `1px solid ${theme.colors.outline}` : 0};

  & > * {
    color: ${({ theme }) => theme.colors.onBackground};
  }

  transition-property: min-height, height, padding;
  transition-duration: 200ms;
  transition-timing-function: ease-out;

  /* transition: min-height 200ms ease-out; */

  overflow: hidden;
  /* overflow-y: auto; */
`;

const DrawerHeader = ({
  headerTitle,
  drawerComponent1,
  drawerComponent2,
  handleChange1 = () => {},
  handleChange2 = () => {},
  ...props
}) => {
  const [drawerBtn1, setDrawerBtn1] = useState(false);
  const [drawerBtn2, setDrawerBtn2] = useState(false);

  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  const cr1 = useResizeObserver();
  const cr2 = useResizeObserver();

  useEffect(() => {
    if (headerRef) setHeaderHeight(headerRef.current.clientHeight);
  }, [headerRef]);

  const toggleButton1 = () => {
    // console.log("toggling btn 1");
    setDrawerBtn1(!drawerBtn1);
    // handleChange1(!drawerBtn1);
  };

  const toggleButton2 = () => {
    // console.log("toggling btn 2");
    setDrawerBtn2(!drawerBtn2);
    // handleChange2(!drawerBtn2);
  };

  let newDrawerComponent1 = null;
  let newDrawerComponent2 = null;

  if (React.isValidElement(drawerComponent1)) {
    newDrawerComponent1 = React.cloneElement(drawerComponent1, {
      ref: cr1.ref,
      toggleDrawer: toggleButton1,
    });
  }

  if (React.isValidElement(drawerComponent2)) {
    newDrawerComponent2 = React.cloneElement(drawerComponent2, {
      ref: cr2.ref,
      toggleDrawer: toggleButton2,
    });
  }
  return (
    <HeaderWrapper
      className="header-wrapper"
      headerHeight={headerHeight}
      cHeight1={drawerBtn1 ? cr1.height : null}
      cHeight2={drawerBtn2 ? cr2.height : null}
      drawerStatus={drawerBtn1 || drawerBtn2}
    >
      <HeaderContainer ref={headerRef}>
        <div className="btn-container">
          <HeaderButton
            type="circle"
            openContent={drawerBtn1}
            buttonOpen={drawerBtn1}
            icon={BsCaretDownFill}
            css={css`
              .btn-icon {
                svg {
                  width: 1.2rem;
                  height: 1.2rem;
                }
              }
            `}
            onClick={() => {
              toggleButton1();
              setDrawerBtn2(false);
              // handleChange2(false);
            }}
          />
        </div>
        <h1>{headerTitle}</h1>
        <div className="btn-container">
          <HeaderButton
            type="circle"
            addGuestOpen={drawerBtn2}
            openContent={drawerBtn2}
            rotation={-135}
            icon={GoPlus}
            onClick={() => {
              toggleButton2();
              setDrawerBtn1(false);
              // handleChange1(false);
            }}
          />
        </div>
      </HeaderContainer>

      <DrawerContent
        className="drawer-content-1"
        drawerStatus={drawerBtn1}
        height={cr1.height}
      >
        {newDrawerComponent1}
      </DrawerContent>

      <DrawerContent
        className="drawer-content-1"
        drawerStatus={drawerBtn2}
        height={cr2.height}
      >
        {newDrawerComponent2}
      </DrawerContent>
    </HeaderWrapper>
  );
};

export default DrawerHeader;
