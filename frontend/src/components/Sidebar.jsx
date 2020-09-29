import React, { useState, useEffect } from "react";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// state management:
import { useRecoilState } from "recoil";
import { themeState } from "../recoil/ThemeState";

// custom components:
import Button from "./buttons/Button";
import ToggleButton from "./buttons/ToggleButton";

// icons:
import { MdChevronRight } from "react-icons/md";

const sbClosed = css`
  opacity: 0;
  min-width: 0;
  max-width: 0;
`;

const sbOpened = css`
  opacity: 1;
  min-width: 25rem;
  max-width: 25rem;
`;

const SidebarWrapper = styled.div`
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: row;

  @media (max-width: 500px) {
    flex-direction: column;

    font-size: 50px;

    .sb-nav,
    .sb-container,
    .sb-main {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
    }

    .sb-nav {
      padding: 0 1rem;
      height: 4rem;

      flex-direction: row;
      justify-content: space-evenly;
    }

    .sb-main {
      flex: 1;
    }
  }
`;

const SidebarContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};

  transition-property: max-width, min-width, opacity;
  transition-duration: $sidebar_timing;
  transition-timing-function: ease-out;

  padding: 2rem;
`;

const SidebarNav = styled.div`
  background-color: pink;
  background-color: ${({ theme }) => theme.colors.primary};

  min-width: 4rem;
  max-width: 4rem;

  padding: 1rem 0;

  display: flex;
  flex-direction: column;

  /* justify-content: center; */
  align-items: center;
`;

const MainContent = styled.main`
  background-color: ${({ theme }) => theme.colors.background};

  width: 100%;
`;

const iconResize = css`
  .btn-icon {
    svg {
      width: 1.8rem;
      height: 1.8rem;
    }
  }

  .arrow-left {
    .btn-icon {
      svg {
        background-color: red;
        transform: rotate(-180deg);
      }
    }
  }

  .arrow-right {
    .btn-icon {
      svg {
        transform: rotate(0deg);
      }
    }
  }
`;

const Sidebar = ({ children }) => {
  const [themeToggle, toggleTheme] = useRecoilState(themeState);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mQuery, setMQuery] = useState({
    matches: window.innerWidth > 500 ? false : true,
  });

  useEffect(() => {
    let mediaQuery = window.matchMedia("(max-width: 500px)");
    mediaQuery.addListener(setMQuery);

    return () => mediaQuery.removeListener(setMQuery);
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  return (
    <SidebarWrapper className="sb-wrapper">
      <SidebarNav className="sb-nav">
        <Button
          type="circle"
          icon={MdChevronRight}
          css={iconResize}
          onClick={toggleSidebar}
          className={`${sidebarOpen ? "arrow-right" : "arrow-left"}`}
        />

        <ToggleButton
          // orientation={`${
          //   window.innerWidth <= 501 ? "horizontal" : "vertical"
          // }`}
          orientation={`${mQuery.matches ? "horizontal" : "vertical"}`}
          label="theme"
          value={themeToggle}
          onClick={() => toggleTheme(!themeToggle)}
        />
      </SidebarNav>
      <SidebarContainer
        className="sb-container"
        css={sidebarOpen ? sbOpened : sbClosed}
      ></SidebarContainer>
      <MainContent className="sb-main">{children}</MainContent>
    </SidebarWrapper>
  );
};

export default Sidebar;
