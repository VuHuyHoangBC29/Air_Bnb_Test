import { StarFilled } from "@ant-design/icons";
import {
  Col,
  Divider,
  Row,
} from "antd"; 
import RoomSummary from "./roomSummary";
import RoomTraits from "./roomTraits";
import RoomUtilities from "./roomUtilities";
import RoomComments from "./roomComments";
import RoomBooking from "./roomBooking";
import CommentInput from "./commentInput";

export default function RoomDetails(): JSX.Element {
  return (
    <div id="roomDetails" style={{ margin: "40px 0" }}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 96 }}>
        <Col
          className="gutter-row"
          // span={18}
          flex={5}
        >
          <RoomSummary />

          <Divider></Divider>

          <RoomTraits />

          <Divider></Divider>

          <RoomUtilities />

          <Divider></Divider>

          <RoomComments />

          <CommentInput />
        </Col>

        <Col
          className="gutter-row"
          // span={6}
          flex={2}
          style={{ display: "flex", justifyContent: "right" }}
        >
          <RoomBooking />
        </Col>
      </Row>
    </div>
  );
}
