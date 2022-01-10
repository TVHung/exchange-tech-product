import React from "react";
import "./historyItem.scss";
import avt from "../../../../assets/image/avt.jpg";
import { Grid, Button } from "@material-ui/core";

export default function PostItem({ item }) {
  return (
    <div className="user-post-container">
      <Grid container className="user-post-content">
        <Grid item xs={3} className="user-post-left">
          <img src={avt} alt="avt" className="user-post-image" />
        </Grid>
        <Grid item xs={9} className="user-post-right">
          <h4 className="post-name">Điện thoại Iphone 13 promax</h4>
          <p className="post-value">Giá: 8.990.000đ</p>
          <div className="post-create-location">
            <span className="post-createAt">1 ngày trước</span>
            <span className="post-location">Bắc Ninh</span>
          </div>
          <div className="post-connect">
            <Button className="post-btn-connect">Nhắn tin cho người bán</Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
