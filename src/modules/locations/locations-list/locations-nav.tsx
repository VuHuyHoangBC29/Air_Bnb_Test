import { Button, Col, Dropdown, Menu, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { MenuProps } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface Props {
  province: string;
  handleMenuClick: () => void;
}

export default function LocationsNav({ province, handleMenuClick }: Props) {
  const params = useParams();

  const { locationsList } = useSelector(
    (state: RootState) => state.locationsListReducer
  );

  //   const [province, setProvince] = useState<string>(
  //     params.provinceId ? params.provinceId : "ALL"
  //   );

  //   const handleMenuClick: MenuProps["onClick"] = (e) => {
  //     console.log(e.key);

  //     setProvince(e.key);
  //   };

  const provinceDropdownMenu = locationsList.map((ele, idx) => {
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

  return (
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
            <Col style={{ margin: "5px 0" }} className="gutter-row" lg={12}>
              <Button
                style={{ marginRight: "10px", width: "100%" }}
                type="primary"
                shape="round"
              >
                Phòng và phòng ngủ
              </Button>
            </Col>
            <Col style={{ margin: "5px 0" }} className="gutter-row" lg={6}>
              <Button
                style={{ marginRight: "10px", width: "100%" }}
                type="primary"
                shape="round"
              >
                Bộ lọc khác
              </Button>
            </Col>
            <Col style={{ margin: "5px 0" }} className="gutter-row" lg={6}>
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
  );
}
