import React from "react";
import { formatPrice, handleCalculateTime } from "../../../utils/common";
import "./_itemSearch.scss";
import notImage from "../../../assets/image/product-default.png";

export default function ItemSearch({ data }) {
  const toDetail = () => {
    window.location.href = `/detail/${data.id}`;
  };

  const getBanner = (data_images) => {
    if (data_images)
      for (let i = 0; i < data_images.length; i++)
        if (data_images[i].is_banner == 1) return data_images[i].image_url;
  };

  return (
    <div onClick={() => toDetail()}>
      <div className="post-result py-2 px-2 pb-2">
        <div className="row">
          <div className="col-lg-3">
            {" "}
            <img
              src={getBanner(data?.images) ? getBanner(data?.images) : notImage}
              alt=""
              className="post-result-img"
            />{" "}
          </div>
          <div className="col-lg-9">
            <div className="d-md-flex align-items-md-center">
              <div className="name">{data.name}</div>
              <div className="ms-auto code">
                <i className="fas fa-map-marker-alt"></i>{" "}
                {data.address && data.address.split(", ")[2]}
              </div>
            </div>
            <div className="rating">
              Bài đăng cách đây {handleCalculateTime(data?.created_at)}
            </div>
            <div className="d-flex flex-column tags pt-1">
              <div className="search-item-price">
                <i className="fas fa-dollar-sign"></i> {formatPrice(data.price)}
                đ
              </div>
              <div>
                <i className="fas fa-info-circle"></i> {data.description}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-1">
          <div className="btn enquiry  mx-2">Liện hệ</div>
          <div className="btn btn-primary ">Chi tiết</div>
        </div>
      </div>
    </div>
  );
}
