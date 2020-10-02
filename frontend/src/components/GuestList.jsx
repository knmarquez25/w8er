import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";

// custom components:
import Button from "./buttons/Button";
import DetailBit from "./DetailBit";

// icon:
import { IoMdAddCircle } from "react-icons/io";
import { ImCheckmark } from "react-icons/im";
import { MdAddBox } from "react-icons/md";
import { FaCaretSquareDown } from "react-icons/fa";
import { AiOutlineCaretDown } from "react-icons/ai";
import { BsCaretDownFill } from "react-icons/bs";

const GUESTLIST = [
  { name: "Joane Sparks", phone: "310 420 6969", party: 5, reserve: false },
  { name: "Ash Ketchum", phone: "589 420 9811", party: 2, reserve: false },
  { name: "Brock Lesnar", phone: "566 444 5466", party: 3, reserve: true },
  { name: "Rip Harambe", phone: "568 111 5688", party: 4, reserve: false },
];

const GuestListContainer = styled.div`
  /* margin: 1rem; */
  width: 100%;
  height: 100%;
  /* padding: 1rem; */

  /* background-color: ${({ theme }) => theme.colors.background}; */
  /* border-radius: 4px; */

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
  background-color: ${({ theme }) => theme.colors.background};
  /* background-color: ${({ theme }) => theme.colors.primary}; */

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

const GuestItem = styled.li`
  background-color: ${({ theme }) => theme.colors.background};
  /* background-color: ${({ theme }) => rgba("white", 0.05)}; */

  width: 100%;
  padding: 0.5rem;
  margin: 0.25rem 0;
  border-radius: 4px;
  /* box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.1); */

  /* border: 1px solid ${({ theme }) =>
    rgba(theme.colors.onBackground, 0.15)}; */

  display: flex;
  align-items: center;

  .guest-name {
    color: ${({ theme }) => theme.colors.onBackground};
    font-style: italic;
    flex: 1;
  }
`;

const bitSpacing = css`
  margin-right: 0.5rem;
`;

const GuestTypeBit = styled(DetailBit)`
  ${bitSpacing}

  background-color: ${({ theme, text }) =>
    text === "r" ? theme.colors.error : "#5aa979"};

  p {
    color: white;
  }
`;

const PartySizeBit = styled(DetailBit)`
  ${bitSpacing}
  background-color: ${({ theme }) => rgba(theme.colors.onBackground, 0.9)};

  p {
    color: ${({ theme }) => theme.colors.onPrimary};
  }
`;

const GLExtras = styled.div`
  width: 100%;
  /* margin: 0 1rem; */

  background-color: ${({ theme }) => theme.colors.background};

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

  border-radius: 0;
  background-color: transparent;

  width: 4rem;
  min-width: 4rem;
  height: 4rem;
  min-height: 4rem;

  .btn-icon {
    svg {
      width: 1.5rem;
      height: 1.5rem;
      path {
        fill: ${({ theme }) => theme.colors.onBackground};
      }
    }
  }

  &:hover {
    background-color: ${({ theme }) => rgba("black", 0.05)};

    .btn-icon {
      svg {
        path {
          fill: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }
`;

const ExtrasDropdownButton = styled(HeaderButton)`
  .btn-icon {
    svg {
      transition: transform 200ms ease-out;
      transform: ${({ glExtrasOpen }) =>
        glExtrasOpen ? css`rotate(-180deg)` : css`rotate(0)`};
      path {
      }
    }
  }
`;

const SeatedCheckButton = styled(Button)`
  background-color: #5aa979;

  .btn-icon {
    svg {
      path {
        fill: ${({ theme }) => "white"};
      }
    }
  }
`;

const GuestList = () => {
  const [guestList, setGuestList] = useState([]);
  const [glExtrasOpen, setGlExtrasOpen] = useState(true);

  const toggleGLextras = () => {
    setGlExtrasOpen(!glExtrasOpen);
  };

  useEffect(() => {
    setGuestList(GUESTLIST);
  }, [guestList]);

  return (
    <GuestListContainer>
      <HeaderContainer>
        <div className="btn-container">
          <ExtrasDropdownButton
            type="circle"
            glExtrasOpen={glExtrasOpen}
            icon={BsCaretDownFill}
            css={css`
              .btn-icon {
                svg {
                  width: 1.2rem;
                  height: 1.2rem;
                }
              }
            `}
            onClick={toggleGLextras}
          />
        </div>
        <h1>Guest List</h1>
        <div className="btn-container">
          <HeaderButton type="circle" icon={MdAddBox} />
        </div>
      </HeaderContainer>

      <GLExtras glExtrasOpen={glExtrasOpen}>
        filter, sort, other extra features here
      </GLExtras>

      <ListContainer className="guest-list">
        {guestList.map((guest, i) => (
          <GuestItem key={i}>
            <GuestTypeBit text={guest.reserve ? "r" : "w"} />
            <PartySizeBit text={guest.party} />
            {/* {guest.reserve? <ReserveIcon/>: <WaitListIcon/>} */}
            <p className="guest-name">{guest.name}</p>
            <SeatedCheckButton type="circle" icon={ImCheckmark} />
          </GuestItem>
        ))}
      </ListContainer>

      <div className="add-btn-container">
        {/* <AddToGuestListButton
          text="reservation"
          icon={IoMdAddCircle}
          reverse
          css={css`
            margin-right: 1rem;
          `}
        />
        <AddToGuestListButton text="waitlist" icon={IoMdAddCircle} reverse /> */}
      </div>
    </GuestListContainer>
  );
};

export default GuestList;
