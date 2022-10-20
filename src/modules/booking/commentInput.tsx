import { Avatar, Button, Comment, Form, Input, List, Rate } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createCommentAction } from "../../store/reducers/commentsListReducer";
import { AppDispatch, RootState } from "../../store/store";

import "./comment-input.scss";

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

export default function CommentInput() {
  const dispatch = useDispatch<AppDispatch>();

  const { roomDetails } = useSelector(
    (state: RootState) => state.roomDetailsReducer
  );

  const { userInfo } = useSelector(
    (state: RootState) => state.authenticationReducer
  );

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

    setComments({
      ...comments,
      id: 0,
      maPhong: roomDetails!.id,
      maNguoiBinhLuan: userInfo!.id,
      ngayBinhLuan: currentDate.format("DD/MM/YYYY"),
      noiDung: e.target.value,
      saoBinhLuan: rateValue,
    });
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

    dispatch(createCommentAction(comments));

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

  console.log(comments);

  return (
    <div id="commentInput">
      <>
        {/* {comments.length > 0 && <CommentList comments={comments} />} */}
        {userInfo ? (
          <Comment
            avatar={
              <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
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
        ) : (
          "Đăng nhập để bình luận về địa điểm này!"
        )}
      </>
    </div>
  );
}
