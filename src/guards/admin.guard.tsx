import { notification } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";

export default function AdminGuard() {
  const { userInfo } = useSelector(
    (state: RootState) => state.authenticationReducer
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      return navigate("/login");
    }

    if (userInfo && userInfo.role !== "ADMIN") {
      notification.warning({
        message: "Access denied!",
      });
      return navigate("/");
    }
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
}
