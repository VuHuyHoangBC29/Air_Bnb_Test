import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocationsListAction } from "../../store/reducers/locationsListReducer";
import { AppDispatch, RootState } from "../../store/store";
import { Carousel } from "antd";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { render } from "@testing-library/react";

import "./nearby-place.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function NearbyPlace() {
  const contentStyle: React.CSSProperties = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchLocationsListAction());
  }, []);

  const { locationsList } = useSelector(
    (state: RootState) => state.locationsListReducer
  );

  console.log(locationsList);

  const renderLocations = () => {
    return locationsList?.map((ele, idx) => {
      return (
        <Fragment key={idx}>
          <Link
            id="locationDesc"
            // onClick={() => navigate(`/home2/${ele.id}`)}
            to={`/locations/${ele.id}`}
            className="d-flex justify-content-left align-items-center mb-3 mr-3"
            style={{ textDecoration: "none", color: "black" }}
          >
            <img
              id="locationImg"
              style={{ width: "100px", height: "100px" }}
              className="img-fluid rounded"
              src={ele.hinhAnh}
              alt=""
            />
            <p
              id="locationName"
              style={{ fontWeight: "bolder" }}
              className="mb-0 ml-2"
            >
              {ele.tinhThanh}
            </p>
          </Link>
        </Fragment>
      );
    });
  };

  return (
    <div id="nearbyPlaces" className="mb-5">
      <p className="mb-3 nearbyPlacesIntro">Khám phá những địa điểm gần đây</p>
      <Carousel
        style={{
          // height: "40vh",
          padding: "60px 0",
        }}
        className="px-5"
        slidesToShow={5}
        slidesPerRow={2}
        // rows={2}
        centerPadding={"50px"}
        arrows
        prevArrow={<LeftCircleOutlined />}
        nextArrow={<RightCircleOutlined />}
        responsive={[
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
            },
          },

          {
            breakpoint: 992,
            settings: {
              slidesToShow: 4,
            },
          },

          {
            breakpoint: 800,
            settings: {
              slidesToShow: 3,
            },
          },

          {
            breakpoint: 630,
            settings: {
              slidesToShow: 2,
            },
          },

          {
            breakpoint: 400,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {renderLocations()}
      </Carousel>
    </div>
  );
}
