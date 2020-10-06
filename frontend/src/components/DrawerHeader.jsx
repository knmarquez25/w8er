import React, { useState, useEffect, useRef } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";

// custom components:
import Button from "./buttons/Button";
import DetailBit from "./DetailBit";
import AddGuest from "./AddGuest";

// icon:
import { IoMdAddCircle } from "react-icons/io";
import { ImCheckmark } from "react-icons/im";
import { MdAddBox } from "react-icons/md";
import { FaCaretSquareDown } from "react-icons/fa";
import { AiOutlineCaretDown } from "react-icons/ai";
import { BsCaretDownFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";

const HeaderWrapper = styled.div`
  position: relative;
  /* margin: 1rem; */
  width: 100%;
  /* height: 100%; */
  /* padding: 1rem; */

  /* background-color: ${({ theme }) => theme.colors.background}; */
  /* border-radius: 4px; */
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  .add-btn-container {
    width: 100%;
    display: flex;
  }
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

  width: 100%;
  height: ${({ drawerStatus, height }) => (drawerStatus ? `${height}px` : "0")};
  border-bottom: ${({ theme, drawerStatus }) =>
    drawerStatus ? `1px solid ${theme.colors.outline}` : 0};

  color: ${({ theme }) => theme.colors.onBackground};
  transition: height 200ms ease-out;

  overflow: hidden;
`;

const DrawerHeader = ({
  // drawerBtn1,
  // drawerBtn2,
  headerTitle,
  drawerComponent1,
  drawerComponent2,
  handleChange1 = () => {},
  handleChange2 = () => {},
  ...props
}) => {
  const [drawerBtn1, setDrawerBtn1] = useState(false);
  const [drawerBtn2, setDrawerBtn2] = useState(false);
  const [height1, setHeight1] = useState(0);
  const [height2, setHeight2] = useState(0);

  const cr1 = useRef();
  const cr2 = useRef();

  useEffect(() => {
    if (cr1) setHeight1(cr1.current.clientHeight);
  }, [cr1]);

  useEffect(() => {
    // if (cr2) console.log("h2", cr2.current.clientHeight);
    if (cr2) setHeight2(cr2.current.clientHeight);
  }, [cr2]);

  let newDrawerComponent1 = null;
  let newDrawerComponent2 = null;

  // if the trigger component is a valid element...
  if (React.isValidElement(drawerComponent1)) {
    newDrawerComponent1 = React.cloneElement(drawerComponent1, {
      ref: cr1,
    });
  }

  if (React.isValidElement(drawerComponent2)) {
    newDrawerComponent2 = React.cloneElement(drawerComponent2, {
      ref: cr2,
    });
  }

  const toggleButton1 = () => {
    console.log("toggling btn 1");
    setDrawerBtn1(!drawerBtn1);
    // handleChange1(!drawerBtn1);
  };

  const toggleButton2 = () => {
    console.log("toggling btn 2");
    setDrawerBtn2(!drawerBtn2);
    // handleChange2(!drawerBtn2);
  };

  return (
    <HeaderWrapper>
      <HeaderContainer>
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
              console.log("1", drawerBtn1);
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
              console.log("2", drawerBtn2);
            }}
          />
        </div>
      </HeaderContainer>

      <DrawerContent drawerStatus={drawerBtn1} height={height1}>
        {newDrawerComponent1}
      </DrawerContent>

      <DrawerContent drawerStatus={drawerBtn2} height={height2}>
        {newDrawerComponent2}
      </DrawerContent>
    </HeaderWrapper>
  );
};

export default DrawerHeader;
