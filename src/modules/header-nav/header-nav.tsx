import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AutoComplete, Input, MenuProps } from "antd";
import type { SelectProps } from "antd/es/select";
import { Button, Dropdown, Menu, message, Space, Tooltip } from "antd";
import {
  UserOutlined,
  MenuOutlined,
  HomeOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { USER_INFO_KEY } from "../../constants/common";
import {
  authenticationActions,
  loginAction,
} from "../../store/reducers/authenicationReducer";
import { UserType } from "../../enums/user";
import { fetchLocationsListAction } from "../../store/reducers/locationsListReducer";
import { stringify } from "querystring";
import { LoadingContext } from "../../context/loading.context";

export default function HeaderNav(): JSX.Element {
  //Cách gọi {state, setState} của useContext trong ts
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { userInfo: userLogin } = useSelector(
    (state: RootState) => state.authenticationReducer
  );

  useEffect(() => {
    setIsLoading({ isLoading: true, setIsLoading });

    dispatch(fetchLocationsListAction());

    setIsLoading({ isLoading: false, setIsLoading });
  }, []);

  const { locationsList } = useSelector(
    (state: RootState) => state.locationsListReducer
  );

  const handleLogout = () => {
    localStorage.removeItem(USER_INFO_KEY);

    dispatch(authenticationActions.handleLogout(null));

    navigate("/");
  };
  const userMenu = (
    <Menu
      items={[
        {
          label: (
            <a href="/register" style={{ textDecoration: "none" }}>
              Đăng ký
            </a>
          ),
          key: "0",
        },
        {
          label: (
            <a href="/login" style={{ textDecoration: "none" }}>
              Đăng nhập
            </a>
          ),
          key: "1",
        },
        {
          type: "divider",
        },
        {
          label: "Cho thuê nhà",
          key: "2",
        },
        {
          label: "Tổ chức trải nghiệm",
          key: "3",
        },
        {
          label: "Trợ giúp",
          key: "4",
        },
      ]}
    />
  );

  const userMenuLogin = (
    <Menu
      items={
        userLogin?.role === UserType.admin
          ? [
              {
                label: (
                  <Link to="/admin" style={{ textDecoration: "none" }}>
                    Trang quản lý
                  </Link>
                ),
                key: "0",
              },
              {
                label: (
                  <Link
                    to={`/profile/${userLogin.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    Thông tin tài khoản
                  </Link>
                ),
                key: "1",
              },
              {
                label: (
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    Vé đã đặt
                  </Link>
                ),
                key: "2",
              },
              {
                type: "divider",
              },
              {
                label: <div onClick={handleLogout}>Đăng xuất</div>,
                key: "3",
              },
            ]
          : [
              {
                label: (
                  <Link
                    to={`/profile/${userLogin?.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    Thông tin tài khoản
                  </Link>
                ),
                key: "0",
              },
              {
                label: (
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    Vé đã đặt
                  </Link>
                ),
                key: "1",
              },
              {
                type: "divider",
              },
              {
                label: <div onClick={handleLogout}>Đăng xuất</div>,
                key: "2",
              },
            ]
      }
    />
  );

  //Auto-complete
  const provinceArr = locationsList.map((ele, idx) => {
    return { id: `${ele.id}`, tinhThanh: `${ele.tinhThanh}` };
  });

  let newProvinceArr = [
    { id: "1", tinhThanh: "Hồ Chí Minh" },
    { id: "45", tinhThanh: "Quảng Ninh" },
  ];

  let provinceArrFiltered = provinceArr.filter((ele) => {
    return ele.tinhThanh !== "Quảng Ninh" && ele.tinhThanh !== "Hồ Chí Minh";
  });

  newProvinceArr = newProvinceArr.concat(provinceArrFiltered);

  const options = newProvinceArr.map((ele) => {
    return { value: `${ele.tinhThanh}` };
  });

  const onSelect = (value: string) => {
    navigate(
      `/locations/${newProvinceArr
        .filter((ele, idx) => {
          return (
            ele.tinhThanh
              .toLowerCase()
              .trim()
              .indexOf(value.toLowerCase().trim()) !== -1
          );
        })
        .map((ele) => ele.id)}`
    );
    window.location.reload();
  };

  return (
    <div>
      <Menu mode="horizontal" defaultSelectedKeys={["home"]}>
        <Menu.Item
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          key="home"
          icon={<HomeOutlined />}
          onClick={() => navigate("/")}
        >
          Trang chủ
        </Menu.Item>
        <Menu.Item
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          key="locations"
          icon={<GlobalOutlined />}
          onClick={() => navigate("/locations")}
        >
          Địa điểm
        </Menu.Item>
        <Menu.Item>
          <AutoComplete
            style={{ width: 200 }}
            options={options}
            placeholder="Nhập tên tỉnh thành"
            filterOption={(inputValue, option) =>
              option!.value
                .toLowerCase()
                .trim()
                .indexOf(inputValue.toLowerCase()) !== -1
            }
            onSelect={onSelect}
          />
        </Menu.Item>
        <Menu.Item key="UserMenu">
          <Dropdown
            overlay={userLogin ? userMenuLogin : userMenu}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              {userLogin ? (
                <Space>
                  {userLogin.name}
                  <UserOutlined />
                </Space>
              ) : (
                <Space>
                  <MenuOutlined />
                  <UserOutlined />
                </Space>
              )}
            </a>
          </Dropdown>
        </Menu.Item>
      </Menu>
    </div>
  );
}
