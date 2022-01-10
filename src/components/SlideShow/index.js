import React, { useEffect } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Grid } from "@material-ui/core";
import "./slideShow.scss";

export default function SlideShow({ dataSlides }) {
  const properties = {
    duration: 5000,
    transitionDuration: 1000,
    infinite: true,
    indicators: false,
    arrows: false,
  };

  return (
    <div className="slideShowContainer">
      <Slide {...properties}>
        {dataSlides.map((data) => (
          <div key="{data.id}">
            <div
              style={{
                backgroundImage: `url(${data.image})`,
              }}
              className="slide-show-image"
            ></div>
          </div>
        ))}
      </Slide>
    </div>
  );
}
