import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// icons:
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const shrink = (props) => css`
  top: 0.25rem;
  left: 0.2rem;

  font-size: 0.9rem;

  font-weight: bold;
  color: ${props.theme.colors.onBackground};

  letter-spacing: 0;
  pointer-events: auto;
`;

const FormInputContainer = styled.div`
  position: relative;
  /* outline: none; */
  /* margin-top: 1.7rem; */
  padding-top: 1.7rem;

  /* height: 2.2rem; */
  /* min-width: 10rem; */

  input[type="password"] {
    letter-spacing: 0.15rem;
    font-size: 1.5rem;
  }

  input[type="datetime-local"] {
    color: ${({ theme, value }) => (value ? "#111" : theme.colors.onSurface)};

    &:focus-within,
    &:focus {
      color: #111;
    }
  }

  &:focus-within,
  &:focus {
    label {
      ${shrink}
    }
  }
`;

const InputField = styled.input`
  background-color: ${({ theme }) => theme.colors.onSurface};
  height: 2.2rem;

  width: 100%;
  padding: 0 0.8rem;
  border-radius: 4px;

  color: black;
  font-size: 1rem;
  letter-spacing: 1px;

  white-space: nowrap;

  &:focus,
  &:focus-within,
  &:hover {
    border-bottom: 4px solid ${(props) => props.theme.colors.primary};
  }

  &:read-only {
    background-color: #ececec;
    cursor: not-allowed;
  }
`;

const InputLabel = styled.label`
  text-transform: uppercase;
  color: black;
  font-size: 1rem;
  font-weight: normal;
  letter-spacing: 0.05rem;
  white-space: nowrap;

  position: absolute;
  pointer-events: none;
  left: 0.6rem;
  top: 2.1rem;

  transition-property: top, left, font-size, font-weight, color, letter-spacing;
  transition-duration: 200ms;
  transition-timing-function: ease;

  &.shrink {
    ${shrink}
  }

  .required-asterisk {
    font-weight: bold;
    font-size: 1em;
    color: ${(props) => props.theme.colors.error};
  }

  .additional-info {
    color: inherit;
    font-weight: bold;
    font-style: italic;
    text-transform: lowercase;

    font-size: 0.8em;
  }
`;

const VisibilityContainer = styled.div`
  cursor: pointer;

  height: 100%;

  margin-right: 0.5rem;

  position: absolute;
  bottom: -0.8rem;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    /* background-color: red; */
    height: 1.5rem;
    width: 1.5rem;

    path {
      fill: #373e4d;
    }
  }

  &:hover {
    svg {
      path {
        fill: $primary;
      }
    }
  }
`;

const ErrorMsg = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-weight: bold;
  font-size: 0.8em;
  text-transform: uppercase;

  position: absolute;
  top: 4px;
  right: 0;
`;

const FormInput = ({
  id,
  handleChange,
  label,
  className,
  type,
  htmlFor, // used for accessibility
  additionalInfo,
  disabled,
  error,
  value,
  ...props
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {}, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const determineInputType = () => {
    if (type === "password" && passwordVisible === true) return "text";
    else if (type === "password") return "password";
    else return type;
  };

  return (
    <FormInputContainer id={id} className={className} value={value}>
      {label ? (
        <InputLabel htmlFor={htmlFor} className={`${value ? "shrink" : ""}`}>
          <React.Fragment>
            {label}
            {props.required ? (
              <span className="required-asterisk">*</span>
            ) : null}
            {additionalInfo ? (
              <span className="additional-info">{` ${additionalInfo}`}</span>
            ) : null}
          </React.Fragment>
        </InputLabel>
      ) : null}

      {type !== "textarea" ? (
        <React.Fragment>
          {error ? <ErrorMsg>{` ${error}`}</ErrorMsg> : null}
          <InputField
            {...props}
            id={htmlFor}
            type={determineInputType()}
            onChange={handleChange}
            disabled={disabled}
            value={value}
          ></InputField>
        </React.Fragment>
      ) : null}

      {type === "password" ? (
        <VisibilityContainer onClick={togglePasswordVisibility}>
          {passwordVisible ? <MdVisibilityOff /> : <MdVisibility />}
        </VisibilityContainer>
      ) : null}
    </FormInputContainer>
  );
};

export default FormInput;
