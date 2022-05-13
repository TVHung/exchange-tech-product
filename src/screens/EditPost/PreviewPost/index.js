import React, { useState, useEffect } from "react";
import "./_preview.scss";
import Preloading from "../../../components/Loading";
import SlideDetail from "../../../components/SlideShow/SlideDetail";
import { formatPrice } from "../../../utils/common";
import iphone1 from "../../../assets/image/iphone-13-hong.jpg";
import iphone2 from "../../../assets/image/iPhone-13-mau-hong-jpeg-7940-1622557449.jpg";
import iphone3 from "../../../assets/image/iphone-13.jpg";

export default function PreviewPost() {
  const [preload, setPreload] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPreload(true);
    }, 500);
    return () => {};
  }, []);

  return (
    <div className="detail-container containers">
      {!preload ? <Preloading /> : <></>}
    </div>
  );
}
