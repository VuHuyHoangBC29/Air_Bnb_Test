import React from "react";
import Carousel from "../../modules/carousel/carousel";
import NearbyPlace from "../../modules/nearby-place/nearby-place";
import StayEverywhere from "../../modules/stay-everywhere/stay-everywhere";

export default function Home(): JSX.Element {
  return (
    <div>
      <Carousel />
      <NearbyPlace />
      <StayEverywhere />
    </div>
  );
}
