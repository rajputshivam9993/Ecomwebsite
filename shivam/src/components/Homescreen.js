import React, { useState } from "react";
import Navbarf from "./Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Fieldbox from "./Fieldbox";
function Homescreen() {
  const [data, setData] = useState("");
  const [refreshValue, setRefreshValue] = useState(false);

  const settings = {
    infinite: true,
    speed: 500, 
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleRefresh = () => {
    console.log(refreshValue)
    setRefreshValue(!refreshValue);
  };

  const handleDataChange = (newData) => {
    setData(newData);
  };

  return (
    <>
      <div>
        <Navbarf refreshValue={refreshValue} onDataChange={handleDataChange} />
        <div className="slider-container">
          <Slider {...settings}>
            <div>
              <img
                className="imgs"
                src={require("../Assets/ecom2.png")}
                alt="Slide-1"
              />
            </div>
            <div>
              <img
                className="imgs"
                src={require("../Assets/ecom2.png")}
                alt="Slide-2"
              />
            </div>

            <div>
              <img
                className="imgs"
                src={require("../Assets/ecom2.png")}
                alt="Slide-3"
              />
            </div>
          </Slider>
        </div>
        <Fieldbox handleRefresh={handleRefresh} data={data} />
      </div>
    </>
  );
}

export default Homescreen;
