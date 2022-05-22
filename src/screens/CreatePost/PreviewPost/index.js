import React, { useState, useEffect } from "react";
import "./_preview.scss";
import Preloading from "../../../components/Loading";
import SlideDetail from "../../../components/SlideShow/SlideDetail";
import { formatPrice } from "../../../utils/common";

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
