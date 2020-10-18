import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

import Guestlist_Floormap from '../pages/Guest_Floormap';

import { useHistory } from "react-router-dom";

import FormInput from "../components/inputs/FormInput";
import Button from "../components/buttons/Button";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/UserState";

const LoginContainer = styled.form`
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

const LFormInput = styled(FormInput)`
    min-width:80%;
    margin-bottom:2rem;
   
    &:hover {
    border-bottom: 4px solid #CD5C5C;
  }

`;

const LButton = styled(Button)`
    background-color:red;
    width:40%;

    .btn-text{
        color:white;
    }

    &:hover{
        background-color:#CD5C5C;
    }

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
  const [user, setUser] = useRecoilState(userState);

   //const onSubmit = (data) => setUser(data);

  return ( 
    <LoginContainer 
      onSubmit={(e) => {
        e.preventDefault();
        console.log("formvalues", formValues);
        setSubmitted(true);
        setUser(formValues);
        setValues(INITIAL);
        history.push("/guestlist_floormap");
      }}
    > 
      <h1 className="title" >Login To W8er</h1>
      <LFormInput 
        required
        type="email"
        label="email"
        htmlFor="email"
        value = {formValues.email}
        handleChange= {(e) => {
          setValues({...formValues, email: e.target.value});
        }} 
      />
      <LFormInput 
        required
        type="password"
        label="password"
        htmlFor="password"
        value = {formValues.password}
        handleChange= {(e) => {
          setValues({...formValues, password: e.target.value});
        }} 
      />
      <LButton text="LOGIN IN" css={Spacing} ></LButton>  
  </LoginContainer>
  );
};
export default Login;
