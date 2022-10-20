import {
  Button,
  Checkbox,
  Form,
  Input,
  DatePicker,
  Select,
  Image,
  notification,
  InputNumber,
  Switch,
  Row,
  Col,
} from "antd";
import type { DatePickerProps } from "antd";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
//   import { fetchPostLocationsAction } from "../../store/reducers/locationPostReducer";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLocationsListAction } from "../../store/reducers/locationsListReducer";
import { createRoomAction } from "../../store/reducers/roomsListReducer";
import {
  fetchRoomDetailsAction,
  updateRoomAction,
} from "../../store/reducers/roomDetailsReducer";

export default function RoomForm(): JSX.Element {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const params = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const [image, setImage] = useState<string>("");

  useEffect(() => {
    dispatch(fetchLocationsListAction());
  }, []);

  const { locationsList } = useSelector(
    (state: RootState) => state.locationsListReducer
  );

  useEffect(() => {
    if (params.id) {
      dispatch(fetchRoomDetailsAction(parseInt(params.id)));
    }
  }, [params.id]);

  const { roomDetails } = useSelector(
    (state: RootState) => state.roomDetailsReducer
  );

  useEffect(() => {
    if (roomDetails) {
      form.setFieldsValue({
        ...roomDetails,
      });

      setImage(roomDetails.hinhAnh);
    }
  }, [roomDetails]);
  //
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
      lg: { span: 16 },
      xl: { span: 12 },
    },
  };

  const onFinish = (values: any) => {
    for (const key in values) {
      if (values[key] === undefined) {
        values[key] = false;
      }
    }

    if (params.id) {
      values.id = +params.id;
      values.hinhAnh = image;
      const payload = {
        submitData: {
          submitData: values,
          id: +params.id,
        },
        callback: navigate,
      };

      dispatch(updateRoomAction(payload));
    } else {
      values.id = 0;
      values.hinhAnh = image;
      const payload = {
        submitData: values,
        callback: navigate,
      };
      dispatch(createRoomAction(payload));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const hanldeChangeImage = (event: any) => {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      setImage(event.target.result);
      // setSendfile(file);
    };
  };
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="basic"
      layout="vertical"
      // initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ padding: 0, width: "90%", margin: "auto" }}
      autoComplete="off"
    >
      <Form.Item
        label="Tỉnh thành"
        name="maViTri"
        validateTrigger={["onBlur"]}
        rules={[
          {
            required: true,
            message: "Tỉnh thành không được bỏ trống!",
          },
        ]}
      >
        <Select placeholder="Chọn tỉnh thành">
          {locationsList.map((ele) => {
            return (
              <Select.Option key={ele.id} value={ele.id}>
                {ele.tinhThanh}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        label="Tên phòng"
        name="tenPhong"
        rules={[{ required: true, message: "Tên phòng không được bỏ trống!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Hành khách"
        name="khach"
        validateTrigger={["onBlur"]}
        rules={[
          { required: true, message: "Vui lòng điền số khách." },
          {
            pattern: /^[0-9]+$/,
            message: "Số khách không đúng định dạng",
          },
          { min: 1, message: "Số khách phải lớn hơn 0", type: "number" },
          {
            max: 10,
            message: "Số khách phải không được lớn hơn 10",
            type: "number",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Phòng ngủ"
        name="phongNgu"
        validateTrigger={["onBlur"]}
        rules={[
          { required: true, message: "Vui lòng điền số phòng ngủ." },
          {
            pattern: /^[0-9]+$/,
            message: "Số phòng ngủ không đúng định dạng",
          },
          { min: 1, message: "Số phòng ngủ phải lớn hơn 0", type: "number" },
          {
            max: 10,
            message: "Số phòng ngủ phải không được lớn hơn 10",
            type: "number",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Giường"
        name="giuong"
        validateTrigger={["onBlur"]}
        rules={[
          { required: true, message: "Vui lòng điền số giường." },
          {
            pattern: /^[0-9]+$/,
            message: "Số giường không đúng định dạng",
          },
          { min: 1, message: "Số giường phải lớn hơn 0", type: "number" },
          {
            max: 10,
            message: "Số giường phải không được lớn hơn 10",
            type: "number",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Phòng tắm"
        name="phongTam"
        validateTrigger={["onBlur"]}
        rules={[
          { required: true, message: "Vui lòng điền số phòng tắm." },
          {
            pattern: /^[0-9]+$/,
            message: "Số phòng tắm không đúng định dạng",
          },
          { min: 1, message: "Số phòng tắm phải lớn hơn 0", type: "number" },
          {
            max: 10,
            message: "Số phòng tắm phải không được lớn hơn 10",
            type: "number",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Mô tả"
        name="moTa"
        rules={[{ required: true, message: "Mô tả không được bỏ trống!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Giá tiền"
        name="giaTien"
        validateTrigger={["onBlur"]}
        rules={[
          { required: true, message: "Vui lòng điền giá tiền." },
          {
            pattern: /^[0-9]+$/,
            message: "Giá tiền không đúng định dạng",
          },
          { min: 1, message: "Giá tiền phải lớn hơn 0", type: "number" },
          {
            max: 200,
            message: "Giá tiền phải không được lớn hơn 200",
            type: "number",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <div>
        <Row>
          <Col span={6}>
            <Form.Item label="Máy giặt" valuePropName="checked" name="mayGiat">
              <Checkbox defaultChecked={true} />
            </Form.Item>

            <Form.Item label="Bàn là" valuePropName="checked" name="banLa">
              <Checkbox defaultChecked={true} />
            </Form.Item>

            <Form.Item label="Tivi" valuePropName="checked" name="tivi">
              <Checkbox defaultChecked={true} />
            </Form.Item>

            <Form.Item label="Điều hòa" valuePropName="checked" name="dieuHoa">
              <Checkbox defaultChecked={true} />
            </Form.Item>

            <Form.Item label="Wifi" valuePropName="checked" name="wifi">
              <Checkbox defaultChecked={true} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Bếp" valuePropName="checked" name="bep">
              <Checkbox defaultChecked={true} />
            </Form.Item>

            <Form.Item label="Đỗ xe" valuePropName="checked" name="doXe">
              <Checkbox defaultChecked={true} />
            </Form.Item>

            <Form.Item label="Hồ bơi" valuePropName="checked" name="hoBoi">
              <Checkbox defaultChecked={true} />
            </Form.Item>

            <Form.Item label="Bàn ủi" valuePropName="checked" name="banUi">
              <Checkbox defaultChecked={true} />
            </Form.Item>
          </Col>
        </Row>
      </div>
      <Form.Item label="Hình ảnh">
        <Input type="file" onChange={hanldeChangeImage} />
        <Image
          src={image}
          style={{ padding: "50px" }}
          alt="pic"
          onChange={hanldeChangeImage}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
