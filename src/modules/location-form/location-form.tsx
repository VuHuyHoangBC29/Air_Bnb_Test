import {
  Button,
  Checkbox,
  Form,
  Input,
  DatePicker,
  Select,
  Image,
  notification,
} from "antd";
import type { DatePickerProps } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
//   import { fetchPostLocationsAction } from "../../store/reducers/locationPostReducer";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLocationDetailsAction } from "../../store/reducers/locationDetailsReducer";
import { createLocationAction } from "../../store/reducers/locationsListReducer";
import { updateLocationAction } from "../../store/reducers/locationDetailsReducer";

export default function LocationForm(): JSX.Element {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const params = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const [image, setImage] = useState<string>("");

  const [file, setFile] = useState<string>();

  useEffect(() => {
    if (params.id) {
      dispatch(fetchLocationDetailsAction(parseInt(params.id)));
    }
  }, [params.id]);

  const { locationDetails } = useSelector(
    (state: RootState) => state.locationDetailsReducer
  );

  useEffect(() => {
    if (locationDetails) {
      form.setFieldsValue({
        ...locationDetails,
      });

      setImage(locationDetails.hinhAnh);
    }
  }, [locationDetails]);

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(moment(date).format("DD/MM/YYYY"));
  };

  const onFinish = async (values: any) => {
    if (params.id) {
      values.id = +params.id;
      // values.id = 0;
      values.hinhAnh = image;
      console.log(values);

      const payload = {
        submitData: {
          submitData: values,
          id: +params.id,
        },
        callback: navigate,
      };

      dispatch(updateLocationAction(payload));
    } else {
      values.id = 0;
      values.hinhAnh = image;
      console.log(values);

      const payload = {
        submitData: values,
        callback: navigate,
      };

      dispatch(createLocationAction(payload));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const hanldeChangeImage = (event: any) => {
    const file = event.target.files[0];

    console.log(file.name);

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      setImage(event.target.result);
      setFile(file);
    };
  };

  return (
    <Form
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
        label="Địa danh"
        name="tenViTri"
        rules={[{ required: true, message: "Chưa nhập địa danh!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Tỉnh Thành"
        name="tinhThanh"
        rules={[{ required: true, message: "Chưa nhập tỉnh thành!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Quốc Gia"
        name="quocGia"
        rules={[{ required: true, message: "Chưa nhập quốc gia!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Hình ảnh"
        rules={[{ required: true, message: "Chưa nhập hình ảnh!" }]}
      >
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
