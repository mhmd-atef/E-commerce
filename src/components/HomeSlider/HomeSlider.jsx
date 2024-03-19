import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeSilder() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div>
        <Slider {...settings}>
          <div>
            <img
              style={{ width: "100%", height: "400px" }}
              src={require("../../Assets/images/slider-image-1.jpeg")}
              alt="Slider"
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: "400px" }}
              src={require("../../Assets/images/slider-image-2.jpeg")}
              alt="Slider"
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: "400px" }}
              src={require("../../Assets/images/slider-image-3.jpeg")}
              alt="Slider"
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: "400px" }}
              src={require("../../Assets/images/slider-2.jpeg")}
              alt="Slider"
            />
          </div>
        </Slider>
      </div>
    </>
  );
}
