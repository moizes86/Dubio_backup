import { Layout } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";
import AppHeader from "./Header/Header";
import LayoutProvider from "./layout.provider";
import LeftSideBar from "./LeftSideBar/LeftSideBar";
import './AppLayout.scss';
const { Content } = Layout;

interface IAppLayout {
  children: JSX.Element;
}

export default function AppLayout({ children }: IAppLayout) {
  let location = useLocation();

  return location.pathname !== "/login" ? (
    <Layout className="layout">
      <LayoutProvider>
        <AppHeader />
        <Layout>
          <LeftSideBar />
          <Content className="content">{children}</Content>
        </Layout>
      </LayoutProvider>
    </Layout>
  ) : (
    <Layout>
    {children}
    </Layout>

  );
}
