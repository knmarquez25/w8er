import React, { useState, useEffect } from "react";

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

const GuestListContainer = styled.div`
  position: relative;
  /* margin: 1rem; */
  width: 100%;
  height: 100%;
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

const ListContainer = styled.ul`
  width: 100%;
  padding: 0.5rem;

  flex: 1;

  display: flex;
  flex-direction: column;
`;

const GLExtras = styled.div`
  width: 100%;
  /* margin: 0 1rem; */

  background-color: ${({ theme }) => theme.colors.surface};

  transition: height 200ms ease-out;

  height: ${({ glExtrasOpen }) => (glExtrasOpen ? "5rem" : "0")};

  overflow: hidden;

  color: ${({ theme }) => theme.colors.onBackground};

  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: ${({ glExtrasOpen }) => (glExtrasOpen ? "1rem" : "0")}; */
`;

const HeaderButton = styled(Button)`
  /* margin-right: 0.75rem; */
  /* background-color: ${({ theme, buttonOpen }) =>
    buttonOpen ? theme.colors.surface : "transparent"}; */

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
        /* fill: ${({ theme }) => theme.colors.onBackground}; */
        fill: ${({ openContent, theme }) =>
          !openContent ? theme.colors.onBackground : theme.colors.error};
      }
    }
  }

  &:hover {
    background-color: ${({ theme }) => rgba("black", 0.05)};

    border: 0;

    .btn-icon {
      svg {
        path {
          fill: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }
`;

const FloorMapTools = () => {
  const [glExtrasOpen, setGlExtrasOpen] = useState(false);
  const [addGuestOpen, setAddGuestOpen] = useState(false);

  const toggleGLextras = () => {
    setGlExtrasOpen(!glExtrasOpen);
  };

  const toggleAddGuest = () => {
    setAddGuestOpen(!addGuestOpen);
  };

  return (
    <GuestListContainer>
      <HeaderContainer>
        <div className="btn-container">
          <HeaderButton
            type="circle"
            openContent={glExtrasOpen}
            buttonOpen={glExtrasOpen}
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
              setAddGuestOpen(false);
              toggleGLextras();
            }}
          />
        </div>
        <h1>Floor Map Tools</h1>
        <div className="btn-container">
          <HeaderButton
            type="circle"
            addGuestOpen={addGuestOpen}
            openContent={addGuestOpen}
            rotation={-135}
            icon={GoPlus}
            onClick={() => {
              setGlExtrasOpen(false);
              toggleAddGuest();
            }}
          />
        </div>
      </HeaderContainer>

      <GLExtras glExtrasOpen={glExtrasOpen}>
        filter, sort, other extra features here
      </GLExtras>

      <ListContainer className="guest-list"></ListContainer>
    </GuestListContainer>
  );
};

export default FloorMapTools;
