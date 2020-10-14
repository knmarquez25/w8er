import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// illustrations:
import { ReactComponent as QueueDrawing } from "../assets/illustrations/queue.svg";
import { ReactComponent as DashboardDrawing } from "../assets/illustrations/dashboard.svg";
import Button from "../components/buttons/Button";
import { useHistory } from "react-router-dom";

const LPContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  height: 100%;

  color: ${({ theme }) => theme.colors.onBackground};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    /*  
      since display: flex; is causing flow issues at around this brekapoint
      we'll turn it back to the default display since we don't need the center
      that was achieved using flex box
     */
    display: block;
  }
`;

const CardContainer = styled.div`
  /* background-color: red; */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  margin: 2rem;
  padding: 2rem;

  width: 30rem;
  height: 40rem;
  min-width: 30rem;
  min-height: 40rem;

  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.outline};
  border-bottom: 4px solid ${({ theme }) => theme.colors.outline};
  border-right: 4px solid ${({ theme }) => theme.colors.outline};

  transition-property: width, height, border-bottom, border-right;
  transition-duration: 200ms;
  transition-timing-function: ease-out;

  cursor: pointer;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  @media (max-width: 1000px) {
    /* transform: scale(0.6); */
    width: 20rem;
    height: 30rem;
    min-width: 20rem;
    min-height: 30rem;
  }

  @media (max-width: 768px) {
    max-width: 30rem;
    max-height: 40rem;
    width: 90%;
    height: 40rem;
    min-width: 20rem;
    min-height: 40rem;
  }

  @media (max-width: 400px) {
    /* transform: scale(0.6); */
    width: 90%;
    height: 30rem;
  }

  &:hover {
    /* border: 1px solid ${({ theme }) => theme.colors.primary}; */
    border-bottom: 4px solid ${({ theme }) => theme.colors.primary};
    border-right: 4px solid ${({ theme }) => theme.colors.primary};
  }

  svg {
    width: 70%;
    height: 50%;
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.onBackground};
  font-size: 2rem;
  font-weight: bold;

  margin-bottom: 1rem;
  width: 100%;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.onBackground};

  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  width: 100%;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  font-size: inherit;
  font-style: italic;
`;

const ButtonContainer = styled.div`
  width: 100%;

  flex: 1;

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;
const LPButton = styled(Button)`
  border-radius: 3px;
  width: 100%;
  /* margin: 0 0.5rem; */
`;

const LandingPage = () => {
  const history = useHistory();

  return (
    <LPContainer>
      <CardContainer>
        <Card
          onClick={(e) => {
            history.push("/customer-faq");
          }}
        >
          <QueueDrawing />
          <Title>Waitlist or Reservation</Title>
          <Text>
            Are you a <Highlight>customer</Highlight> trying to make a
            reservation or get your place in line?
          </Text>
          <Text>We can show you how!</Text>
          <ButtonContainer>
            <LPButton text="Show me how!" />
          </ButtonContainer>
        </Card>

        <Card
          onClick={(e) => {
            history.push("/register");
          }}
        >
          <DashboardDrawing />
          <Title>Sign up for our services!</Title>
          <Text>
            Are you a <Highlight>restaurant professional</Highlight> looking to
            improve wait times for your customers?
          </Text>
          <Text>
            Use our services to manage your waitlists and reservations, allow
            your customers to pick out their seats, and much more!
          </Text>

          <ButtonContainer>
            <LPButton
              text="See features"
              css={css`
                margin-right: 2rem;
              `}
              onClick={(e) => {
                e.stopPropagation();

                history.push("/features");
              }}
            />

            <LPButton text="Sign Up" />
          </ButtonContainer>
        </Card>
      </CardContainer>
    </LPContainer>
  );
};

export default LandingPage;
