import React, { useContext } from "react";
import { LayoutContext } from "../layout.provider";
import {
  BookOutlined,
  LaptopOutlined,
  CheckOutlined,
  TableOutlined,
} from "@ant-design/icons";
import "./LeftSideBar.scss";
import UserAvatar from "../Header/Avatar/UserAvatar";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

export default function LeftSideBar() {
const { menuActive, /* toggleMenuActive*/ } = useContext(LayoutContext);
  return (
    <Sider
      collapsed={true}
      className={`${menuActive ? "side-menu-active" : ""}`}
    >
      <Menu
        mode="inline"
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
        defaultSelectedKeys={["3"]}
      >
        <div className="avatar-item">
          <UserAvatar />
        </div>
        <Menu.Item key="2" icon={<LaptopOutlined />}></Menu.Item>
        <Menu.Item key="3" icon={<TableOutlined />}></Menu.Item>

        <Menu.Item key="4" icon={<BookOutlined />}></Menu.Item>
        <Menu.Item key="5" icon={<CheckOutlined />}></Menu.Item>
      </Menu>
    </Sider>
  );
}
