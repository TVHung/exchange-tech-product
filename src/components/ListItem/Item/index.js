import React, { useState, useEffect } from "react";
import "./item.scss";
import imgTest from "../../../assets/image/imgtest.png";
import { Button } from "@material-ui/core";

export default function Item({ data }) {
  const [favorite, setfavorite] = useState(data.favorite);

  const handleCalculateTime = (time) => {
    if (time) {
      let createAt = new Date(2021, 10, 31, 20, 0, 0).getTime();
      let current = new Date(2021, 10, 31, 23, 0, 0).getTime();
      let distance = current - createAt;
      if (distance <= 0) return "";
      else {
        let years = Math.floor(distance / (365 * 24 * 3600 * 1000));
        let months = Math.floor(distance / (30 * 24 * 3600 * 1000));
        let days = Math.floor(distance / (24 * 3600 * 1000));
        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (years > 0) return `${years} năm trước`;
        else if (months > 0 && months < 12) return `${months} tháng trước`;
        else if (days > 7 && days < 31)
          return `${Math.floor(days / 7)} tuần trước`;
        else if (days > 0 && days < 7) return `${days} ngày trước`;
        else if (hours > 0 && hours < 24) return `${hours} giờ trước`;
        else if (minutes > 0 && minutes < 60) return `${minutes} phút trước`;
        else if (seconds > 0 && seconds < 60) return "Vừa xong";
        else return "";
      }
    }
    return "";
  };

  const toggleFavorite = () => {
    setfavorite(!favorite);
  };

  useEffect(() => {
    return () => {};
  }, [favorite]);

  return (
    <div className="itemContainer">
      <div className="itemHeader">
        <img src={data.image} alt="productImg" className="itemImg" />
        <i
          className="fas fa-heart favorite-heart"
          onClick={() => toggleFavorite()}
          style={{ color: favorite ? "grey" : "red" }}
        ></i>
      </div>
      <div className="itemContent">
        <h4>{data.nameProduct}</h4>
        <p className="item-value">Giá: 8.990.000đ</p>
        <div className="item-create-location">
          <span className="item-createAt">
            {handleCalculateTime(data.createAt || null)}
          </span>
          <span className="item-location">{data.location}</span>
        </div>
      </div>
      <div className="itemDrop">
        <div className="itemDrop-content">
          <p>{data.infor}</p>
        </div>
        <div className="itemDrop-btn">
          <Button className="item-btn-care">Quan tâm</Button>
          <Button className="item-btn-chat">Nhắn tin</Button>
        </div>
      </div>
    </div>
  );
}
