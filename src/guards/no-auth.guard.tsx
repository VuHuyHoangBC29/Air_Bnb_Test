import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";

export default function NoAuthGuard() {
  const { userInfo } = useSelector(
    (state: RootState) => state.authenticationReducer
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
}
