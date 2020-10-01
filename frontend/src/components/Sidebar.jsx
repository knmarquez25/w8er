import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

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
import Example from "./Example";

// icons:
import { MdChevronRight } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { IoMdListBox } from "react-icons/io";
import { BiCustomize } from "react-icons/bi";

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

const pointLeft = css`
  transform: rotate(-180deg);
`;
const pointRight = css`
  transform: rotate(0deg);
`;
const pointUp = css`
  transform: rotate(-90deg);
`;
const pointDown = css`
  transform: rotate(90deg);
`;

const sidebarItemStyles = css`
  margin-bottom: 1rem;
  @media (max-width: 500px) {
    margin-bottom: 0;
  }
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

  transition-property: max-width, min-width, opacity, padding;
  transition-duration: $sidebar_timing;
  transition-timing-function: ease-out;

  /* padding: 2rem; */

  overflow-x: hidden;
  overflow-y: hidden;

  padding: ${({ sidebarOpen }) => (sidebarOpen ? "2rem" : "0")};
`;

const SidebarNav = styled.div`
  background-color: pink;
  background-color: ${({ theme }) => theme.colors.primary};

  min-width: 4rem;
  max-width: 4rem;

  padding: 1rem 0;

  display: flex;
  flex-direction: column;

  align-items: center;
`;

const MainContent = styled.main`
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
`;

const navItemSelected = (props) => css`
  background-color: ${props.theme.colors.surface};
  .btn-icon {
    svg {
      path {
        fill: ${props.theme.colors.primary};
      }
    }
  }
`;

const ToggleSidebarButton = styled(Button)`
  &:hover {
    ${navItemSelected}
  }

  .btn-icon {
    svg {
      width: 1.8rem;
      height: 1.8rem;

      transition: transform 250ms ease-out;

      ${({ sidebarOpen }) => (sidebarOpen ? pointLeft : pointRight)}
      @media (max-width: 500px) {
        ${({ sidebarOpen }) => (sidebarOpen ? pointUp : pointDown)}
      }
    }
  }
`;

const NavItemButton = styled(Button)`
  ${sidebarItemStyles}

  ${({ itemSelected, index }) =>
    itemSelected === index ? navItemSelected : null}
  
  .btn-icon {
    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  &:hover {
    ${navItemSelected}
  }
`;

const navItems = [
  {
    component: <Example />,
    componentHeader: "<FriendslistSidebarHeader />",
    title: "Friends List",
    icon: IoMdListBox,
    link: "",
  },

  {
    component: <Button text="hello" />,
    componentHeader: "<FriendslistSidebarHeader />",
    title: "Friends List",
    icon: BiCustomize,
    link: "/seating-layout",
  },
  {
    // component: <Button text="hello" />,
    componentHeader: "<FriendslistSidebarHeader />",
    title: "Friends List",
    icon: MdSettings,
    link: "settings",
  },
];

const Sidebar = ({ children, ...props }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [itemSelected, setItemSelected] = useState(0);

  const history = useHistory();

  const [themeToggle, toggleTheme] = useRecoilState(themeState);
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

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <SidebarWrapper className="sb-wrapper">
      <SidebarNav className="sb-nav">
        <ToggleSidebarButton
          type="circle"
          icon={MdChevronRight}
          onClick={() => {
            if (itemSelected === 2) {
              setItemSelected(0);
            }
            toggleSidebar();
          }}
          sidebarOpen={sidebarOpen}
          css={sidebarItemStyles}
        />

        {navItems.map((item, i) => (
          <div key={i}>
            <NavItemButton
              itemSelected={itemSelected}
              // settingsSelected={settingsSelected}
              index={i}
              type="circle"
              icon={item.icon}
              onClick={() => {
                if (itemSelected === i && item.component) {
                  toggleSidebar();
                } else if (item.component) {
                  openSidebar();
                } else {
                  closeSidebar();
                }
                setItemSelected(i);

                if (item.link || item.link !== "") history.push(item.link);
              }}
            />
          </div>
        ))}

        <ToggleButton
          orientation={`${mQuery.matches ? "horizontal" : "vertical"}`}
          label="theme"
          value={themeToggle}
          onClick={() => toggleTheme(!themeToggle)}
          css={sidebarItemStyles}
        />
      </SidebarNav>
      <SidebarContainer
        sidebarOpen={sidebarOpen}
        className="sb-container"
        css={sidebarOpen ? sbOpened : sbClosed}
      >
        {navItems[itemSelected].component}
      </SidebarContainer>
      <MainContent className="sb-main">{children}</MainContent>
    </SidebarWrapper>
  );
};

export default Sidebar;
