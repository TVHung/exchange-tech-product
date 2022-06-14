import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import avt from "../../assets/image/avt.jpg";
import "./_chat.scss";

export default function ItemChat({ item, userActive, setIsStart }) {
  const onClickChat = () => {
    setIsStart(false);
  };
  console.log(userActive == item.id);
  return (
    <div
      className={
        userActive == item.id
          ? "chat-item-container activeChat"
          : "chat-item-container"
      }
      style={{
        opacity: item.readed ? 0.8 : 1,
      }}
      onClick={() => onClickChat()}
    >
      <Grid container style={{ flexWrap: "nowrap" }}>
        <Grid item>
          <img src={avt} alt="avt" className="chat-account-avatar" />
        </Grid>
        <Grid item>
          <div className="chat-item-infor">
            <span className="chat-item-name">Trương Hùng</span>
            <span className="chat-item-online">online 5 ngày trước</span>
          </div>
          <div style={{ fontWeight: item.readed ? "none" : "bold" }}>
            <span>
              <span className="chat-account-mess">
                Sản phẩm này còn không tôi muốn mua nó, bạn bán cho tôi nhé?
              </span>
            </span>
          </div>
        </Grid>
      </Grid>
      {!item.readed ? <div className="chat-dot-have-mess"></div> : null}
    </div>
  );
}
