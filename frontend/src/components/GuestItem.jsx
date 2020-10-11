import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";

// custom components:
import Button from "./buttons/Button";
import GlowButton from "./buttons/GlowButton";
import DetailBit from "./DetailBit";

// icons:
import { ImCheckmark } from "react-icons/im";
import { useTheme } from "emotion-theming";

const ItemWrapper = styled.li`
  width: 100%;
  margin: 0.25rem 0;
`;

const GuestItemContainer = styled.div`
  /* box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.10); */

  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  padding: 0 0.75rem;
  border-radius: 4px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  height: 3.5rem;
  min-height: 3.5rem;

  overflow: hidden;

  display: flex;
  align-items: center;

  .guest-name {
    cursor: default;

    color: ${({ theme }) => theme.colors.onBackground};
    /* font-style: italic; */
    text-transform: capitalize;
    flex: 1;

    white-space: nowrap;

    display: flex;
    /* justify-content: center; */
    margin-left: 2rem;
    user-select: none;
  }

  .waited-time {
    color: ${({ theme }) => theme.colors.onBackground};
    font-style: italic;
  }
`;

const ItemDetails = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  height: ${({ itemExpand }) => (itemExpand ? "20rem" : 0)};
  /* padding: ${({ itemExpand }) => (itemExpand ? "1rem" : 0)}; */

  width: 100%;

  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.outline};

  overflow: hidden;
  transition-property: height, padding;
  transition-duration: 200ms;
  transition-timing-function: ease-out;

  p {
    padding: 0.5rem;
    /* min-height: 2.5rem; */
    color: ${({ theme }) => theme.colors.onBackground};
    font-weight: bold;
    font-size: 1rem;
    width: 100%;

    display: flex;
    align-items: center;
    /* justify-content: center;
    align-items: center; */

    /* border-bottom: 2px solid ${({ theme }) => theme.colors.primary}; */
    span {
      /* border: 1px solid ${({ theme }) => theme.colors.primary}; */
      /* background-color: #fff; */
      width: 45%;
      min-width: 45%;
      color: ${({ theme }) => theme.colors.onBackground};

      /* font-weight: bold; */

      padding-right: 1rem;

      display: flex;
      flex-direction: row-reverse;
    }
  }

  p:nth-of-type(2n) {
    /* background-color: ${({ theme }) => theme.colors.background}; */
  }

  p:nth-of-type(2n + 1) {
    /* background-color: ${({ theme }) => theme.colors.surface}; */
  }
`;

const GuestTypeBit = styled(DetailBit)`
  border-radius: 4px;
  /* margin-left: 0.4rem; */

  background-color: ${({ theme, text }) =>
    text.toLowerCase() === "r" ? theme.colors.error : theme.colors.primary};

  p {
    color: white;
  }
`;

const PartySizeBit = styled(DetailBit)`
  margin-left: 2rem;
  background-color: ${({ theme }) => rgba(theme.colors.onBackground, 0.9)};
  background-color: transparent;
  box-shadow: none;

  p {
    color: ${({ theme }) => theme.colors.onBackground};
  }
`;

const GuestItem = ({ guestInfo, currentTime, handleChange = () => {} }) => {
  const [itemExpand, setItemExpand] = useState(false);
  const theme = useTheme();

  const getCurrentTimeDelta = (time) => {
    const currenttime = currentTime ? currentTime : new Date();
    const timeDelta = Math.floor(
      (currenttime.getTime() - time.getTime()) / 1000
    );

    if (timeDelta < 60) return `< 1m`;
    else if (timeDelta < 3600) return `${Math.floor(timeDelta / 60)}m`;
    else
      return `${Math.floor(timeDelta / 3600)}h ${Math.floor(timeDelta % 60)}m`;
  };

  return (
    <ItemWrapper>
      <GuestItemContainer
        itemExpand={itemExpand}
        onClick={(e) => {
          setItemExpand(!itemExpand);
        }}
        // onTouchStart={() => {
        //   setItemExpand(!itemExpand);
        // }}
      >
        <GuestTypeBit text={guestInfo.reserveTime ? "r" : "w"} />
        <PartySizeBit text={guestInfo.party} />
        <p className="guest-name">{guestInfo.name}</p>
        {itemExpand && !guestInfo.seated && (
          <GlowButton
            icon={ImCheckmark}
            color={theme.colors.correct}
            effectOpacity={0.25}
            onClick={(e) => {
              e.stopPropagation();
              console.log("hellooooo");
              setItemExpand(!itemExpand);
              handleChange({ ...guestInfo, seated: true });
            }}
          />
        )}
        {!itemExpand && (
          <p className="waited-time">
            {getCurrentTimeDelta(guestInfo.waitTime)}
          </p>
        )}
      </GuestItemContainer>
      <ItemDetails itemExpand={itemExpand}>
        <p>
          <span>Notes</span>
          {guestInfo.notes}
        </p>
        <p>
          <span>Party Size</span>
          {guestInfo.party}
        </p>
        <p>
          <span>Phone #</span>
          {guestInfo.phone}
        </p>
        <p>
          <span>Table Requested</span>
          {guestInfo.table}
        </p>
        <p>
          <span>Table Assigned</span>
          {guestInfo.tableAssigned}
        </p>
        <p>
          <span>Reservation </span>
          {guestInfo.reserveTime ? guestInfo.reserveTime.getTime() : null}
        </p>
        <p>
          <span>Waited for </span>
          {guestInfo.waitTime ? getCurrentTimeDelta(guestInfo.waitTime) : null}
        </p>
        <p>
          <span>Departure</span>
          {guestInfo.departureTime ? guestInfo.departureTime.getTime() : null}
        </p>
      </ItemDetails>
    </ItemWrapper>
  );
};

export default GuestItem;
