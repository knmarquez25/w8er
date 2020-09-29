import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

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

// icons:
import { MdBrightnessLow } from "react-icons/md";
import { SiGoogle as GoogleLogoIcon } from "react-icons/si";

const AppContainer = styled.section`
  background-color: ${(props) => props.theme.colors.background};
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  header {
    z-index: 2;
    width: 90%;
    padding: 1rem 0;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    .theme-toggle-label {
      background-color: ${(props) => props.theme.colors.surface};

      margin-right: 1rem;

      height: 2.3rem;
      padding: 0 1rem;

      border-radius: 5rem;

      font-size: 1.2rem;
      text-transform: uppercase;

      color: ${(props) => props.theme.colors.onSecondary};

      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }

  main {
    z-index: 1;
    width: 90%;
    /* padding: 1rem; */

    flex: 1;

    /* border-radius: 1rem; */
    /* background-color: ${(props) => props.theme.colors.surface}; */

    p {
      color: ${(props) => props.theme.colors.onSecondary};
      padding: 1rem;
      border-radius: 5px;
      background-color: ${(props) => props.theme.colors.surface};

      margin: 1rem 0;
    }

    a {
      color: ${(props) => props.theme.colors.secondary};
      font-weight: bold;
    }
  }

  footer {
    z-index: 0;
    width: 90%;
    padding: 1rem 0;

    display: flex;
    justify-content: center;
    align-items: center;

    /* background-color: ${(props) => props.theme.colors.surface}; */

    .test {
      /* background-color: red; */
      ul {
        li {
          color: ${(props) => props.theme.colors.onSecondary};
        }
      }
    }
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
        {/* <meta name="theme-color" content="yellow" /> */}
      </Helmet>
      <header className="App-header">
        {/* <MdBrightnessLow className="theme-icon" /> */}
        <span className="theme-toggle-label">Theme</span>
        <ToggleButton
          // test=""
          label="theme"
          value={themeToggle}
          onClick={() => toggleTheme(!themeToggle)}
        />
      </header>

      <main>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
          saepe numquam pariatur porro adipisci tempore repellat labore ipsam
          ipsa aut suscipit iure cum sequi distinctio tenetur quia et omnis
          accusantium, molestiae nobis! Quam totam fuga nostrum voluptatem
          similique? Repellat, nostrum magni voluptatibus accusamus atque
          perspiciatis cupiditate porro natus voluptatem, odit facere expedita
          delectus fuga quaerat, exercitationem omnis illum possimus veritatis
          quod sequi. Nobis id quis laudantium. Veniam, vitae placeat. Rerum
          nesciunt reprehenderit quos minus nam maxime officia quo molestias aut
          minima voluptatem at, hic non beatae eum delectus ullam amet maiores
          perspiciatis, distinctio consectetur. Recusandae consectetur
          perspiciatis aperiam delectus aliquid.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
          saepe numquam pariatur porro adipisci tempore repellat labore ipsam
          ipsa aut suscipit iure cum sequi distinctio tenetur quia et omnis
          accusantium, molestiae nobis! Quam totam fuga nostrum voluptatem
          similique? Repellat, nostrum magni voluptatibus accusamus atque
          perspiciatis cupiditate porro natus voluptatem, odit facere expedita
          delectus fuga quaerat, exercitationem omnis illum possimus veritatis
          quod sequi. Nobis id quis laudantium. Veniam, vitae placeat. Rerum
          nesciunt reprehenderit quos minus nam maxime officia quo molestias aut
          minima voluptatem at, hic non beatae eum delectus ullam amet maiores
          perspiciatis, distinctio consectetur. Recusandae consectetur
          perspiciatis aperiam delectus aliquid.
        </p>

        <FormInput
          required
          additionalInfo="hello"
          htmlFor="name"
          type="text"
          label="name"
          handleChange={(e) => {
            setTest(e.target.value);
          }}
          value={test}
          css={inputFieldSpacing}
        />

        <FormInput
          required
          htmlFor="age"
          type="text"
          label="age"
          handleChange={(e) => {
            setTest(e.target.value);
          }}
          value={test}
          css={inputFieldSpacing}
        />

        <FormInput
          htmlFor="pw"
          type="password"
          label="phone number"
          handleChange={(e) => {
            setTest(e.target.value);
          }}
          value={test}
          css={inputFieldSpacing}
        />

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <Button
          icon={<GoogleLogoIcon />}
          text="sign up"
          css={inputFieldSpacing}
        />

        <Button icon={<GoogleLogoIcon />} css={inputFieldSpacing} />

        <Button
          type="circle"
          icon={<GoogleLogoIcon />}
          css={inputFieldSpacing}
        />
        <Button type="circle" text="ad" css={inputFieldSpacing} />
      </main>

      <footer>
        <nav className="test">
          <ul>
            <li>contact</li>
          </ul>
        </nav>
      </footer>
    </AppContainer>
  );
};

export default App;
