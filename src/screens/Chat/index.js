import React, { useState, useEffect } from "react";
import "./chat.scss";
import { Grid } from "@material-ui/core";
import MetaTag from "../../components/MetaTag";
import Preloading from "../../components/Loading";
import ChatItem from "../../components/ChatItem";
import avt from "../../assets/image/avt.jpg";
import Search from "../../components/Navigation/Search";

const data = [
  { id: 1, readed: false },
  { id: 2, readed: true },
  { id: 3, readed: true },
  { id: 4, readed: true },
];

export default function Chat() {
  const [preload, setPreload] = useState(false);
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setPreload(true);
    }, 500);
    return () => {};
  }, []);

  return (
    <div className="chat-container container">
      <MetaTag title={"Tin nhắn"} description={"Kết nối với người mua, bán"} />
      {!preload ? (
        <Preloading />
      ) : (
        <Grid container className="chatContainer">
          <Grid item className="chat-left" xs={4}>
            {data.map((item) => (
              <Grid key={item.id} item xs={12}>
                <ChatItem item={item} />
              </Grid>
            ))}
          </Grid>
          <Grid item className="chat-right" sm={12} md={8}>
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
            <div className="chat-mess-content"></div>
            <div className="chat-mess-input">
              <div className="chat-mess-suggest"></div>
              <div className="chat-mess-input-content">
                <div className="icon-send-media">
                  <i class="fas fa-images icon-btn-chat"></i>
                  <i class="fas fa-camera icon-btn-chat"></i>
                </div>
                <div className="input-mess">
                  <input
                    type="text"
                    id="chat"
                    className="chat-input"
                    placeholder="Nhập tin nhắn ..."
                    name="chat"
                    value={inputVal}
                    onChange={(e) => {
                      const val = e.target.value;
                      setInputVal(val);
                    }}
                  />
                </div>
                <div className="input-send">
                  <i class="fas fa-paper-plane send-icon"></i>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
