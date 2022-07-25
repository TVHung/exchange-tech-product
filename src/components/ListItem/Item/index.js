import React, { useState, useEffect } from "react";
import "./item.scss";
import { Button } from "@material-ui/core";
import { formatPrice, handleCalculateTime } from "./../../../utils/common";
import imgDefault from "../../../assets/image/product-default.png";
import { useDispatch, useSelector } from "react-redux";
import { addWishList } from "../../../redux/actions/postActions";

export default function Item({ data, status }) {
  const [favorite, setfavorite] = useState(false);

  const toggleFavorite = () => {
    if (favorite) {
      // removeWishList();
    } else {
      addNewWishList();
    }
    setfavorite(true);
  };

  const dispatch = useDispatch();
  const addNewWishList = () => {
    dispatch(addWishList(data?.id));
  };
  // const removeWishList = () => {
  //   dispatch(deleteWishList(data?.id));
  // };

  useEffect(() => {
    setfavorite(status);
    return () => {
      setfavorite(false);
    };
  }, []);

  const toDetail = () => {
    if (data?.image_url) window.location.href = `/detail/${data?.product_id}`;
    else window.location.href = `/detail/${data?.id}`;
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
          src={getBanner(data?.images) || imgDefault}
          alt="productImg"
          className="itemImg"
        />
      </div>
      <div>
        <div className="itemContent">
          <h5>{data?.name}</h5>
          {data?.price != 0 ? (
            <p className="item-value">Giá: {formatPrice(data?.price)}đ</p>
          ) : (
            <p className="item-value">Giá: Miễn phí</p>
          )}
          <span>{data?.category}</span>
          <div className="item-create-location">
            <span className="item-createAt">
              {handleCalculateTime(data?.created_at || null)}
            </span>
            <span className="item-location">
              {data?.address && data?.address.split(", ")[2]}
            </span>
          </div>
        </div>
        <div className="itemDrop" onClick={() => toDetail()}>
          <i
            className="fas fa-heart favorite-heart"
            onClick={() => toggleFavorite()}
            style={{ color: !favorite ? "black" : "red" }}
          ></i>
          <div className="itemDrop-container">
            <div className="itemDrop-content">
              <span>{data?.category}</span>
              <p>{data?.description}</p>
            </div>
            {/* <div className="itemDrop-btn"> */}
            {/* <Button className="item-btn-care" onClick={() => toDetail()}>
                Chi tiết
              </Button> */}
            {/* <Button className="item-btn-chat">Nhắn tin</Button> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
