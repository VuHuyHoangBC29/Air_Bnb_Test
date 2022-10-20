import { Table, Input, Space, Button } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store/store";
import {
  EditOutlined,
  SolutionOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersListAction } from "../../store/reducers/usersListReducer";

export default function UserTable() {
//   const navigate = useNavigate();

//   const { usersList } = useSelector(
//     (state: RootState) => state.usersListReducer
//   );

//   const columns = [
//     {
//       title: "Tài khoản",
//       dataIndex: "taiKhoan",
//       key: "taiKhoan",
//       render: (text) => <a>{text}</a>,
//     },
//     {
//       title: "Họ tên",
//       dataIndex: "hoTen",
//       key: "hoTen",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Số đt",
//       dataIndex: "soDT",
//       key: "soDT",
//     },
//     {
//       title: "Loại ND",
//       dataIndex: "maLoaiNguoiDung",
//       key: "maLoaiNguoiDung",
//     },

//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Space size="middle">
//           <Button
//             onClick={() =>
//               navigate(`/admin/user-management/${record.taiKhoan}/update-user`)
//             }
//             type="primary"
//           >
//             <i className="fa-solid fa-pen-to-square"></i>
//           </Button>
//           <Button onClick={() => deleteUser(record.taiKhoan)} type="danger">
//             <i className="fa-solid fa-trash"></i>
//           </Button>
//         </Space>
//       ),
//     },
//   ];

  return <div>user-table</div>;
}
