import React from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
//import styles from './mystyle.module.css';
import './SettingStyles.css';
//import {StyleSheet, Text, View} from 'react-native';

const Title = styled.h1`
  font-size: 1.5rem;
  padding: 1rem;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
`;

const Wrapper = styled.section`
  padding-top: 5rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px black solid;
  hover: black;
  
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.onSecondary};

  &:hover  {
    background-color: palevioletred;
    color: white;
  }
  
`;

const Subtitle = styled.div`
  font-size: 1.0rem;
  display: inline;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.onSecondary};
  pointer-events: auto;
  
  &:hover {
    background-color: palevioletred;
    color: white;
  }
`;

const OptionsDivider = styled.div`
  display:flex;
  flex-direction: column;
  font-size: 1.0rem;
  width: 100rem;
  height: 100rem;
  text-align: center;
  flex-basis 20%;
  pointer-events: none;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.onSecondary};
`;

const OptionsDivider2 = styled.div`
  display:flex;
  flex-direction: column;
  font-size: 1.0rem;
  padding: 0%; 0%; 0%; 0%;
  width: 10rem;
  height: 10rem;
  padding-bottom: 20rem;
  padding-left: 2rem;
  text-align: center;
  flex-basis 80%;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.onSecondary};
`;

const MenuDivider = styled.div`
    display:flex;
    
`;

const StyledForm = styled.form`
    background-color: cyan;
    color: black;
    border: none;
    padding: 0px 0px;
    text-decoration: none;
    margin: 0ex 0ex;
    cursor: pointer;
`; 

const TestSettings = () => {
  return (

    <div>
      

      <Wrapper>
        <Container>
          <Title>
            GENERAL
          </Title>
        </Container>
      </Wrapper>

      <MenuDivider>
        <OptionsDivider>
          <Container>
            <Subtitle>
              Change Address
            </Subtitle>
          </Container>

          <Container>
            <Subtitle>
              E-Mail
            </Subtitle>
          </Container>

          <Container>
            <Subtitle>
              Password
            </Subtitle>
          </Container>

          <Container>
            <Subtitle>
              Name
            </Subtitle>
          </Container>
        </OptionsDivider>

        <OptionsDivider2>
          <Container>
            <form>
              <label>
                Address : 
              <input type="text" name="Address" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </Container>

          <Container>
            <form>
              <label>
                E-Mail : 
            <input type="text" name="Email" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </Container>

          <Container>
            <form>
              <label>
                Password : 
                <input type="text" name="Password" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </Container>

          <Container>
            <form>
              <label>
                Name : 
                <input type="text" name="Name" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </Container>

        </OptionsDivider2>
        </MenuDivider>

          <StyledForm>
            <form>
              <label>
               Sample
                <input type="text" name="Name" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </StyledForm>
          
        
    </div>

  )
};


/*DUPLICATE settings page intended for rerouting when clicking on categories
in settings page. */


export default TestSettings;
