import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";

// custom components:
import Button from "./buttons/Button";
import DetailBit from "./DetailBit";

// icons:
import { ImCheckmark } from "react-icons/im";

const ItemWrapper = styled.li`
  width: 100%;
  margin: 0.25rem 0;
`;

const GuestItemContainer = styled.div`
  /* box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.10); */

  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  padding-left: 0.5rem;
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
    font-style: italic;
    flex: 1;

    white-space: nowrap;

    display: flex;
    justify-content: center;
    user-select: none;
  }
`;

const ItemDetails = styled.div`
  background-color: ${({ theme }) => theme.colors.outline};
  height: ${({ itemExpand }) => (itemExpand ? "15rem" : 0)};
  padding: ${({ itemExpand }) => (itemExpand ? "1rem" : 0)};

  width: 100%;

  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.outline};

  overflow: hidden;
  transition-property: height, padding;
  transition-duration: 200ms;
  transition-timing-function: ease-out;

  p {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    font-size: 1.2rem;

    span {
      color: ${({ theme }) => theme.colors.onBackground};

      font-weight: bold;
    }
  }
`;

const bitSpacing = css`
  margin-right: 0.5rem;
`;

const GuestTypeBit = styled(DetailBit)`
  ${bitSpacing}

  margin-left: 0.5rem;

  background-color: ${({ theme, text }) =>
    text === "r" ? theme.colors.error : theme.colors.correct};

  p {
    color: white;
  }
`;

const PartySizeBit = styled(DetailBit)`
  ${bitSpacing}
  background-color: ${({ theme }) => rgba(theme.colors.onBackground, 0.9)};

  p {
    color: ${({ theme }) => theme.colors.background};
  }
`;

const SeatedCheckButton = styled(Button)`
  background-color: ${({ theme }) => rgba(theme.colors.onBackground, 0.1)};
  background-color: #37d7b2;

  margin-right: 0.75rem;
  box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.20);

  /* border-radius: 0; */
  height: 2rem;
  width: 2rem;

  .btn-icon {
    svg {
      path {
        /* fill: ${({ theme }) => theme.colors.onBackground}; */
        fill: ${({ theme }) => "white"};
      }
    }
  }

  &:hover {
    /* background-color: ${({ theme }) => theme.colors.correct}; */
    background-color: #37d7b2;
    .btn-icon {
      svg {
        path {
          fill: white;
          /* fill: ${({ theme }) => "white"}; */
        }
      }
    }
  }
`;

const GuestItem = ({ guestInfo, currentTime, handleChange = () => {} }) => {
  const [itemExpand, setItemExpand] = useState(false);

  const getCurrentTimeDelta = (time) => {
    const currenttime = currentTime ? currentTime : new Date();
    const timeDelta = Math.floor(
      (currenttime.getTime() - time.getTime()) / 1000
    );

    if (timeDelta < 60) return `less than a minute`;
    else if (timeDelta < 3600) return `${Math.floor(timeDelta / 60)} minute(s)`;
    else
      return `${Math.floor(timeDelta / 3600)} hour(s) ${Math.floor(
        timeDelta % 60
      )} minute(s)`;
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
        {itemExpand && (
          <SeatedCheckButton
            type="circle"
            icon={ImCheckmark}
            onClick={(e) => {
              e.stopPropagation();
              console.log("hellooooo");
              setItemExpand(!itemExpand);
              handleChange({ ...guestInfo, seated: true });
            }}
          />
        )}
      </GuestItemContainer>
      <ItemDetails itemExpand={itemExpand}>
        <p>
          <span>Notes: </span>
          {guestInfo.notes}
        </p>
        <p>
          <span>Party Size: </span>
          {guestInfo.party}
        </p>
        <p>
          <span>Phone: </span>
          {guestInfo.phone}
        </p>
        <p>
          <span>Table Requested: </span>
          {guestInfo.table}
        </p>
        <p>
          <span>Table Assigned: </span>
          {guestInfo.tableAssigned}
        </p>
        <p>
          <span>Reservation: </span>
          {guestInfo.reserveTime ? guestInfo.reserveTime.getTime() : null}
        </p>
        <p>
          <span>Waited for: </span>
          {guestInfo.waitTime ? getCurrentTimeDelta(guestInfo.waitTime) : null}
        </p>
        <p>
          <span>Departure: </span>
          {guestInfo.departureTime ? guestInfo.departureTime.getTime() : null}
        </p>
      </ItemDetails>
    </ItemWrapper>
  );
};

export default GuestItem;
