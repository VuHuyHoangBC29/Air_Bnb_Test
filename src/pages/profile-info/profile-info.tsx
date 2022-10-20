import { Col, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LoadingContext } from "../../context/loading.context";
import ProfileInfoAvatar from "../../modules/profile-info/profile-info-avatar";
import ProfileInfoForm from "../../modules/profile-info/profile-info-form";
import { fetchUserDetailedInfoAction } from "../../store/reducers/userDetailsReducer";
import { AppDispatch, RootState } from "../../store/store";

export default function ProfileInfo(): JSX.Element {
  const params = useParams();

  const dispatch = useDispatch<AppDispatch>();

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

  useEffect(() => {
    if (params.userId) {
      dispatch(fetchUserDetailedInfoAction(+params.userId));
    }
  }, [params.userId]);

  return (
    <div id="profileInfo">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 0 }}>
        <Col
          className="gutter-row"
          xs={{ offset: 0, span: 24 }}
          xl={{ offset: 4, span: 8 }}
        >
          <ProfileInfoAvatar />
        </Col>
        <Col
          className="gutter-row"
          xs={{ offset: 0, span: 24 }}
          xl={{ offset: 0, span: 8 }}
        >
          <ProfileInfoForm />
        </Col>
      </Row>
    </div>
  );
}
