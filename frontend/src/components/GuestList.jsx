import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";

// state management:
import { useRecoilValue } from "recoil";
import { sidebarState } from "../recoil/SidebarState";

// custom components:
import Button from "./buttons/Button";
import DetailBit from "./DetailBit";
import AddGuest from "./AddGuest";
import DrawerHeader from "./DrawerHeader";
import GuestItem from "./GuestItem";

// icon:
import { IoMdAddCircle } from "react-icons/io";
import { ImCheckmark } from "react-icons/im";
import { MdAddBox } from "react-icons/md";
import { FaCaretSquareDown } from "react-icons/fa";
import { AiOutlineCaretDown } from "react-icons/ai";
import { BsCaretDownFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import GlowButton from "./buttons/GlowButton";

const shortid = require("shortid");

const GUESTLIST = [
  {
    test: new Date("2020-10-10T03:32:00").getTime(),
    waitTime: new Date("2020-10-10T03:32:00"),
    id: shortid.generate(),
    seated: false,
    name: "ricky  bobby",
    party: "2",
    phone: "555-555-4352",
    table: "",
    notes: "bring food",
    tableAssigned: "",
    reserveTime: "",
    seatedTime: "",
    departureTime: "",
  },
  {
    test: new Date("2020-09-09T03:56:00").getTime(),
    waitTime: new Date("2020-09-09T03:56:00"),
    id: shortid.generate(),
    seated: false,
    name: "Lebron sucks",
    party: "13",
    phone: "310-135-4352",
    table: "",
    notes: "i'm thinking about dropping danny green for missing that last 3",
    tableAssigned: "",
    reserveTime: "",
    seatedTime: "",
    departureTime: "",
  },
  {
    test: new Date("2020-10-10T03:36:00").getTime(),
    waitTime: new Date("2020-10-10T03:36:00"),
    id: shortid.generate(),
    seated: false,
    name: "michael jackson",
    party: "4",
    phone: "123-565-5685",
    table: "",
    notes: "",
    tableAssigned: "",
    reserveTime: "",
    seatedTime: "",
    departureTime: "",
  },
  {
    test: new Date("2020-10-10T03:14:00").getTime(),
    waitTime: new Date("2020-10-10T03:14:00"),
    id: shortid.generate(),
    seated: false,
    name: "john cena",
    party: "10",
    phone: "565-565-7894",
    table: "2A",
    notes: "",
    tableAssigned: "",
    reserveTime: new Date(),
    seatedTime: "",
    departureTime: "",
  },
  {
    test: new Date("2020-10-10T03:26:00").getTime(),
    waitTime: new Date("2020-10-10T03:26:00"),
    id: shortid.generate(),
    seated: false,
    name: "t pain",
    party: "1",
    phone: "456-789-1238",
    table: "",
    notes: "",
    tableAssigned: "",
    reserveTime: "",

    seatedTime: "",
    departureTime: "",
  },
  {
    test: new Date("2020-10-10T03:25:00").getTime(),
    waitTime: new Date("2020-10-10T03:25:00"),
    id: shortid.generate(),
    seated: true,
    name: "t pain",
    party: "1",
    phone: "456-789-1238",
    table: "",
    notes: "",
    tableAssigned: "",
    reserveTime: "",

    seatedTime: "",
    departureTime: "",
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

  /* HIDE BASED OFF sidebarOpen */
  /* overflow-y: hidden; */
  ${({ sidebarOpen }) =>
    !sidebarOpen
      ? css`
          overflow-y: hidden;
        `
      : null}

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

const ListContainer = styled.ul`
  width: 100%;
  padding: 0.5rem;

  /* flex: 1; */

  display: flex;
  flex-direction: column;
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

const GuestList = () => {
  const [guestList, setGuestList] = useState(GUESTLIST);
  const [currentTime, setCurrentTime] = useState(false);
  const sidebarOpen = useRecoilValue(sidebarState);

  useEffect(() => {
    let timer = null;

    timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const addGuestItem = (guestItem) => {
    setGuestList([...guestList, guestItem]);
  };

  const updateGuestItem = (guestItem) => {
    const deleteIndex = guestList.findIndex(
      (guest, i) => guest.id === guestItem.id
    );

    const updatedItems = [
      ...guestList.slice(0, deleteIndex),
      ...guestList.slice(deleteIndex + 1, guestList.length),
      guestItem,
    ].sort((a, b) => {
      const wtA = a.waitTime.getTime();
      const wtB = b.waitTime.getTime();

      if (wtA > wtB) return 1;
      else if (wtA < wtB) return -1;
      else return 0;
    });

    setGuestList(updatedItems);
  };

  return (
    <GuestListContainer sidebarOpen={sidebarOpen}>
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
        {guestList
          .filter((guest) => !guest.seated)
          .map((guest, i) => (
            <GuestItem
              key={guest.id}
              guestInfo={guest}
              currentTime={currentTime}
              handleChange={updateGuestItem}
            />
          ))}
      </ListContainer>

      <ListContainer className="guest-list">
        {guestList
          .filter((guest) => guest.seated)
          .map((guest, i) => (
            <GuestItem
              key={guest.id}
              guestInfo={guest}
              currentTime={currentTime}
              handleChange={updateGuestItem}
            />
          ))}
      </ListContainer>
    </GuestListContainer>
  );
};

export default GuestList;
