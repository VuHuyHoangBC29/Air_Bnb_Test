import { StarFilled } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  notification,
  Row,
  Select,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookTicketAction } from "../../store/reducers/ticketsListReducer";
import { AppDispatch, RootState } from "../../store/store";

import "./booking.scss";

export default function RoomBooking() {
  const { userInfo } = useSelector(
    (state: RootState) => state.authenticationReducer
  );

  const { roomDetails } = useSelector(
    (state: RootState) => state.roomDetailsReducer
  );

  const { commentsList } = useSelector(
    (state: RootState) => state.commentsListReducer
  );

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { RangePicker } = DatePicker;

  const [ticketInfo, setTicketInfo] = useState({
    guestAmount: 1,
    dayCount: 0,
    basicPrice: 0,
    ngayDen: "",
    ngayDi: "",
  });

  const commentsListByRoomId = commentsList.filter((ele, idx) => {
    return ele.maPhong === roomDetails?.id;
  });

  const starArr = commentsListByRoomId.map((ele) => ele.saoBinhLuan);

  const avgStar =
    Math.round(
      (starArr.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      ) /
        starArr.length +
        Number.EPSILON) *
        100
    ) / 100;

  let roomGuestAmountArr = [];

  if (roomDetails?.khach) {
    for (let i = 1; i <= roomDetails?.khach; i++) {
      roomGuestAmountArr.push(i);
    }
  }

  const onDateChange: RangePickerProps["onChange"] = (dates, dateStrings) => {
    if (dates) {
      // console.log("From: ", dates[0], ", to: ", dates[1]);
      // console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);

      let startDate = dates[0];
      let timeEnd = dates[1];

      const diff = timeEnd?.diff(startDate);

      const diffDuration = moment.duration(diff);

      console.log(diffDuration.days());

      if (roomDetails) {
        const giaTien = roomDetails?.giaTien;
        const basicPrice = giaTien * diffDuration.days();

        setTicketInfo({
          ...ticketInfo,
          dayCount: diffDuration.days(),
          basicPrice: basicPrice,
          ngayDen: dates[0]!.toISOString(),
          ngayDi: dates[1]!.toISOString(),
        });
      }
      console.log("Days:", diffDuration.days());
    } else {
      console.log("Clear");

      setTicketInfo({
        ...ticketInfo,
        dayCount: 0,
        basicPrice: 0,
        ngayDen: "",
        ngayDi: "",
      });
    }
  };

  const onGuestAmountChange = (value: number) => {
    // console.log(`selected ${value}`);

    setTicketInfo({
      ...ticketInfo,
      guestAmount: value,
    });
  };

  const onSubmit = () => {
    const payload = {
      submitData: {
        id: 0,
        maPhong: roomDetails?.id,
        ngayDen: ticketInfo.ngayDen,
        ngayDi: ticketInfo.ngayDi,
        soLuongKhach: ticketInfo.guestAmount,
        maNguoiDung: userInfo?.id,
      },
      callback: navigate,
    };

    dispatch(bookTicketAction(payload));
  };

  return (
    <Card
      id="bookingCard"
      title={`$${roomDetails?.giaTien}/đêm`}
      extra={
        <div style={{ display: "flex", alignItems: "center" }}>
          <StarFilled />{" "}
          {avgStar ? (
            <span style={{ marginLeft: "5px" }}>{avgStar}</span>
          ) : (
            <span style={{ marginLeft: "5px" }}>Chưa có đánh giá nào</span>
          )}
        </div>
      }
      style={{ width: 400, height: 400 }}
    >
      <div id="datePicker">
        <RangePicker
          placeholder={["Ngay nhận phòng", "Ngày trả phòng"]}
          ranges={{
            Today: [moment(), moment()],
            "This Month": [moment().startOf("month"), moment().endOf("month")],
          }}
          onChange={onDateChange}
        />
      </div>
      <div id="guestAmount">
        <div>
          Khách:
          <Select
            id="guestPrice"
            defaultValue={1}
            style={{ width: "100%", margin: "10px 0" }}
            onChange={onGuestAmountChange}
          >
            {roomGuestAmountArr.map((ele, idx) => {
              return (
                <Select.Option key={idx} value={ele}>
                  {ele}
                </Select.Option>
              );
            })}
          </Select>
        </div>
      </div>
      <Button
        onClick={onSubmit}
        type="primary"
        style={{ width: "100%", margin: "10px 0" }}
      >
        {" "}
        Đặt phòng
      </Button>
      <div id="basicPrice">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={12}>
            {ticketInfo.dayCount !== 0 && (
              <div>
                ${roomDetails?.giaTien} x {ticketInfo.dayCount} đêm
              </div>
            )}
          </Col>
          <Col style={{ textAlign: "right" }} className="gutter-row" span={12}>
            {ticketInfo.dayCount !== 0 && <div>${ticketInfo.basicPrice}</div>}
          </Col>
        </Row>

        {ticketInfo.dayCount !== 0 && (
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={12}>
              <div>Phí dịch vụ</div>
            </Col>
            <Col
              style={{ textAlign: "right" }}
              className="gutter-row"
              span={12}
            >
              <div>
                ${(ticketInfo.basicPrice * ticketInfo.guestAmount * 5) / 100}
              </div>
            </Col>
          </Row>
        )}
      </div>
      <Divider></Divider>
      {ticketInfo.dayCount !== 0 && (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={12}>
            <div>Tổng:</div>
          </Col>
          <Col style={{ textAlign: "right" }} className="gutter-row" span={12}>
            <div>
              $
              {(ticketInfo.basicPrice * ticketInfo.guestAmount * 5) / 100 +
                ticketInfo.basicPrice}
            </div>
          </Col>
        </Row>
      )}
    </Card>
  );
}
