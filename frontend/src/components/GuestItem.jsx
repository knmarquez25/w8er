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

  cursor: pointer;

  height: 3.5rem;
  min-height: 3.5rem;

  overflow: hidden;

  display: flex;
  align-items: center;

  .guest-name {
    cursor: inherit;

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
    user-select: none;
  }
`;

const ItemDetails = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  height: ${({ itemExpand }) => (itemExpand ? "24rem" : 0)};
  padding: ${({ itemExpand }) => (itemExpand ? "1rem" : 0)};

  width: 100%;

  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.outline};

  overflow: hidden;
  transition-property: height, padding;
  transition-duration: 200ms;
  transition-timing-function: ease-out;

  color: ${({ theme }) => theme.colors.onBackground};

  display: flex;
  flex-direction: column;
`;

const fontColor = css`
  color: inherit;

  .label,
  .value {
    color: inherit;
  }

  .label {
    font-weight: bold;
  }

  .value {
    font-size: 1.05rem;
  }
`;

const spacing = css`
  margin-bottom: 1.5rem;
`;

const MainInfoWrapper = styled.div`
  color: inherit;
  width: 100%;
  /* background-color: red; */

  display: flex;
  flex-direction: row;

  ${spacing};
`;

const MainInfo = styled.div`
  ${fontColor}

  /* background-color: lightblue; */
  flex: 1;

  .value {
    font-size: 2rem;
    font-weight: bold;
  }
`;

const SubInfo = styled.div`
  ${fontColor}
  display: flex;

  margin-bottom: 0.5rem;
  .label,
  .value {
    flex: 1;
  }
`;

const PhoneInfo = styled.div`
  ${fontColor}
`;

const Notes = styled.div`
  ${fontColor}
  padding-top: 1rem;
  border-top: 2px solid ${({ theme }) => theme.colors.outline};

  .label {
    margin-bottom: 0.5rem;
  }

  .value {
    /* background-color: red; */
    height: 6rem;
    overflow: auto;
  }
`;

const GuestTypeBit = styled(DetailBit)`
  border-radius: 4px;
  /* margin-left: 0.4rem; */
  cursor: inherit;

  background-color: ${({ theme, text }) =>
    text.toLowerCase() === "r" ? theme.colors.error : theme.colors.primary};

  p {
    color: white;
  }
`;

const PartySizeBit = styled(DetailBit)`
  cursor: inherit;

  margin-left: 2rem;
  background-color: ${({ theme }) => rgba(theme.colors.onBackground, 0.9)};
  background-color: transparent;
  box-shadow: none;

  p {
    color: ${({ theme }) => theme.colors.onBackground};
  }
`;

const GuestItem = ({
  guestInfo,
  currentTime,
  line,
  handleChange = () => {},
}) => {
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

  const formatPhone = (phoneNumber) => {
    var cleaned = ("" + phoneNumber).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return "(" + match[1] + ") " + match[2] + " " + match[3];
    }
    return null;
  };

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = ("0" + minutes).slice(-2);
    var strTime = hours + ":" + minutes + ampm;
    return strTime;
  }

  const formatReserveTime = (datetime) => {
    const date =
      datetime.getMonth() +
      "." +
      datetime.getDate() +
      "." +
      datetime.getFullYear();

    const time24H = datetime.getHours() + ":" + datetime.getMinutes();
    const time12H = formatAMPM(datetime);

    return date + " @ " + time12H;
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
        <MainInfoWrapper>
          <MainInfo>
            {!guestInfo.reserveTime && (
              <React.Fragment>
                <p className="label">Waited For:</p>
                <p className="value">
                  {guestInfo.waitTime
                    ? getCurrentTimeDelta(guestInfo.waitTime)
                    : null}
                </p>
              </React.Fragment>
            )}
            {guestInfo.reserveTime && (
              <React.Fragment>
                <p className="label">Reservation:</p>
                <p className="value">
                  {formatReserveTime(guestInfo.reserveTime)}
                </p>
              </React.Fragment>
            )}
          </MainInfo>

          {!guestInfo.reserveTime && (
            <MainInfo>
              <p className="label"># in line:</p>
              <p className="value">{line ? line : "Seated"}</p>
            </MainInfo>
          )}
        </MainInfoWrapper>
        <SubInfo>
          <p className="label">Table Requested:</p>
          <p className="value">{guestInfo.table ? guestInfo.table : "Any"}</p>
        </SubInfo>
        <SubInfo css={spacing}>
          <p className="label">Table Assigned:</p>
          <p className="value">
            {guestInfo.tableAssigned ? guestInfo.tableAssigned : "N/A"}
          </p>
        </SubInfo>
        <PhoneInfo
          css={css`
            margin-bottom: 1rem;
          `}
        >
          <SubInfo>
            <p className="label">Phone #:</p>
            <p className="value">{formatPhone(guestInfo.phone)}</p>
          </SubInfo>
        </PhoneInfo>
        <Notes>
          <p className="label">Notes:</p>
          <p className="value">
            {guestInfo.notes
              ? guestInfo.notes
              : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur quaerat voluptas hic veniam quod maxime tempore labore modi unde iure fugiat alias pariatur quia sapiente laboriosam quo, nisi explicabo nulla."}
          </p>
        </Notes>
      </ItemDetails>
    </ItemWrapper>
  );
};

export default GuestItem;
