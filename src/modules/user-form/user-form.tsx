import { Button, Checkbox, Form, Input, DatePicker, Select } from "antd";
import type { DatePickerProps } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./user-form.scss";
// import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  fetchUserDetailedInfoAction,
  updateUserAction,
} from "../../store/reducers/userDetailsReducer";
import moment from "moment";
import { UserGender } from "../../enums/user";
import { createUserAction } from "../../store/reducers/usersListReducer";
import { LoadingContext } from "../../context/loading.context";

export default function UserForm(): JSX.Element {
  const { Option } = Select;

  const navigate = useNavigate();

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const handleChangeOne = (value: string) => {
    console.log(`selected ${value}`);
  };
  const handleChangeTwo = (value: string) => {
    console.log(`selected ${value}`);
  };

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
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 0,
      },
    },
  };

  const [form] = Form.useForm();

  const params: any = useParams();

  const [state, setState] = useState();

  console.log(params.id);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (params.id) {
      dispatch(fetchUserDetailedInfoAction(params.id));
    }
  }, [params.id]);

  const { userDetail } = useSelector(
    (state: RootState) => state.userDetailsReducer
  );

  useEffect(() => {
    if (userDetail) {
      form.setFieldsValue({
        ...userDetail,
        birthday: moment(userDetail?.birthday),
      });
    }
  }, [userDetail]);

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(moment(date).format("DD/MM/YYYY"));
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);

    const { name, email, password, phone, birthday, gender, role } = values;

    if (params.id) {
      const payload = {
        submitData: {
          submitData: {
            id: 0,
            name,
            email,
            phone,
            birthday: birthday.format("DD/MM/YYYY"),
            gender,
            role,
          },
          id: userDetail!.id,
        },
        callback: navigate,
        destination: "admin/user-management",
      };

      console.log(payload);

      dispatch(updateUserAction(payload));
    } else {
      const payload = {
        submitData: {
          id: 0,
          name,
          email,
          password,
          phone,
          birthday: birthday.format("DD/MM/YYYY"),
          gender,
          role,
        },
        callback: navigate,
      };

      console.log(payload);

      dispatch(createUserAction(payload));
    }
  };

  return (
    <div>
      <Form
        {...formItemLayout}
        form={form}
        name="basic"
        layout="vertical"
        // initialValues={{ remember: true }}
        initialValues={{
          name: "",
          password: "",
          email: "",
          phone: "",
          address: "",
          birthday: "",
          gender: "",
          role: "",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ padding: 0, width: "90%", margin: "auto" }}
        autoComplete="off"
      >
        <Form.Item
          label="Họ tên"
          name="name"
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "Họ tên không được bỏ trống.",
            },
            {
              pattern: new RegExp(
                "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                  "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                  "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
              ),
              message: "Họ tên không đúng định dạng.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {!params.id && (
          <Form.Item
            label="Mật khẩu"
            name="password"
            validateTrigger={["onBlur"]}
            rules={[
              {
                required: true,
                message: "Mật khẩu không được bỏ trống.",
              },
              {
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message:
                  "Mật khẩu phải có ít nhất 8 ký tự, bao gồm 1 chữ số, 1 chữ in hoa, 1 chữ thường.",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item
          label="Email"
          name="email"
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "Email không được bỏ trống.",
            },
            {
              pattern: new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"),
              message: "Email không đúng định dạng.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "Số điện thoại không được bỏ trống.",
            },
            {
              pattern: /^[0-9]+$/,
              message: "Số điện thoại không đúng định dạng.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ngày sinh"
          name="birthday"
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "Ngày sinh không được bỏ trống.",
            },
          ]}
        >
          <DatePicker onChange={onChange} />
        </Form.Item>

        <Form.Item
          label="Giới tính"
          name="gender"
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "Giới tính không được bỏ trống.",
            },
          ]}
        >
          <Select style={{ width: 120 }} onChange={handleChangeOne}>
            <Option value={true}>Nam</Option>
            <Option value={false}>Nữ</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Loại người dùng"
          name="role"
          validateTrigger={["onBlur"]}
          rules={[
            {
              required: true,
              message: "Loại người dùng không được bỏ trống.",
            },
          ]}
        >
          <Select style={{ width: 120 }} onChange={handleChangeTwo}>
            <Option value="ADMIN">Admin</Option>
            <Option value="USER">User</Option>
          </Select>
        </Form.Item>
        <Form.Item
          // wrapperCol={{ offset: 8, span: 16 }}
          {...tailFormItemLayout}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
