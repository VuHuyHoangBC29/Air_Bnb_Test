import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Modal,
  Image,
  UploadProps,
  message,
  Upload,
} from "antd";
import { Option } from "antd/lib/mentions";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { idText } from "typescript";
import {
  TOKEN_CYBERSOFT,
  USER_INFO_KEY,
  USER_TOKEN,
} from "../../constants/common";
import { LoadingContext } from "../../context/loading.context";
import { UserGender } from "../../enums/user";
import { updateUserApi } from "../../services/user";
import {
  fetchUserDetailedInfoAction,
  updateUserAvatarAction,
} from "../../store/reducers/userDetailsReducer";
import { AppDispatch, RootState } from "../../store/store";

export default function ProfileInfoAvatar(): JSX.Element {
  const { Meta } = Card;

  // const params = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const [avatar, setAvatar] = useState();

  const [file, setFile] = useState<any>();

  const [form] = Form.useForm();

  // useEffect(() => {
  //   if (params.userId) {
  //     dispatch(fetchUserDetailedInfoAction(+params.userId));
  //   }
  // }, [params.userId]);

  const { userDetail, loading } = useSelector(
    (state: RootState) => state.userDetailsReducer
  );

  const { isLoading, setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (loading === true) {
      setIsLoading({ isLoading: true, setIsLoading });
    } else {
      setIsLoading({ isLoading: false, setIsLoading });
    }
  });

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    const formData = new FormData();

    file && formData.append("formFile", file, file.name);

    dispatch(updateUserAvatarAction(formData));

    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleChangeAvatar = (event: any) => {
    const file = event.target.files[0];

    console.log(event.target.files);
    console.log(file);

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      console.log(e.target.result);
      setAvatar(e.target.result);
      setFile(file);
      // console.log({image, file});
    };
    console.log(file);
  };

  return (
    <div>
      <Card
        // hoverable
        style={{ width: "100%" }}
        actions={[<EditOutlined onClick={showModal} key="edit" />]}
      >
        <img className="img-fluid" alt="example" src={userDetail?.avatar} />
      </Card>

      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Chọn ảnh: </p>
        <Form>
          <Form.Item>
            <Input type="file" onChange={handleChangeAvatar} />
          </Form.Item>

          <Image src={avatar} />
        </Form>
      </Modal>
    </div>
  );
}
