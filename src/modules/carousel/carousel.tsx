import { Carousel as HomeCarousel, Image } from "antd";
import React from "react";

import "./carousel.scss";

export default function Carousel(): JSX.Element {
  return (
    <div id="homeCarousel">
      <HomeCarousel>
        <div>
          <img
            src="https://images.wallpaperscraft.com/image/single/tropical_resort_vacation_90877_2560x1024.jpg"
            alt=""
            style={{ width: "100%", height: "80vh" }}
          />
          {/* <img
            src={require("./vacation_1.jpg")}
            alt=""
            style={{ width: "100%", height: "70vh" }}
          /> */}
        </div>
      </HomeCarousel>

      <div className="homeCarouselOutro" style={{ textAlign: "center" }}>
        <p>Nhờ có Host, mọi điều đều có thể</p>
      </div>
    </div>
  );
}
