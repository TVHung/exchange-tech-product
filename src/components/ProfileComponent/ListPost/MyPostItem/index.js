import React from "react";
import { formatPrice } from "../../../../utils/common";
import "./_myPostItem.scss";
import imgDefault from "../../../../assets/image/product-default.png";

export default function MyPostItem({ data, handleShow }) {
  const toDetail = () => {
    window.location.href = `/detail/${data.id}`;
  };

  const handleDelete = (e) => {
    e.preventDefault();
    handleShow(data.id);
  };

  const getBanner = (data_images) => {
    if (data_images)
      for (let i = 0; i < data_images.length; i++)
        if (data_images[i].is_banner == 1) return data_images[i].image_url;
  };

  return (
    <div>
      <div className="my-post-item py-2 px-2 pb-2">
        <div className="row" onClick={() => toDetail()}>
          <div className="col-lg-5 my-post-image">
            {" "}
            <img
              src={getBanner(data.images) || imgDefault}
              alt=""
              className="post-result-img"
            />{" "}
          </div>
          <div className="col-lg-7 my-post-content">
            <div className="d-md-flex align-items-md-center">
              <div className="name">{data.name}</div>
              <div className="ms-auto code">
                <i className="fas fa-map-marker-alt"></i>{" "}
                {data.address && data.address.split(", ")[2]}
              </div>
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
          <div className="btn btn-danger mx-2" onClick={(e) => handleDelete(e)}>
            Xóa
          </div>
          <div className="btn enquiry mx-2">Chỉnh sửa</div>
        </div>
      </div>
    </div>
  );
}
