import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { Col, Divider, message, Row } from "antd";
import { Button, Radio } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Image } from "antd";
import { Avatar, Card, List, Space, Dropdown, Menu } from "antd";
import type { MenuProps } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { fetchLocationsListAction } from "../../store/reducers/locationsListReducer";
import { fetchRoomsListAction } from "../../store/reducers/roomsListReducer";
import { Link, useParams } from "react-router-dom";
import LocationsMap from "../../modules/locations/locations-map/locations-map";

import "./locations.scss";
import { LoadingContext } from "../../context/loading.context";

export default function Locations() {
  const style: React.CSSProperties = {
    background: "white",
  };

  const locationInfoStyle: React.CSSProperties = {
    background: "white",
  };

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const dispatch = useDispatch<AppDispatch>();

  const params = useParams();

  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const { loading } = useSelector(
    (state: RootState) => state.locationsListReducer
  );

  useEffect(() => {
    dispatch(fetchRoomsListAction());
    dispatch(fetchLocationsListAction());

    // loading
    //   ? setIsLoading({ isLoading: true, setIsLoading })
    //   : setIsLoading({ isLoading: false, setIsLoading });

    // if (loading === true) {
    //   setIsLoading({ isLoading: true, setIsLoading });
    // } else {
    //   setIsLoading({ isLoading: false, setIsLoading });
    // }
  }, []);

  console.log(loading);

  useEffect(() => {
    // dispatch(fetchRoomsListAction());
    // dispatch(fetchLocationsListAction());
    if (loading === "pending") {
      setIsLoading({ isLoading: true, setIsLoading });
    }
    if (loading === "succeeded") {
      setIsLoading({ isLoading: false, setIsLoading });
    }
  }, [loading]);

  const { roomsList } = useSelector(
    (state: RootState) => state.roomsListReducer
  );

  const { locationsList } = useSelector(
    (state: RootState) => state.locationsListReducer
  );

  // if (loading === true) {
  //   setIsLoading({ isLoading: true, setIsLoading });
  // } else {
  //   setIsLoading({ isLoading: false, setIsLoading });
  // }

  const [province, setProvince] = useState<string>(
    params.provinceId ? params.provinceId : "ALL"
  );

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log(e.key);

    setProvince(e.key);
  };

  const provinceDropdownMenu = locationsList!.map((ele, idx) => {
    return {
      label: <div>{ele.tinhThanh}</div>,
      key: `${ele.id}`,
    };
  });

  provinceDropdownMenu.push({
    label: <div>Tất cả</div>,
    key: "ALL",
  });

  const provincesMenu = (
    <Menu onClick={handleMenuClick} items={provinceDropdownMenu} />
  );

  let filteredNewRoomsList = [...roomsList];

  if (province !== "ALL") {
    filteredNewRoomsList = roomsList.filter((ele) => ele.maViTri === +province);
  }

  const roomProperty = {
    banLa: "Bàn là",
    banUi: "Bàn ủi",
    bep: "Bếp",
    dieuHoa: "Điều hòa",
    doXe: "Đỗ xe",
    giaTien: "Giá tiền",
    giuong: "Giường",
    hinhAnh: "Hình ảnh",
    hoBoi: "Hồ bơi",
    id: "id",
    khach: "Khách",
    maViTri: "Mã vị trí",
    mayGiat: "Máy giặt",
    moTa: "Mô tả",
    phongNgu: "Phòng ngủ",
    phongTam: "Phòng tắm",
    tenPhong: "Tên phòng",
    tivi: "Tivi",
    wifi: "Wifi",
  };

  let roomContentArr: string[] = [];

  filteredNewRoomsList.forEach((ele, idx) => {
    let contentForEachRoom = "";
    for (const property in ele) {
      if (
        property === "id" ||
        property === "moTa" ||
        property === "hinhAnh" ||
        property === "tenPhong" ||
        property === "giaTien" ||
        property === "maViTri"
      ) {
        contentForEachRoom += "";
      } else if (ele[property as keyof typeof ele] === false) {
        contentForEachRoom += "";
      } else if (ele[property as keyof typeof ele] === true) {
        contentForEachRoom += roomProperty[property as keyof typeof ele] + ", ";
      } else {
        contentForEachRoom +=
          ele[property as keyof typeof ele] +
          " " +
          roomProperty[property as keyof typeof ele] +
          ", ";
      }
    }
    roomContentArr.push(contentForEachRoom);
  });

  const filteredNewRoomsListData = filteredNewRoomsList.map((ele, idx) => ({
    link: `/booking/${ele.id}`,
    title: ele.tenPhong,
    avatar: "https://joeschmoe.io/api/v1/random",
    description: `$${ele.giaTien}/tháng `,
    content: `${roomContentArr[idx]}`,
    image: ele.hinhAnh,
  }));

  return (
    <div id="locations">
      <h2>Chỗ ở tại khu vực đã chọn</h2>
      <Row gutter={{ lg: 32 }}>
        <Col className="gutter-row" xs={24} lg={12}>
          <div id="locationsFilter">
            <Row justify="start" gutter={{ xs: 8, lg: 16 }}>
              <Col style={{ margin: "5px 0" }} md={24} xxl={10}>
                <Row gutter={{ xs: 8, lg: 16 }}>
                  <Col
                    style={{ margin: "5px 0" }}
                    className="gutter-row"
                    xl={6}
                    xxl={8}
                  >
                    <Button
                      style={{ marginRight: "10px", width: "100%" }}
                      type="primary"
                      shape="round"
                    >
                      Loại nơi ở
                    </Button>
                  </Col>
                  <Col
                    style={{ margin: "5px 0" }}
                    className="gutter-row"
                    xl={6}
                    xxl={8}
                  >
                    <Button
                      style={{ marginRight: "10px", width: "100%" }}
                      type="primary"
                      shape="round"
                    >
                      Giá
                    </Button>
                  </Col>
                  <Col
                    style={{ margin: "5px 0" }}
                    className="gutter-row"
                    xl={6}
                    xxl={8}
                  >
                    <Button
                      style={{ marginRight: "10px", width: "100%" }}
                      type="primary"
                      shape="round"
                    >
                      Đặt ngay
                    </Button>
                  </Col>
                </Row>
              </Col>

              <Col style={{ margin: "5px 0" }} md={24} xxl={14}>
                <Row gutter={{ xs: 8, lg: 16 }}>
                  <Col
                    style={{ margin: "5px 0" }}
                    className="gutter-row"
                    lg={12}
                  >
                    <Button
                      style={{ marginRight: "10px", width: "100%" }}
                      type="primary"
                      shape="round"
                    >
                      Phòng và phòng ngủ
                    </Button>
                  </Col>
                  <Col
                    style={{ margin: "5px 0" }}
                    className="gutter-row"
                    lg={6}
                  >
                    <Button
                      style={{ marginRight: "10px", width: "100%" }}
                      type="primary"
                      shape="round"
                    >
                      Bộ lọc khác
                    </Button>
                  </Col>
                  <Col
                    style={{ margin: "5px 0" }}
                    className="gutter-row"
                    lg={6}
                  >
                    <Dropdown overlay={provincesMenu} trigger={["click"]}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          <Button
                            style={{ marginRight: "10px", width: "100%" }}
                            type="primary"
                            shape="round"
                          >
                            Tỉnh thành
                          </Button>
                        </Space>
                      </a>
                    </Dropdown>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <div className="locationsList">
            <div className="roomInfo">
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 5,
                }}
                dataSource={filteredNewRoomsListData}
                renderItem={(item, idx) => (
                  <List.Item
                    style={{ paddingLeft: "0px" }}
                    key={idx}
                    extra={
                      <img
                        width={272}
                        alt="logo"
                        src={item.image}
                        // src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                      />
                    }
                  >
                    <List.Item.Meta
                      // avatar={<Avatar src={item.avatar} />}
                      // title={<a href={item.href}>{item.title}</a>}
                      title={<Link to={item.link}>{item.title}</Link>}
                      description={item.description}
                    />
                    {item.content}
                  </List.Item>
                )}
              />
            </div>
          </div>

          {/* <LocationsList /> */}
        </Col>
        <Col className="gutter-row" xs={24} lg={12}>
          <div style={style}>
            <LocationsMap province={province} />
          </div>
        </Col>
      </Row>
    </div>
  );
}
