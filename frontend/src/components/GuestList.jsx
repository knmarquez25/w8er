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
import DrawerHeader from "./DrawerHeader";

// icon:
import { IoMdAddCircle } from "react-icons/io";
import { ImCheckmark } from "react-icons/im";
import { MdAddBox } from "react-icons/md";
import { FaCaretSquareDown } from "react-icons/fa";
import { AiOutlineCaretDown } from "react-icons/ai";
import { BsCaretDownFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";

const GUESTLIST = [
  {
    name: "Benjamin Franks",
    party: "6",
    phone: "",
    time: new Date(),
    table: "",
    notes: "",
    reserveTime: "",
  },
  {
    name: "Bob Dole",
    party: "1",
    phone: "",
    time: new Date(),
    table: "",
    notes: "",
    reserveTime: new Date(),
  },
  {
    name: "Rip Harambe",
    party: "0",
    phone: "",
    time: new Date(),
    table: "",
    notes: "",
    reserveTime: "",
  },
  {
    name: "Bee Dull",
    party: "3",
    phone: "",
    time: new Date(),
    table: "",
    notes: "",
    reserveTime: "",
  },
];

const GuestListContainer = styled.div`
  position: relative;
  /* margin: 1rem; */
  width: 100%;
  height: 100%;
  /* padding: 1rem; */

  /* background-color: ${({ theme }) => theme.colors.background}; */
  /* border-radius: 4px; */
  overflow-y: auto;
  /* overflow-y: hidden; */

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  .add-btn-container {
    width: 100%;
    display: flex;
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

    white-space: nowrap;
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

  background-color: ${({ theme }) => theme.colors.surface};

  color: ${({ theme }) => theme.colors.onBackground};

  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: ${({ glExtrasOpen }) => (glExtrasOpen ? "1rem" : "0")}; */
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
  const [guestList, setGuestList] = useState(GUESTLIST);
  useEffect(() => {}, [guestList]);

  const addGuestItem = (guestItem) => {
    setGuestList([...guestList, guestItem]);
  };

  return (
    <GuestListContainer>
      <DrawerHeader
        headerTitle="Guest list"
        drawerComponent1={
          <GLExtras>filter, sort, other extra features here</GLExtras>
        }
        drawerComponent2={
          <AddGuest
            handleChange={(guestItem) => {
              addGuestItem(guestItem);
              // setAddGuestOpen(false);
            }}
            // addGuestOpen={addGuestOpen}
          />
        }
        // handleChange1={(state) => setGlExtrasOpen(state)}
        // handleChange2={(state) => setAddGuestOpen(state)}
      />

      <ListContainer className="guest-list">
        {guestList.map((guest, i) => (
          <GuestItem key={i}>
            <GuestTypeBit text={guest.reserveTime ? "r" : "w"} />
            <PartySizeBit text={guest.party} />
            {/* {guest.reserve? <ReserveIcon/>: <WaitListIcon/>} */}
            <p className="guest-name">{guest.name}</p>
            <SeatedCheckButton type="circle" icon={ImCheckmark} />
          </GuestItem>
        ))}
      </ListContainer>
    </GuestListContainer>
  );
};

export default GuestList;
