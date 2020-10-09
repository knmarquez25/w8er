import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import FormInput from "../components/inputs/FormInput";
import Button from "../components/buttons/Button";
import { SiDblp } from "react-icons/si";
import { GrAdd } from "react-icons/gr";

import { useHistory } from "react-router-dom";

const WLContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  /* background-color: blue; */
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.form`
  background-color: ${({ theme }) => theme.colors.surface};
  /* background-color: red; */
  width: 40%;
  height: 80%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* overflow: hidden; */
  overflow: auto;
`;

const WLFormInput = styled(FormInput)`
  /* input {
    background-color: ${({ theme }) => theme.colors.background};
  }

  label {
    color: white;
  } */
  min-width: 80%;

  margin-bottom: 2rem;
`;

const INITIAL = {
  name: "",
  phone: "",
  party: "",
  notes: "",
};

const IconWrapper = styled.div`
  svg {
    width: 5rem;
    height: 5rem;
    path {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const AddIcon = styled(GrAdd)`
  width: 20rem;
  height: 20rem;
  path {
    fill: ${({ theme }) => theme.colors.primary};
  }
`;

const WaitlistPage = () => {
  const history = useHistory();
  const [formValues, setFormValues] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  return (
    <WLContainer>
      <FormContainer
        onSubmit={(e) => {
          e.preventDefault();
          console.log("formvalues", formValues);
          setSubmitted(true);

          setFormValues(INITIAL);

          history.push("/waitlist-complete");
        }}
      >
        {/* ADD SEARCH INPUT COMPONENT */}
        <AddIcon></AddIcon>

        <WLFormInput
          required
          className="FORM INPUTTTTTTTTTTTTTT"
          htmlFor="name"
          label="name"
          value={formValues.name}
          handleChange={(e) => {
            setFormValues({ ...formValues, name: e.target.value });
          }}
          additionalInfo="(5 characters only)"
          maxLength={5}
        />
        <WLFormInput
          htmlFor="phone"
          label="phone"
          value={formValues.phone}
          handleChange={(e) => {
            setFormValues({ ...formValues, phone: e.target.value });
          }}
        />
        <WLFormInput
          htmlFor="party"
          label="party"
          value={formValues.party}
          handleChange={(e) => {
            setFormValues({ ...formValues, party: e.target.value });
          }}
        />
        <WLFormInput
          htmlFor="notes"
          label="notes"
          value={formValues.notes}
          handleChange={(e) => {
            setFormValues({ ...formValues, notes: e.target.value });
          }}
        />

        <Button text="Waitlist now!"></Button>

        {submitted ? (
          <Button text="cool you're done" icon={GrAdd}></Button>
        ) : null}
        {/* {submitted && <Button text="cool you're done"></Button>} */}
      </FormContainer>
    </WLContainer>
  );
};

export default WaitlistPage;
