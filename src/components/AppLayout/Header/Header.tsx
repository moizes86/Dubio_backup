import React, { useContext } from "react";
import { LayoutContext } from "../layout.provider";
import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
import { Link } from "react-router-dom";
import Hamburger from "./hamburger/hamburger";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedSelector, logoutThunk } from "../../../redux/Slices/UserSlice";
import { Button } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
const { Header } = Layout;

export default function AppHeader() {
  const { menuActive, toggleMenuActive } = useContext(LayoutContext);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(isLoggedSelector);
  return (
    <Header
      className="app-header"
      style={{ backgroundColor: "#615dfa", paddingLeft: "10px" }}
    >
      <div className="app-title">
        <img src={require("../../../images/dubioLogo.png")} alt="" />
      </div>

      <Menu
        className={`header-menu ${
          menuActive ? "header-menu-active" : "header-menu-inactive"
        }`}
        style={{ backgroundColor: "transparent" }}
        theme="dark"
      >
        <Menu.Item key="1" onClick={menuActive ? toggleMenuActive : () => {}}>
          <Link to="/">Top Fact-Checkers</Link>
        </Menu.Item>
        <Menu.Item key="2" onClick={menuActive ? toggleMenuActive : () => {}}>
          <Link to="/about">Platform Metrics</Link>
        </Menu.Item>
        <Menu.Item key="4" onClick={menuActive ? toggleMenuActive : () => {}}>
          <Link to="/users">Fact-Checking Resources</Link>
        </Menu.Item>
        <Menu.Item key="5" onClick={menuActive ? toggleMenuActive : () => {}}>
          <Link to="/users">Forums</Link>
        </Menu.Item>
        <Menu.Item key="6" onClick={menuActive ? toggleMenuActive : () => {}}>
          <Link to="/users">Events</Link>
        </Menu.Item>
        <MenuItem id="login-logout-btn">
          <Button
            onClick={() => dispatch(logoutThunk())}
            className=""
            type="primary"
          >
            <Link to="/login">{isLoggedIn ? "logout" : "Log In"}</Link>
          </Button>
        </MenuItem>
      </Menu>
      <Hamburger />
    </Header>
  );
}
