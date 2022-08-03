import React, { useEffect } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./slideDetail.scss";
import imgDefault from "../../../assets/image/product-default.png";

export default function SlideDetail({ dataSlides, video_url }) {
  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
  };

  return (
    <div className="slideDetailContainer">
      <Slide {...properties}>
        {dataSlides ? (
          dataSlides.map((data) => (
            <div key={data.id} className="slide-container">
              <img
                src={data.image_url}
                className="slide-detail-image"
                alt="product-img"
              />
            </div>
          ))
        ) : (
          <div className="slide-container">
            <img
              src={imgDefault}
              className="slide-detail-image"
              alt="product-img"
            />
          </div>
        )}
        {video_url && (
          <div className="slide-container">
            <video controls className="slide-detail-video">
              <source src={video_url} type="video/mp4" />
            </video>
          </div>
        )}
      </Slide>
    </div>
  );
}
