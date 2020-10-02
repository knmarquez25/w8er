import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// custom components:
import FormInput from "./inputs/FormInput";
import Button from "./buttons/Button";

const AddGuestContainer = styled.form`
  width: 100%;
  /* margin: 0 1rem; */

  background-color: ${({ theme }) => theme.colors.background};

  transition-property: height, padding;
  transition-duration: 200ms;
  transition-timing-function: ease-out;

  height: ${({ addGuestOpen }) => (addGuestOpen ? "20rem" : "0")};

  overflow: hidden;

  padding: ${({ addGuestOpen }) => (addGuestOpen ? "0.5rem" : "0")};

  color: ${({ theme }) => theme.colors.onBackground};
`;

const AddGuestButton = styled(Button)`
  width: 100%;
  /* margin: 0 1rem; */

  background-color: ${({ theme }) => theme.colors.primary};

  transition: height 200ms ease-out;

  color: ${({ theme }) => theme.colors.onBackground};
`;

const INITIAL_GUEST = {
  name: "",
  party: "",
  phone: "",
  time: new Date(),
  table: "",
  notes: "",
  reserveTime: "",
};

const AddGuest = ({ handleChange, addGuestOpen, ...props }) => {
  const [guest, setGuest] = useState(INITIAL_GUEST);

  return (
    <AddGuestContainer {...props} addGuestOpen={addGuestOpen}>
      <FormInput
        type="text"
        htmlFor="name"
        label="name"
        value={guest.name}
        handleChange={(e) => {
          setGuest({ ...guest, name: e.target.value });
        }}
      />

      <FormInput
        type="text"
        htmlFor="party"
        label="party size"
        value={guest.party}
        handleChange={(e) => {
          setGuest({ ...guest, party: e.target.value });
        }}
      />

      <FormInput
        type="date"
        htmlFor="reservation time"
        label="reservation time"
        value={guest.reserveTime}
        handleChange={(e) => {
          setGuest({ ...guest, reserveTime: e.target.value });
        }}
      />

      <AddGuestButton
        text="confirm guest"
        onClick={(e) => {
          e.preventDefault();
          handleChange(guest);
          setGuest(INITIAL_GUEST);
        }}
      />
    </AddGuestContainer>
  );
};

export default AddGuest;
