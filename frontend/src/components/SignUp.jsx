import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import FormInput from "../components/inputs/FormInput";
import Button from "../components/buttons/Button";


import Guestlist_Floormap from '../pages/Guest_Floormap';

import { useHistory } from "react-router-dom";

const SignUpContainer = styled.form `
  background-color: ${({theme})=> theme.colors.surface};
  width: 40%;
  height: 80%;
  margin: 3rem;

.title{
    margin: 5px 0;
    font-weight:bold;
    font-size:2rem;
    color:white;
}
  
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

const SFormInput = styled(FormInput)`
    min-width:80%;
    margin-bottom:2rem;
   
    &:hover {
    border-bottom: 4px solid #CD5C5C;
  }

`;

const SButton = styled(Button)`
    background-color:red;
    width:40%;

    .btn-text{
        color:white;
    }

    &:hover{
        background-color:#CD5C5C;
    }

`;


const SignUp = () => {
    const history = useHistory();
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
            history.push("/guestlist_floormap");
        }}
    >
      <h1 className="title">Create Account</h1>
      <SFormInput 
        required
        label="Name"
        htmlFor="name"
        value = {formValues.name}
        handleChange= {(e) => {
          setValues({...formValues, name: e.target.value});
        }} 
      />
       <SFormInput 
        required
        label="Email"
        htmlFor="email"
        value = {formValues.email}
        handleChange= {(e) => {
          setValues({...formValues, email: e.target.value});
        }} 
      />
       <SFormInput 
        required
        type="password"
        label="Password"
        htmlFor="password"
        value = {formValues.password}
        handleChange= {(e) => {
          setValues({...formValues, password: e.target.value});
        }} 
      />
       <SFormInput 
        required
        type="password"
        label="Repeat Password"
        htmlFor="password"
        value = {formValues.password2}
        handleChange= {(e) => {
          setValues({...formValues, password2: e.target.value});
        }} 
      />
      <SButton text="SIGN UP" css={Spacing}> </SButton>
      {submitted ? (<h1>Sign up successfully!</h1>): null}

  </SignUpContainer>
  );
};

export default SignUp;
