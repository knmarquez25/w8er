import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";


import { useHistory } from "react-router-dom";

import FormInput from "../components/inputs/FormInput";
import Button from "../components/buttons/Button";

const LoginContainer = styled.form`
 background-color: ${({theme})=> theme.colors.surface};
  background-color: lightblue;
  width: 40%;
  height: 80%;
  margin: 1rem;

  
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;

`;

const Spacing = css`
  margin-top:1rem;
`;

const INITIAL ={
  email:"",
  password: "",
};

const Login = () => {
  const history = useHistory();
  const [formValues, setValues] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  return ( 
    <LoginContainer
      onSubmit={(e) => {
        e.preventDefault();
        console.log("formvalues", formValues);
        setSubmitted(true);
        setValues(INITIAL);
        history.push("/");
      }}
    > 
      <h1 className="title" >LOGIN</h1>
      <FormInput 
        required
        type="email"
        label="email"
        htmlFor="email"
        value = {formValues.email}
        handleChange= {(e) => {
          setValues({...formValues, email: e.target.value});
        }} 
      />
      <FormInput 
        required
        type="password"
        label="password"
        htmlFor="password"
        value = {formValues.password}
        handleChange= {(e) => {
          setValues({...formValues, password: e.target.value});
        }} 
      />
      {/* <button onClick={() => console.log("clicked")}>I'm a button</button> */}
      <Button text="LOGIN IN" css={Spacing} ></Button>  
  </LoginContainer>
  );
};
export default Login;
