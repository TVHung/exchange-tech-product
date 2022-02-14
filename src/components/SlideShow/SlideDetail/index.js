import React, { useEffect } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./slideDetail.scss";

export default function SlideDetail({ dataSlides }) {
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
        {dataSlides.map((data) => (
          <div key="{data.id}">
            <div
              style={{
                backgroundImage: `url(${data.image_url})`,
              }}
              className="slide-detail-image"
            ></div>
          </div>
        ))}
      </Slide>
    </div>
  );
}
