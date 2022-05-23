import React from "react";
import "./_chat.scss";
import { Grid } from "@material-ui/core";
import avt from "../../assets/image/avt.jpg";

export default function Header() {
  return (
    <div className="chat-mess-header">
      <Grid container>
        <Grid item xs={6}>
          <div className="chat-avatar">
            <img src={avt} alt="avt" className="chat-header-avatar" />
          </div>
          <div className="chat-header-infor">
            <span className="chat-header-name">Trương Hùng</span>
            <p className="chat-header-online">3 giờ trước</p>
          </div>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </div>
  );
}
