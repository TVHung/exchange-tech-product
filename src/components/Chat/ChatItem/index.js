import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import avt from "../../assets/image/avt.jpg";
import "./chatItem.scss";

export default function ChatItem({ item }) {
  const onClickChat = () => {};

  return (
    <div
      className="chat-item-container"
      style={{
        backgroundColor: item.readed ? null : "#f5f5f5",
        opacity: item.readed ? 0.8 : 1,
      }}
      onClick={() => onClickChat()}
    >
      <Grid container>
        <Grid item>
          <img src={avt} alt="avt" className="chat-account-avatar" />
        </Grid>
        <Grid item>
          <div className="chat-item-infor">
            <span className="chat-item-name">Trương Hùng</span>
            <span className="chat-item-online"> - online 5 ngày trước</span>
          </div>
          <div style={{ fontWeight: item.readed ? "none" : "bold" }}>
            <span>
              <span className="chat-account-mess">Sản phẩm này còn không?</span>
            </span>
          </div>
        </Grid>
      </Grid>
      {!item.readed ? <div className="chat-dot-have-mess"></div> : null}
    </div>
  );
}
