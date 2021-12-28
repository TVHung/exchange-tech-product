import React from "react";
import "./favoriteItem.scss";
import avt from "../../../../assets/image/avt.jpg";
import { Grid, Button } from "@material-ui/core";

export default function FavoriteItem({ item }) {
  return (
    <div className="favorite-item-container">
      <Grid container className="favorite-item-content">
        <i className="fas fa-heart favorite-heart" style={{ color: "red" }}></i>
        <Grid item xs={4} className="favorite-item-left">
          <img src={avt} alt="avt" className="favorite-post-image" />
        </Grid>
        <Grid item xs={8} className="favorite-item-right">
          <h4 className="item-name">Điện thoại Iphone 13 promax</h4>
          <p className="item-value">Giá: 8.990.000đ</p>
          <div className="item-create-location">
            <span className="item-createAt">1 ngày trước</span>
            <span className="item-location">Bắc Ninh</span>
          </div>
          <div className="item-connect">
            <div className="group-btn">
              <Button className="item-btn-connect">Chat</Button>
              <Button className="item-btn-connect">Gọi điện</Button>
              <Button className="item-btn-connect">Nhắn tin</Button>
              <Button className="item-btn-connect">Đặt lịch</Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
