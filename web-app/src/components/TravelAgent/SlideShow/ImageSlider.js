import React, { useState } from 'react';
import { SliderData } from './SliderData';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = ({ slides }) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };

  return (
    <div style={{marginTop: "2px"}}>
      <Slider {...settings}>
        <div >
          <img src="/1b.jpg" style={{ height: '600px', width: '100%',objectFit:'cover' }} />
        </div>
        <div>
          <img src="/2b.jpg" style={{ height: '600px', width: '100%',objectFit:'cover' }} />
        </div>
        <div>
          <img src="/3b.jpg" style={{ height: '600px', width: '100%',objectFit:'cover' }} />
        </div>
        <div>
          <img src="/4b.jpg" style={{ height: '600px', width: '100%',objectFit:'cover' }} />
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;