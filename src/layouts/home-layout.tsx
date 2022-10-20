import React from "react";
import { Outlet } from "react-router-dom";
import { JsxEmit } from "typescript";
import { Breadcrumb, Image, Layout, Menu } from "antd";
import PageFooter from "../components/footer/page-footer";
import PageHeader from "../components/header/page-header";
const { Content } = Layout;

export default function HomeLayout(): JSX.Element {
  return (
    <div>
      <div>
        <Layout className="layout">
          <PageHeader />
          <Content style={{ padding: "50px 50px 0 50px" }}>
            <Outlet />
          </Content>
          <PageFooter />
        </Layout>
      </div>
    </div>
  );
}
