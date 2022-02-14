import React, { useState, useEffect } from "react";
import "./item.scss";
import { formatPrice, handleCalculateTime } from "./../../../utils/common";

export default function Item({ data }) {
  const [favorite, setfavorite] = useState(data.favorite);
  const toggleFavorite = () => {
    setfavorite(!favorite);
  };

  useEffect(() => {
    return () => {};
  }, []);

  const toDetail = () => {
    window.location.href = `/detail/${data.id}`;
  };

  const getBanner = (data_images) => {
    if (data_images)
      for (let i = 0; i < data_images.length; i++)
        if (data_images[i].is_banner == 1) return data_images[i].image_url;
  };

  return (
    <div className="itemContainer">
      <div className="itemHeader">
        <img
          src={getBanner(data.images)}
          alt="productImg"
          className="itemImg"
        />
        <i
          className="fas fa-heart favorite-heart"
          onClick={() => toggleFavorite()}
          style={{ color: favorite ? "grey" : "red" }}
        ></i>
      </div>
      <div>
        <div className="itemContent" onClick={() => toDetail()}>
          <h4>{data.name}</h4>
          <p className="item-value">Giá: {formatPrice(data.price)}đ</p>
          <div className="item-create-location">
            <span className="item-createAt">
              {handleCalculateTime(data.created_at || null)}
            </span>
            <span className="item-location">
              {data.address.city ? data.address.city : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
