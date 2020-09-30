import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// custom components:
import Button from "./buttons/Button";
import FormInput from "./inputs/FormInput";

// icons:
import { MdAdd } from "react-icons/md";

const ExampleContainer = styled.div`
  width: 100%;
`;

const inputStyles = (theme) => css`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  input {
    background-color: ${theme.colors.onSurface};
  }
`;

const buttonStyles = (theme) => css`
  ${inputStyles(theme)}
  width: 100%;

  .btn-icon {
    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

const Example = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  useEffect(() => {}, [name, email, password, password2]);

  return (
    <ExampleContainer>
      <FormInput
        type="password"
        htmlFor="name"
        label="name"
        value={name}
        handleChange={(e) => {
          setName(e.target.value);
        }}
        css={inputStyles}
      />

      <FormInput
        required
        type="email"
        htmlFor="email"
        label="email"
        value={email}
        handleChange={(e) => {
          setEmail(e.target.value);
        }}
        css={inputStyles}
      />

      <FormInput
        required
        type="password"
        htmlFor="password"
        label="password"
        value={password}
        handleChange={(e) => {
          setPassword(e.target.value);
        }}
        additionalInfo="(8 characters minimum)"
        css={inputStyles}
      />

      <FormInput
        required
        type="password"
        htmlFor="confirm password"
        label="confirm password"
        value={password2}
        handleChange={(e) => {
          setPassword2(e.target.value);
        }}
        css={inputStyles}
      />

      <Button text="waitlist" icon={MdAdd} css={buttonStyles} />
      <Button text="reservation" icon={MdAdd} css={buttonStyles} />
    </ExampleContainer>
  );
};

export default Example;
