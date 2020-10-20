import React from "react";
 
// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
//import styles from './mystyle.module.css';
import './SettingStyles.css';
//import {StyleSheet, Text, View} from 'react-native';
 
 
/*Created as the menu settings page.*/
 
const Wrapper = styled.section`
  padding-top: 5rem;
`;
 
const Title = styled.h1`
  font-size: 1.5rem;
  padding: 1rem;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
`;
 
 
 
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px black solid;
  
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
 
const LeftDivider = styled.div`
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
 
const RightDivider = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.0rem;
  padding: 0%; 0%; 0%; 0%;
  width: 10rem;
  height: 10rem;
  padding-bottom: 20rem;
  padding-left: 0rem;
  text-align: center;
  flex-basis 80%;
  pointer-events: auto;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.onSecondary};
`;
 
const MenuContainer = styled.div`
    display:flex;
    max-height: 14rem;
`;
 
 
 
const VertContainer = styled.div`
  display: flex;
  flex-direction: column;
  pointer-events:none;
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
 
const SampleUser = [
    {
      Name: "Mr. Clean",
      EMail: "SoMuchDrip@hotmail.rocketMail.csulb.edu",
      Password: "AstrosStayLosing",
      Address: "0x03331"
    }
]

// Dummy data to fill in the fields. Not used yet. 10/18/2020
 
const Settings = () => {
  return (
 
    <div>
      <Wrapper>
        <Container>
          <Title>
            GENERAL
          </Title>
        </Container>
      </Wrapper>
 
      <VertContainer>
        <MenuContainer>
 
          <LeftDivider>
            <Container>
              <Subtitle>
                Name: 
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
                Address
              </Subtitle>
            </Container>
          </LeftDivider>
 
          <RightDivider>
            <Container>
              <form>
                <label>
                  Name    :
                <input type="text" name="Name" />
                </label>
                <input type="submit" value=" Submit " />
              </form>
            </Container>
 
            <Container>
              <form>
                <label>
                  E-Mail:
              <input type="text" name="Email" />
                </label>
                <input type="submit" value=" Submit " />
              </form>
            </Container>
 
            <Container>
              <form>
                <label>
                  Password :  
                  <input type="text" name="Password" />
                </label>
                <input type="submit" value=" Submit " />
              </form>
            </Container>
 
            <Container>
              <form>
                <label>
                  Address : 
                  <input type="text" name="Address" />
                </label>
                <input type="submit" value=" Submit " />
              </form>
            </Container>
          </RightDivider>
        </MenuContainer>
 
        <Container>
          <Subtitle>
            Delete Account
          </Subtitle>
        </Container>
        
      </VertContainer>
 
 
      {/* Current plan is to be able to click on the subtitles and it
      redirects you to a new page that looks mostly like the settings change
      but is dependant on which subtitle was clicked on.
      
      Ex: Click on Name in left, redirects you to name specific settings options.
          Click on Password, redirects.....
          etc.
          
          Will put routes in the App.jsx soon for that.*/}
 
 
    </div>
 
  )
};
 
export default Settings;
 

