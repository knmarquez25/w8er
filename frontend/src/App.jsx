import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";
import styled from "@emotion/styled";

// custom components:
import ToggleButton from "./components/buttons/ToggleButton";
import Button from "./components/buttons/Button";
import FormInput from "./components/inputs/FormInput";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

// page components:
import SeatingLayout from "./pages/SeatingLayout";
import Settings from "./pages/Settings";
import RegisterPage from "./pages/RegisterPage";
import CustomerFAQPage from "./pages/CustomerFAQPage";
import FeaturesPage from "./pages/CustomerFAQPage";

// icons:
import { MdBrightnessLow } from "react-icons/md";
import { SiGoogle as GoogleLogoIcon } from "react-icons/si";
import LandingPage from "./pages/LandingPage";

// state management:
import { useRecoilValue } from "recoil";
import { userState } from "./recoil/UserState";

const AppContainer = styled.section`
  background-color: ${(props) => props.theme.colors.background};

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;

  height: 100%;

  display: flex;
  flex-direction: column;

  & > * {
    flex-grow: 1;
  }
`;

const FlexWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};

  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: row;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const App = ({ ...props }) => {
  const theme = useTheme();
  const user = useRecoilValue(userState);

  useEffect(() => {
    // console.log("UE1");
  }, [theme]);

  return (
    <DndProvider backend={HTML5Backend}>
      <AppContainer>
        <Helmet>
          <meta name="theme-color" content={theme.colors.primary} />
        </Helmet>

        <BrowserRouter basename="/w8er">
          {user && (
            <FlexWrapper>
              <Sidebar />
              <Main>
                <Switch>
                  <Route exact path="/" component={SeatingLayout} />
                  <Route exact path="/floor-map" component={SeatingLayout} />
                  <Route
                    exact
                    path="/floor-map/edit"
                    component={SeatingLayout}
                  />
                  <Route exact path="/settings" component={Settings} />
                </Switch>
              </Main>
            </FlexWrapper>
          )}

          {!user && (
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/customer-faq" component={CustomerFAQPage} />
              <Route exact path="/features" component={FeaturesPage} />
            </Switch>
          )}
        </BrowserRouter>
      </AppContainer>
    </DndProvider>
  );
};

export default App;