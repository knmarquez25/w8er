import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import FormInput from "../components/inputs/FormInput";
import Button from "../components/buttons/Button";
import Login from '../components/Login';
import SignUp from '../components/SignUp';

const Container = styled.div`
  background-color: ${({theme}) => theme.colors.background};
  height: 100%;
  width: 100%;

  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;


const Login_Signup = () => {
  return <Container>
      <Login/>
      <SignUp/>
    </Container>
};

export default Login_Signup;
