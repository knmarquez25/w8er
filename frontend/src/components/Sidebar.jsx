import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";

// state management:
import { useRecoilState } from "recoil";
import { themeState } from "../recoil/ThemeState";

// custom components:
import Button from "./buttons/Button";
import ToggleButton from "./buttons/ToggleButton";
import Example from "./Example";
import GuestList from "./GuestList";
import FloorMapTools from "./FloorMapTools";

// icons:
import { MdChevronRight } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { IoMdListBox } from "react-icons/io";
import { BiCustomize } from "react-icons/bi";

const sbClosed = css`
  opacity: 0;
  min-width: 0;
  max-width: 0;

  @media (max-width: 500px) {
    min-height: 0;
    max-height: 0;
    min-width: 100%;
    max-width: 100%;
  }
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
  margin-top: 1rem;
  @media (max-width: 500px) {
    margin-top: 0;
    margin-left: 1rem;
  }
`;

const SidebarWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};

  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: row;

  @media (max-width: 500px) {
    flex-direction: column;

    font-size: 50px;

    /* .sb-nav, */
    .sb-container,
    .sb-main {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
    }

    .sb-nav {
      height: 4rem;
      min-height: 4rem;

      /* width: 100%; */

      flex-direction: row;
      /* justify-content: space-evenly; */

      margin: 0 auto;
      border-right: none;
    }

    .sb-main {
      flex: 1;
    }
  }
`;

const SidebarNav = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.surface};
  /* background-color: red; */

  z-index: 3;

  /* min-width: 4rem;
  max-width: 4rem; */
  display: flex;
  flex-direction: column;

  align-items: center;
`;

const SidebarContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};

  border-left: 1px solid ${({ theme }) => theme.colors.outline};

  @media (max-width: 500px) {
    border-left: 0;
    border-top: 1px solid ${({ theme }) => theme.colors.outline};
  }

  z-index: 2;

  /* border-right: 1px solid ${({ theme }) => theme.colors.outline}; */

  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);

  transition-property: max-width, min-width, max-height, min-height, opacity,
    padding;
  transition-duration: 250ms;
  transition-timing-function: ease-out;

  /* padding: 2rem; */

  overflow-x: hidden;
  /* overflow-y: hidden; */

  /* padding: ${({ sidebarOpen }) => (sidebarOpen ? "1rem" : "0")}; */
`;

const MainContent = styled.main`
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;

  width: 100%;
  padding: 0.5rem;

  & > * {
    color: ${({ theme }) => theme.colors.onBackground};
  }
`;

const navItemSelected = (props) => css`
  background-color: ${props.theme.colors.background};
  .btn-icon {
    svg {
      path {
        fill: ${props.theme.colors.primary};
      }
    }
  }
`;

const navBtnSize = ({ theme }) => css`
  width: 4rem;
  height: 4rem;
  border-radius: 0;
  background-color: transparent;

  .btn-icon {
    svg {
      path {
        fill: ${theme.colors.onBackground};
      }
    }
  }
`;

const ToggleSidebarButton = styled(Button)`
  ${navBtnSize}

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
  ${navBtnSize}

  /* ${sidebarItemStyles} */

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

const Slider = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 4rem;
  width: 3px;
  right: 0;
  position: absolute;

  /* transition-property: height, width, transform;
  transition-duration: 200ms;
  transition-timing-function: ease-in; */
  transition: transform ease-out 200ms;

  transform: translateY(
    ${({ itemSelected }) => `${4 * (itemSelected + 1)}rem`}
  );

  @media (max-width: 500px) {
    height: 3px;
    width: 4rem;
    bottom: 0;
    left: 0;
    right: none;

    transform: translateX(
      ${({ itemSelected }) => `${4 * (itemSelected + 1)}rem`}
    );
  }
`;

const navItems = [
  {
    component: <GuestList />,
    // componentHeader: <FloorMapHeader />,
    icon: IoMdListBox,
    link: "",
  },

  {
    component: <Example />,
    // componentHeader: <FloorMapHeader />,
    icon: BiCustomize,
    link: "/seating-layout",
  },
  {
    // component: <Button text="hello" />,
    // componentHeader: "<FriendslistSidebarHeader />",
    icon: MdSettings,
    link: "/settings",
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
        <Slider itemSelected={itemSelected} />
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
