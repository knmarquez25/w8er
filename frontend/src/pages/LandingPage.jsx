import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";


import Login_Signup from "../pages/login_signup";

const LandingPageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  height: 100%;
  width: 100%;

  display: flex;

  justify-content: center;
  align-items: center;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  margin: 1rem;
  background-color: ${({ theme }) => theme.colors.onBackground};
  width: 20rem;
  min-height: 20rem;
  height: 20rem;

  border-radius: 4px;

  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.p`
  font-weight: bold;
  font-size: 2rem;
`;

const LandingPage = () => {
  const history = useHistory();

  return (
    <LandingPageContainer>
      <Card
        className="card"
        onClick={() => {
          console.log("waitlist clicked");
          console.log(history);
          history.push("/waitlist");
        }}
      >
        <Heading>Waitlist</Heading>
      
      </Card>
      <Card
        className="card"
        onClick={() => {
          console.log("Reserve clicked");
          console.log(history);
          history.push("/reservation");
        }}
      >
        <Heading>Reserve</Heading>
      </Card>
      <Card
        className="card"
        onClick={() => {
          console.log("Manage your restaurant clikced");  
          history.push("/login_signup");
        }}
      >
        <Heading>Manage your restaurant!</Heading>
      </Card>
    </LandingPageContainer>
  );
};

export default LandingPage;
