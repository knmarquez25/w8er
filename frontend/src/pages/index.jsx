import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// custom components:
import Button from "../components/buttons/Button";
import FormInput from "../components/inputs/FormInput";

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

const index = (props) => {
    return (
        <div>
            <div>
                <h1>Waitlist Page</h1>
            </div>
            <div>
                <h1>Reserve</h1>
            </div>
            <div>
                <h1>StoreOwner</h1>
            </div>
        </div>
    );

};

export default index; 