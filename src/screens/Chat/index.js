import React, { useState, useEffect, useRef } from "react";
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

export default function Chat() {
  const [preload, setPreload] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "Đây là tin nhắn dùng để test giao diện",
      isSend: 1,
      imageUrl:
        "https://res.cloudinary.com/trhung/image/upload/v1652088754/ai2f9w7r9ov1onsuan7b.png",
    },
    {
      id: 2,
      message: "Đây là tin nhắn",
      isSend: 0,
      imageUrl:
        "https://res.cloudinary.com/trhung/image/upload/v1652088158/vxyg53xcjjqccprgml1y.png",
    },
    { id: 3, message: "Đây là tin nhắn", isSend: 1 },
    {
      id: 4,
      message:
        "Đây là tin nhắn dùng để test giao diện khi dài quá thì sẽ xuống dòng như thế nào và đây là giao diện khi text quá dài",
      isSend: 1,
    },
    { id: 5, message: "Đây là tin nhắn", isSend: 0 },
    { id: 6, message: "Đây là tin nhắn", isSend: 1 },
    { id: 7, message: "Đây là tin nhắn", isSend: 0 },
    { id: 8, message: "Đây là tin nhắn dùng để test giao diện", isSend: 0 },
    { id: 9, message: "Đây là tin nhắn", isSend: 1 },
    {
      id: 10,
      message: "Đây là tin nhắn",
      isSend: 0,
      imageUrl:
        "https://res.cloudinary.com/trhung/image/upload/v1652085553/lgmh5kxhjcyh5alymomd.png",
    },
    {
      id: 11,
      message: "Đây là tin nhắn",
      isSend: 1,
      imageUrl:
        "https://res.cloudinary.com/trhung/image/upload/v1652085553/lgmh5kxhjcyh5alymomd.png",
    },
  ]);
  const [messData, setMessData] = useState({
    id: 1,
    message: "Đây là tin nhắn dùng để test giao diện",
    isSend: 1,
    imageUrl:
      "https://res.cloudinary.com/trhung/image/upload/v1652088754/ai2f9w7r9ov1onsuan7b.png",
  });

  const sendMessage = (messageContent = "", imageUrl = "") => {
    setMessages((oldMess) => [...oldMess, messData]);
  };

  useEffect(() => {
    setLinkDirect();
    setTimeout(() => {
      setPreload(true);
    }, 500);
    return () => {};
  }, []);

  //scroll when add chat
  const listInnerRef = useRef();

  // const onScroll = () => {
  //   if (listInnerRef.current) {
  //     const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
  //     if (scrollTop + clientHeight === scrollHeight) {
  //       console.log("reached bottom");
  //     }
  //   }
  // };

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
            <div
              className="chat-mess-content"
              // onScroll={onScroll}
              ref={listInnerRef}
            >
              {messages &&
                messages.map((mess, index) => <Message message={mess} />)}
            </div>
            <MenuInput sendMessage={sendMessage} />
          </div>
        </div>
      )}
    </div>
  );
}
