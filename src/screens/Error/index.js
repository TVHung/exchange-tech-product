import React, { useState, useEffect } from "react";
import "./error.scss";
import pagenotfound from "../../assets/image/error-404.png";
import MetaTag from "../../components/MetaTag";
import Preloading from "../../components/Loading";
import { setLinkDirect } from "../../utils/common";

export default function Error() {
  const [preload, setPreload] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPreload(true);
    }, 500);
    return () => {};
  }, []);

  return (
    <div className="container not-found-page">
      <MetaTag title={"Lỗi"} description={"Trang này không tồn tại"} />
      {!preload ? (
        <Preloading />
      ) : (
        <>
          <div className="col-12 not-found-page-img">
            <img alt="" src={pagenotfound} className="not-post-image" />
          </div>
          <div className="col-12 not-post-content">
            <p>Không tìm thấy trang</p>
          </div>
          <div className="col-12 not-post-content">
            <span>
              Trở về màn hình chính <a href="/">tại đây</a>.
            </span>
          </div>
        </>
      )}
    </div>
  );
}
