import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";

// custom components:
import FormInput from "./inputs/FormInput";
import Button from "./buttons/Button";
import SelectSlider from "./inputs/SelectSlider";

const spacing = css`
  margin-bottom: 1rem;
`;

const AddGuestContainer = styled.form`
  background-color: ${({ theme }) => theme.colors.surface};
  width: 100%;
  height: ${({ addGuestOpen }) => (addGuestOpen ? "40rem" : "0")};
  padding: ${({ addGuestOpen }) => (addGuestOpen ? "0.5rem" : "0")};
  border-bottom: ${({ addGuestOpen, theme }) =>
    addGuestOpen ? `1px solid ${rgba(theme.colors.onBackground, 0.1)}` : "0"};

  overflow: auto;

  color: ${({ theme }) => theme.colors.onBackground};

  transition-property: height, padding;
  transition-duration: 200ms;
  transition-timing-function: ease-out;

  /* border-bottom: 1px solid
    ${({ theme }) => rgba(theme.colors.onBackground, 0.1)}; */
`;

const AddGuestButton = styled(Button)`
  width: 100%;
  /* margin: 0 1rem; */

  background-color: ${({ theme }) => theme.colors.primary};

  transition: height 200ms ease-out;

  color: ${({ theme }) => theme.colors.onBackground};
`;

const INITIAL_GUEST = {
  name: "", // easy (completed)
  party: "", // hard (completed)
  phone: "", // hard
  table: "", // hard (completed)
  notes: "", // text area easy
  tableAssigned: "",
  reserveTime: "", // time that the guest reserves (use this variable to check if waitlist or reservation)
  waitTime: new Date(), // time that the guest STARTS waiting (when the entry is confirmed)
  seatedTime: "", // time that the guest is seated
  departureTime: "", // time that the guest finishes eating and leaves
};

const PARTY_ARRAY = [...Array(50).keys()];
const TABLE_ARRAY = (() => {
  const array = [];

  for (let i = 0; i < 25; i++) {
    const randomLetter = String.fromCharCode(
      Math.floor(Math.random() * (97 - 122) + 122)
    ).toUpperCase();

    const randomNum = Math.floor(Math.random() * (0 - 9) + 9);
    array.push(`${randomLetter}${randomNum}`);
  }

  return array;
})();

const AddGuest = ({ handleChange, addGuestOpen, ...props }) => {
  const [guest, setGuest] = useState(INITIAL_GUEST);

  return (
    <AddGuestContainer
      {...props}
      addGuestOpen={addGuestOpen}
      onSubmit={(e) => {
        e.preventDefault();
        handleChange(guest);
        console.log("guest", guest);
        setGuest(INITIAL_GUEST);
      }}
    >
      <FormInput
        required
        type="text"
        htmlFor="name"
        label="name"
        value={guest.name}
        handleChange={(e) => {
          setGuest({ ...guest, name: e.target.value });
        }}
        css={spacing}
      />

      <SelectSlider
        label="party size"
        options={PARTY_ARRAY}
        value={guest.party}
        handleChange={(val) => {
          setGuest({ ...guest, party: val });
        }}
        css={spacing}
      />

      <FormInput
        required
        type="tel"
        htmlFor="phone number"
        label="phone number"
        value={guest.phone}
        handleChange={(e) => {
          setGuest({ ...guest, phone: e.target.value });
        }}
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        css={spacing}
      />

      <FormInput
        type="text"
        htmlFor="notes"
        label="notes"
        value={guest.notes}
        handleChange={(e) => {
          setGuest({ ...guest, notes: e.target.value });
        }}
        css={spacing}
      />

      <FormInput
        type="datetime-local"
        htmlFor="reservation time"
        label="reservation time"
        value={guest.reserveTime}
        handleChange={(e) => {
          setGuest({ ...guest, reserveTime: e.target.value });
        }}
        css={spacing}
      />

      {guest.reserveTime && (
        <SelectSlider
          label="seating"
          options={TABLE_ARRAY}
          value={guest.tableAssigned}
          handleChange={(val) => {
            setGuest({ ...guest, tableAssigned: val });
          }}
          css={spacing}
        />
      )}

      <AddGuestButton
        text="confirm guest"
        // onClick={(e) => {
        //   e.preventDefault();
        //   handleChange(guest);
        //   console.log("guest", guest);
        //   setGuest(INITIAL_GUEST);
        // }}
      />
    </AddGuestContainer>
  );
};

export default AddGuest;
