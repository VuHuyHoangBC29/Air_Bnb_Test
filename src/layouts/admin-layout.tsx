import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  EnvironmentOutlined,
  VideoCameraOutlined,
  AppstoreAddOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./admin-layout.scss";

export default function AdminLayout(): JSX.Element {
  const navigate = useNavigate();
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Quản lý người dùng",
              onClick: () => {
                navigate("/admin/user-management");
              },
            },
            {
              key: "2",
              icon: <EnvironmentOutlined />,
              label: "Quản lý vị trí",
              onClick: () => {
                navigate("/admin/location-management");
              },
            },
            {
              key: "3",
              icon: <AppstoreAddOutlined />,
              label: "Quản lý phòng",
              onClick: () => {
                navigate("/admin/room-management");
              },
            },
            // {
            //   key: "4",
            //   icon: <BookOutlined />,
            //   label: "Quản lý đặt phòng",
            //   onClick: () => {
            //     navigate("/admin/booking-management");
            //   },
            // },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
