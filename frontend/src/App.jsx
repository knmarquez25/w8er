import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// state management:
import { useRecoilState } from "recoil";
import { themeState } from "./recoil/ThemeState";

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

// page components:
import SeatingLayout from "./pages/SeatingLayout";

// icons:
import { MdBrightnessLow } from "react-icons/md";
import { SiGoogle as GoogleLogoIcon } from "react-icons/si";

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

const inputFieldSpacing = css`
  margin-bottom: 1rem;
  margin-top: 0.5rem;
`;

const App = ({ ...props }) => {
  const [themeToggle, toggleTheme] = useRecoilState(themeState);
  const theme = useTheme();
  const [test, setTest] = useState("");

  useEffect(() => {
    console.log("UE1");
  }, [theme]);

  return (
    <AppContainer>
      <Helmet>
        <meta name="theme-color" content={theme.colors.primary} />
      </Helmet>

      {/* <header className="App-header">
        <span className="theme-toggle-label">Theme</span>
        <ToggleButton
          // test=""
          label="theme"
          value={themeToggle}
          onClick={() => toggleTheme(!themeToggle)}
        />
      </header> */}

      <BrowserRouter>
        <Sidebar>
          <Switch>
            <Route exact path="/" component={SeatingLayout} />
          </Switch>
        </Sidebar>
      </BrowserRouter>
    </AppContainer>
  );
};

export default App;
