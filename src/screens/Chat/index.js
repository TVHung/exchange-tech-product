import React, { useState, useEffect } from "react";
import "./chat.scss";
import { Grid } from "@material-ui/core";
import MetaTag from "../../components/MetaTag";
import Preloading from "../../components/Loading";
import Breadcrumb from "./../../components/Breadcrumb";
import { chatBreadcrumb } from "../../constants/breadcrumData";
import { setLinkDirect } from "../../utils/common";
import ItemChat from "../../components/Chat/ItemChat";
import MenuInput from "../../components/Chat/MenuInput";
import Header from "../../components/Chat/Header";
import Message from "../../components/Chat/Message";

const data = [
  { id: 1, readed: false },
  { id: 2, readed: true },
  { id: 3, readed: true },
  { id: 4, readed: true },
  { id: 5, readed: true },
  { id: 6, readed: true },
  { id: 7, readed: true },
  { id: 8, readed: true },
  { id: 9, readed: true },
  { id: 10, readed: true },
  { id: 11, readed: true },
];

const messages = [
  { id: 1, message: "Đây là tin nhắn dùng để test giao diện", isSend: 1 },
  { id: 2, message: "Đây là tin nhắn", isSend: 0 },
  { id: 3, message: "Đây là tin nhắn", isSend: 1 },
  { id: 4, message: "Đây là tin nhắn dùng để test giao diện", isSend: 1 },
  { id: 5, message: "Đây là tin nhắn", isSend: 0 },
  { id: 6, message: "Đây là tin nhắn", isSend: 1 },
  { id: 7, message: "Đây là tin nhắn", isSend: 0 },
  { id: 8, message: "Đây là tin nhắn dùng để test giao diện", isSend: 0 },
  { id: 9, message: "Đây là tin nhắn", isSend: 1 },
  { id: 10, message: "Đây là tin nhắn", isSend: 0 },
  { id: 11, message: "Đây là tin nhắn", isSend: 1 },
];

export default function Chat() {
  const [preload, setPreload] = useState(false);

  useEffect(() => {
    setLinkDirect();
    setTimeout(() => {
      setPreload(true);
    }, 500);
    return () => {};
  }, []);

  return (
    <div className="chat-container container">
      <Breadcrumb arrLink={chatBreadcrumb} />
      <MetaTag title={"Tin nhắn"} description={"Kết nối với người mua, bán"} />
      {!preload ? (
        <Preloading />
      ) : (
        <div className="row chatContainer">
          <div className="chat-left col-md-4">
            {data.map((item) => (
              <div key={item.id}>
                <ItemChat item={item} />
              </div>
            ))}
          </div>
          <div className="chat-right col-md-8 col-sm-12">
            <Header />
            <div className="chat-mess-content">
              {messages &&
                messages.map((mess, index) => <Message message={mess} />)}
            </div>
            <MenuInput />
          </div>
        </div>
      )}
    </div>
  );
}
