import { CloseOutlined } from "@ant-design/icons";
import { Avatar, Button, Comment, Form, Input, List, Modal, Rate } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentAction } from "../../store/reducers/commentsListReducer";
import { AppDispatch, RootState } from "../../store/store";

const { TextArea } = Input;

interface CommentItem2 {
  id: number;
  maPhong: number;
  maNguoiBinhLuan: number;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
}

interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}

export default function RoomComments() {
  const dispatch = useDispatch<AppDispatch>();

  const { roomDetails } = useSelector(
    (state: RootState) => state.roomDetailsReducer
  );

  const { commentsList } = useSelector(
    (state: RootState) => state.commentsListReducer
  );

  const { userInfo } = useSelector(
    (state: RootState) => state.authenticationReducer
  );

  const commentsListByRoomId = commentsList.filter((ele, idx) => {
    return ele.maPhong === roomDetails?.id;
  });

  const commentsByUserId = commentsListByRoomId.filter((ele, idx) => {
    return ele.maNguoiBinhLuan === userInfo?.id;
  });

  console.log(commentsByUserId);

  const roomCommentsData = commentsListByRoomId.map((ele, idx) => {
    return {
      maNguoiBinhLuan: ele.maNguoiBinhLuan,
      maBinhLuan: ele.id,
      title: (
        <div>
          <Rate disabled defaultValue={ele.saoBinhLuan} /> -{" "}
          <span>{ele.ngayBinhLuan}</span>
        </div>
      ),
      description: `${ele.noiDung} <br/> ${ele.ngayBinhLuan}`,
    };
  });

  //Comment modal

  const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          Bình luận
        </Button>
      </Form.Item>
    </>
  );

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [submitting, setSubmitting] = useState(false);

  const [value, setValue] = useState("");

  const [rateValue, setRateValue] = useState<number>(3);

  const [comments, setComments] = useState<CommentItem2>({
    id: 0,
    maPhong: 1,
    maNguoiBinhLuan: 1,
    ngayBinhLuan: "",
    noiDung: "",
    saoBinhLuan: rateValue,
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);

    console.log(e.target.value);

    let currentDate = moment();

    if (userInfo) {
      setComments({
        ...comments,
        id: commentsByUserId[0].id,
        maPhong: commentsByUserId[0].maPhong,
        maNguoiBinhLuan: commentsByUserId[0].maNguoiBinhLuan,
        ngayBinhLuan: commentsByUserId[0].ngayBinhLuan,
        noiDung: commentsByUserId[0].noiDung,
        saoBinhLuan: rateValue,
      });
    }
    // setComments({
    //   ...comments,
    //   id: 0,
    //   maPhong: roomDetails!.id,
    //   maNguoiBinhLuan: userInfo!.id,
    //   ngayBinhLuan: currentDate.format("DD/MM/YYYY"),
    //   noiDung: e.target.value,
    //   saoBinhLuan: rateValue,
    // });
  };

  const handleRateChange = (value: number) => {
    setComments({
      ...comments,
      saoBinhLuan: value,
    });

    setRateValue(value);

    console.log(value);
    console.log(comments);
  };

  const handleSubmit = () => {
    if (!value) return;

    setSubmitting(true);

    // dispatch(createCommentAction(comments));

    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComments({
        id: 0,
        maPhong: 1,
        maNguoiBinhLuan: 1,
        ngayBinhLuan: "",
        noiDung: "",
        saoBinhLuan: 1,
      });
    }, 1000);
  };
  //End comment modal

  return (
    <div id="roomComments">
      <h5>Bình luận</h5>
      <List
        itemLayout="horizontal"
        dataSource={roomCommentsData}
        renderItem={(item) => (
          <>
            <List.Item>
              <List.Item.Meta
                title={<div>{item.title}</div>}
                description={
                  <p dangerouslySetInnerHTML={{ __html: item.description }} />
                }
              />
              {item.maNguoiBinhLuan === userInfo?.id && (
                <>
                  <Button onClick={showModal} id={`${item.maBinhLuan}`}>
                    ABC
                  </Button>
                  <Button
                    onClick={() => {
                      dispatch(deleteCommentAction(item.maBinhLuan));
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <CloseOutlined />
                  </Button>
                </>
              )}
            </List.Item>

            <div id="commentEditor">
              <>
                <Modal
                  open={open}
                  title="Title"
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <Comment
                    avatar={
                      <Avatar
                        src="https://joeschmoe.io/api/v1/random"
                        alt="Han Solo"
                      />
                    }
                    content={
                      <div>
                        <Rate
                          style={{ marginBottom: "15px" }}
                          allowHalf
                          defaultValue={rateValue}
                          onChange={handleRateChange}
                        />
                        <Editor
                          submitting={submitting}
                          onChange={handleChange}
                          onSubmit={handleSubmit}
                          value={value}
                        />
                      </div>
                    }
                  />
                </Modal>
              </>
            </div>
          </>
        )}
      />
      <div id="commentEditor">
        <>
          <Modal
            open={open}
            title="Title"
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Comment
              avatar={
                <Avatar
                  src="https://joeschmoe.io/api/v1/random"
                  alt="Han Solo"
                />
              }
              content={
                <div>
                  <Rate
                    style={{ marginBottom: "15px" }}
                    allowHalf
                    defaultValue={rateValue}
                    onChange={handleRateChange}
                  />
                  <Editor
                    submitting={submitting}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    value={value}
                  />
                </div>
              }
            />
          </Modal>
        </>
      </div>
    </div>
  );
}
