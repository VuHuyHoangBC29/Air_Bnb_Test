import { Table, Input, Space, Button } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import React, { useContext, useEffect, useState } from "react";
import { deleteUserAction } from "../../store/reducers/usersListReducer";
import { AppDispatch, RootState } from "../../store/store";
import {
  EditOutlined,
  SolutionOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersListAction,
  fetchUsersListByPageAction,
} from "../../store/reducers/usersListReducer";
import { userDetailsActions } from "../../store/reducers/userDetailsReducer";
import { LoadingContext } from "../../context/loading.context";

export default function UserManagement(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const [pageCurrent, setPageCurrent] = useState<number>(1);

  const { usersList } = useSelector(
    (state: RootState) => state.usersListReducer
  );

  useEffect(() => {
    dispatch(fetchUsersListByPageAction(1));
    dispatch(userDetailsActions.handleRemoveUserDetail(null));
  }, []);

  console.log(usersList);

  const navigate = useNavigate();

  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        navigate("/admin/user-management/create-user");
        return newLoadings;
      });
    }, 1000);
  };

  const { Search } = Input;

  const onSearch = (value: string) => console.log(value);

  interface DataType {
    key: React.Key;
    id: number;
    name: string;
    email: string;
    password: string | null;
    phone: number | null;
    birthday: string;
    avatar: string | null;
    gender: boolean | null;
    role: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
      width: "5%",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend"],
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      width: "10%",
      //   filters: [
      //     {
      //       text: "Joe",
      //       value: "Joe",
      //     },
      //     {
      //       text: "Jim",
      //       value: "Jim",
      //     },
      //   ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      //   onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: "8%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "10%",
      defaultSortOrder: "descend",
    },

    {
      title: "Password",
      dataIndex: "password",
      width: "5%",
    },

    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      width: "5%",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      width: "7%",
      render: (text) => {
        return <>{text === true ? <span>Nam</span> : <span>Nữ</span>}</>;
      },
    },
    {
      title: "Quyền",
      dataIndex: "role",
      width: "5%",
      filters: [
        {
          text: "ADMIN",
          value: "ADMIN",
        },
        {
          text: "USER",
          value: "USER",
        },
      ],
      onFilter: (value, record) => record.role.indexOf(value as string) === 0,
    },
    {
      title: "Tương tác",
      dataIndex: "tuongTac",
      width: "7%",
      render: (text) => {
        return (
          <>
            <Link to={`/admin/user-management/${text}/edit-user`}>
              <EditOutlined />
            </Link>

            <a
              onClick={() => {
                dispatch(deleteUserAction(parseInt(text)));
              }}
              className="pl-4"
            >
              <DeleteOutlined />
            </a>
          </>
        );
      },
    },
  ];

  const data = usersList.map((ele, index) => {
    return {
      key: index + 1,
      id: ele.id,
      name: ele.name,
      email: ele.email,
      password: ele.password,
      phone: ele.phone,
      birthday: ele.birthday,
      avatar: ele.avatar,
      gender: ele.gender,
      role: ele.role,
      tuongTac: ele.id,
    };
  });

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
      <Space
        style={{ width: "100%" }}
        direction="vertical"
        className="w-100 py-3"
      >
        <Button
          type="primary"
          loading={loadings[0]}
          onClick={() => enterLoading(0)}
        >
          Thêm người dùng
        </Button>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        />
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={{
          pageSize: 10,
          total: 100,
          onChange: async (page) => {
            await dispatch(fetchUsersListByPageAction(page));
            setPageCurrent(page);
          },
        }}
      />
    </>
  );
}
