import React, { useEffect, useRef } from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { loginAction } from "../../store/reducers/authenicationReducer";
import { USER_INFO_KEY } from "../../constants/common";

import "./login.scss";

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { userInfo } = useSelector(
    (state: RootState) => state.authenticationReducer
  );

  useEffect(() => {
    if (userInfo !== null) {
      navigate("/");
    }
  });

  const onFinish = (values: any) => {
    const loginData = {
      email: values.email,
      password: values.password,
    };

    dispatch(loginAction(loginData));

    console.log(userInfo);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    // <div id="login">
    //   <div>
    // <Form
    //   name="basic"
    //   labelCol={{ span: 8 }}
    //   wrapperCol={{ span: 16 }}
    //   initialValues={{ remember: true }}
    //   onFinish={onFinish}
    //   onFinishFailed={onFinishFailed}
    //   autoComplete="off"
    //   className="mx-auto"
    //   style={{ width: "40%" }}
    // >
    //   <Form.Item
    //     label="Email"
    //     name="email"
    //     rules={[{ required: true, message: "Please input your username!" }]}
    //   >
    //     <Input />
    //   </Form.Item>

    //   <Form.Item
    //     label="Password"
    //     name="password"
    //     rules={[{ required: true, message: "Please input your password!" }]}
    //   >
    //     <Input.Password />
    //   </Form.Item>

    //   <Form.Item
    //     name="remember"
    //     valuePropName="checked"
    //     wrapperCol={{ offset: 8, span: 16 }}
    //   >
    //     <Checkbox>Remember me</Checkbox>
    //   </Form.Item>

    //   <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    //     <Button type="primary" htmlType="submit">
    //       Submit
    //     </Button>
    //   </Form.Item>
    // </Form>
    //   </div>
    // </div>

    <div id="login-form">
      <section
        className="gradient-form"
        style={{ backgroundColor: "#eee", width: "100%", height: "100vh" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100"
                          height="50"
                          viewBox="329.775 439.999 320.426 100.002"
                        >
                          <path
                            d="M498.65 465.125c0 3.604-2.904 6.506-6.508 6.506s-6.506-2.902-6.506-6.506 2.803-6.506 6.506-6.506c3.706.1 6.508 3.003 6.508 6.506zm-26.828 13.114v1.602s-3.102-4.006-9.709-4.006c-10.91 0-19.42 8.309-19.42 19.82 0 11.412 8.41 19.82 19.42 19.82 6.707 0 9.709-4.104 9.709-4.104v1.701c0 .801.602 1.4 1.402 1.4h8.107v-37.639h-8.107c-.8.003-1.402.705-1.402 1.406zm0 24.123c-1.5 2.203-4.504 4.105-8.107 4.105-6.406 0-11.312-4.004-11.312-10.812 0-6.807 4.906-10.811 11.312-10.811 3.504 0 6.707 2.002 8.107 4.104v13.414zm15.516-25.526h9.609v37.639h-9.609v-37.639zm143.545-1.002c-6.607 0-9.711 4.006-9.711 4.006v-21.121h-9.609v55.756h8.109c.801 0 1.4-.701 1.4-1.402v-1.701s3.104 4.104 9.709 4.104c10.912 0 19.42-8.406 19.42-19.818s-8.508-19.824-19.318-19.824zm-1.602 30.532c-3.705 0-6.607-1.9-8.109-4.104v-13.414c1.502-2.002 4.705-4.104 8.109-4.104 6.406 0 11.311 4.004 11.311 10.811s-4.904 10.811-11.311 10.811zm-22.722-14.213v22.422h-9.611v-21.322c0-6.205-2.002-8.709-7.404-8.709-2.902 0-5.906 1.502-7.811 3.705v26.227h-9.607v-37.639h7.605c.801 0 1.402.701 1.402 1.402v1.602c2.803-2.904 6.506-4.006 10.209-4.006 4.205 0 7.709 1.203 10.512 3.605 3.402 2.803 4.705 6.406 4.705 12.713zm-57.76-16.319c-6.605 0-9.709 4.006-9.709 4.006v-21.121h-9.609v55.756h8.107c.801 0 1.402-.701 1.402-1.402v-1.701s3.104 4.104 9.709 4.104c10.912 0 19.42-8.406 19.42-19.818.1-11.413-8.408-19.824-19.32-19.824zm-1.602 30.532c-3.703 0-6.605-1.9-8.107-4.104v-13.414c1.502-2.002 4.705-4.104 8.107-4.104 6.408 0 11.312 4.004 11.312 10.811s-4.904 10.811-11.312 10.811zm-26.025-30.532c2.902 0 4.404.502 4.404.502v8.908s-8.008-2.703-13.012 3.004v26.326h-9.611v-37.738h8.109c.801 0 1.4.701 1.4 1.402v1.602c1.804-2.103 5.708-4.006 8.71-4.006zm-99.799 35.237c-.5-1.201-1.001-2.502-1.501-3.604-.802-1.801-1.603-3.504-2.302-5.105l-.1-.1c-6.908-15.016-14.314-30.23-22.123-45.244l-.3-.602a196.953 196.953 0 0 1-2.401-4.705c-1.002-1.803-2.002-3.703-3.604-5.506-3.203-4.004-7.808-6.207-12.712-6.207-5.006 0-9.51 2.203-12.812 6.006-1.502 1.801-2.604 3.703-3.604 5.506a217.271 217.271 0 0 1-2.401 4.705l-.301.602c-7.708 15.014-15.215 30.229-22.122 45.244l-.101.199c-.7 1.604-1.502 3.305-2.303 5.105-.5 1.102-1 2.303-1.5 3.604-1.302 3.703-1.703 7.207-1.201 10.812 1.101 7.508 6.105 13.812 13.013 16.617 2.603 1.102 5.306 1.602 8.108 1.602.801 0 1.801-.1 2.603-.201 3.304-.4 6.707-1.5 10.011-3.402 4.104-2.303 8.008-5.605 12.412-10.41 4.404 4.805 8.408 8.107 12.412 10.41 3.305 1.902 6.707 3.002 10.01 3.402.801.102 1.803.201 2.604.201 2.803 0 5.605-.5 8.107-1.602 7.008-2.805 11.912-9.209 13.014-16.617.795-3.503.395-7.005-.906-10.71zm-45.144 5.205c-5.406-6.807-8.91-13.213-10.11-18.617-.5-2.303-.601-4.305-.3-6.107.199-1.602.801-3.004 1.602-4.205 1.902-2.701 5.105-4.404 8.809-4.404 3.705 0 7.008 1.602 8.81 4.404.801 1.201 1.401 2.604 1.603 4.205.299 1.803.199 3.904-.301 6.107-1.205 5.304-4.709 11.711-10.113 18.617zm39.938 4.705c-.7 5.205-4.204 9.711-9.108 11.713-2.402 1-5.006 1.301-7.607 1-2.502-.301-5.006-1.102-7.607-2.602-3.604-2.004-7.207-5.105-11.412-9.711 6.606-8.107 10.61-15.516 12.112-22.121.701-3.104.802-5.906.5-8.51-.399-2.502-1.301-4.805-2.702-6.807-3.105-4.506-8.311-7.107-14.115-7.107s-11.01 2.703-14.113 7.107c-1.401 2.002-2.303 4.305-2.703 6.807-.4 2.604-.301 5.506.5 8.51 1.501 6.605 5.605 14.113 12.111 22.221-4.104 4.605-7.808 7.709-11.412 9.711-2.603 1.502-5.104 2.303-7.606 2.602-2.702.301-5.306-.1-7.608-1-4.904-2.002-8.408-6.508-9.108-11.713-.3-2.502-.101-5.004.901-7.807.299-1.002.801-2.002 1.301-3.203.701-1.602 1.5-3.305 2.302-5.006l.101-.199c6.906-14.916 14.313-30.131 22.021-44.945l.3-.602c.802-1.5 1.603-3.102 2.403-4.604.801-1.602 1.701-3.104 2.803-4.406 2.102-2.4 4.904-3.703 8.008-3.703s5.906 1.303 8.008 3.703c1.102 1.305 2.002 2.807 2.803 4.406.802 1.502 1.603 3.104 2.402 4.604l.301.602a1325.424 1325.424 0 0 1 21.922 45.045v.1c.802 1.604 1.502 3.404 2.303 5.008.5 1.199 1.001 2.199 1.301 3.201.799 2.6 1.099 5.104.698 7.706z"
                            fill="#ff5a5f"
                          ></path>
                        </svg>
                        <h4 className="mt-1 mb-5 pb-1"></h4>
                      </div>
                      {/* <form className="form">
                        <p>Please login to your account</p>
                        <div className="field">
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="Please type your ID"
                            autoComplete="off"
                          />
                          <label htmlFor="name" className="label-wrapper">
                            <span className="label-text">Username</span>
                          </label>
                        </div>
                        <div className="field">
                          <input
                            type="text"
                            name="name"
                            placeholder="Please type your password"
                            required
                            autoComplete="off"
                          />
                          <label htmlFor="name" className="label-wrapper">
                            <span className="label-text">Password</span>
                          </label>
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3"
                            type="button"
                          >
                            Log in
                          </button>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 mr-2 me-2">
                            Don't have an account?
                          </p>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                          >
                            Create new
                          </button>
                        </div>
                      </form> */}
                      <div>
                        <Form
                          name="basic"
                          // labelCol={{ span: 8 }}
                          // wrapperCol={{ span: 16 }}
                          initialValues={{ remember: true }}
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                          autoComplete="off"
                          className="mx-auto"
                          layout="vertical"
                          style={{ width: "100%" }}
                        >
                          <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                              {
                                required: true,
                                message: "Please input your email!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                              {
                                required: true,
                                message: "Please input your password!",
                              },
                            ]}
                          >
                            <Input.Password />
                          </Form.Item>

                          <Form.Item
                            name="remember"
                            valuePropName="checked"
                            // wrapperCol={{ offset: 8, span: 16 }}
                          >
                            <Checkbox>Remember me</Checkbox>
                          </Form.Item>

                          <Form.Item
                          //  wrapperCol={{ offset: 8, span: 16 }}
                          >
                            <Button type="primary" htmlType="submit">
                              Login
                            </Button>
                          </Form.Item>
                          <div>
                            <p>
                              Chưa là thành viên?{" "}
                              <span>
                                <Link
                                  style={{ color: "#dd3675" }}
                                  to={"/register"}
                                >
                                  Đăng ký ngay!
                                </Link>
                              </span>
                            </p>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">Chúng tôi hơn cả 1 công ty</h4>
                      <p
                        className="small mb-0"
                        style={{ textAlign: "justify" }}
                      >
                        Khi đến với chúng tôi bạn sẽ được trải nghiệm những dịch
                        vụ tối ưu nhất, những địa điểm tuyệt vời nhất, những món
                        ăn đặc trưng với những nền văn hóa độc đáo khi bạn đặt
                        chân đến sẽ cho bạn những kỹ niệm khó quên bên gia đình.
                        Chúng tôi luôn mong muốn mang lại cho bạn những chuyến
                        đi an toàn và trọn vẹn nhất. Niềm vui của bạn là sự hạnh
                        phúc với chúng tôi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
