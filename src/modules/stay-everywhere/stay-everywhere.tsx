import React from "react";
import { Col, Row } from "antd";
import { Card } from "antd";

import "./stay-everywhere.scss";

export default function StayEverywhere() {
  const style: React.CSSProperties = {
    background: "#0092ff",
    padding: "8px 0",
  };

  const { Meta } = Card;

  return (
    <div id="stayEverywhere" className="mb-5">
      <p className="stayEverywhereIntro">Ở bất cứ đâu</p>
      <Row id="stayEverywhereList" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={12} md={6} lg={6}>
          <div>
            <Card
              className="item"
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  className="img-fluid"
                  alt="example"
                  src={require("./bigstock-Small-Family-House-With-Curved-317475139.jpg")}
                />
              }
            >
              <Meta title="Toàn bộ nhà" />
            </Card>
          </div>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={6} lg={6}>
          <div>
            <Card
              className="item"
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  className="img-fluid"
                  alt="example"
                  src={require("./10-airship-002-min.jpg")}
                />
              }
            >
              <Meta title="Chỗ ở độc đáo" />
            </Card>
          </div>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={6} lg={6}>
          <div>
            <Card
              className="item"
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  className="img-fluid"
                  alt="example"
                  src={require("./apple-orchard-farm-stay-blackheath-nsw-airbnb.jpg")}
                />
              }
            >
              <Meta title="Trang trại và thiên nhiên" />
            </Card>
          </div>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={6} lg={6}>
          <div>
            <Card
              className="item"
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  className="img-fluid"
                  alt="example"
                  src={require("./keeping-birds-at-home-according-to-vastu.jpg")}
                />
              }
            >
              <Meta title="Cho phép mang theo thú cưng" />
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}
