import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import FormInput from "../components/inputs/FormInput";
import Button from "../components/buttons/Button";

const SignUpContainer = styled.form `
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

const INITIAL ={
  name:"",
  email:"",
  password: "",
  password2: "",
};

const Spacing = css`
  margin-top:1rem;
`;


const SignUp = () => {
    const [formValues, setValues] = useState(INITIAL);
    const [submitted, setSubmitted] = useState(false);

  return (
    <SignUpContainer
        onSubmit = {(e)=>{
            if(formValues.password !== formValues.password2){
                alert("passwords do not match");
                return;
            }        

            e.preventDefault();
            console.log("formValues",formValues);
            setSubmitted(true);
            setValues(INITIAL);
        }}
    >
      <h1 className="title">SIGN UP</h1>
      <FormInput 
        required
        label="name"
        htmlFor="name"
        value = {formValues.name}
        handleChange= {(e) => {
          setValues({...formValues, name: e.target.value});
        }} 
      />
       <FormInput 
        required
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
       <FormInput 
        required
        type="password"
        label="repeat password"
        htmlFor="password"
        value = {formValues.password2}
        handleChange= {(e) => {
          setValues({...formValues, password2: e.target.value});
        }} 
      />
      <Button text="SIGN UP" css={Spacing}> </Button>
      {submitted ? (<h1>Sign up successfully!</h1>): null}

  </SignUpContainer>
  );
};

export default SignUp;
