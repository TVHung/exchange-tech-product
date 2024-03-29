import React from "react";
import { formatPrice } from "../../../../utils/common";
import "./_userPostItem.scss";
import imgDefault from "../../../../assets/image/product-default.png";

export default function UserPostItem({ data, handleShow }) {
  const toDetail = () => {
    window.location.href = `/detail/${data.id}`;
  };

  const handleDelete = (e) => {
    e.preventDefault();
    handleShow(data.id);
  };
  const handleEdit = (e) => {
    window.location.href = `edit-post/${data.id}`;
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
                <i className="fas fa-info-circle"></i>{" "}
                <span className="description-my-item">{data.description}</span>
              </div>
              <div>
                <i className="fas fa-bullseye"></i> Nhu cầu:{" "}
                {data?.is_trade == 1 ? <b>Mua</b> : <b>Bán</b>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
