import React, { useState, useEffect, useRef } from "react";
import "./chat.scss";
import MetaTag from "../../components/MetaTag";
import Preloading from "../../components/Loading";
import Breadcrumb from "./../../components/Breadcrumb";
import { chatBreadcrumb } from "../../constants/breadcrumData";
import { scrollInViewDiv, setLinkDirect } from "../../utils/common";
import ItemChat from "../../components/Chat/ItemChat";
import MenuInput from "../../components/Chat/MenuInput";
import Header from "../../components/Chat/Header";
import Message from "../../components/Chat/Message";
import StartPage from "../../components/StartPage";
import { Link, useParams } from "react-router-dom";
import Pusher from "pusher-js";
import axios from "axios";
import { apiSendMessage, headers } from "../../constants";

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
  const [isStart, setIsStart] = useState(true);
  const [userActive, setUserActive] = useState(null);
  // const [messages, setMessages] = useState([
  //   {
  //     id: 1,
  //     message: "Đây là tin nhắn dùng để test giao diện",
  //     isSend: 1,
  //     imageUrl:
  //       "https://res.cloudinary.com/trhung/image/upload/v1652088754/ai2f9w7r9ov1onsuan7b.png",
  //   },
  //   {
  //     id: 2,
  //     message: "Đây là tin nhắn",
  //     isSend: 0,
  //     imageUrl:
  //       "https://res.cloudinary.com/trhung/image/upload/v1652088158/vxyg53xcjjqccprgml1y.png",
  //   },
  //   { id: 3, message: "Đây là tin nhắn", isSend: 1 },
  //   {
  //     id: 4,
  //     message:
  //       "Đây là tin nhắn dùng để test giao diện khi dài quá thì sẽ xuống dòng như thế nào và đây là giao diện khi text quá dài",
  //     isSend: 1,
  //   },
  //   { id: 5, message: "Đây là tin nhắn", isSend: 0 },
  //   { id: 6, message: "Đây là tin nhắn", isSend: 1 },
  //   { id: 7, message: "Đây là tin nhắn", isSend: 0 },
  //   { id: 8, message: "Đây là tin nhắn dùng để test giao diện", isSend: 0 },
  //   { id: 9, message: "Đây là tin nhắn", isSend: 1 },
  //   {
  //     id: 10,
  //     message: "Đây là tin nhắn",
  //     isSend: 0,
  //     imageUrl:
  //       "https://res.cloudinary.com/trhung/image/upload/v1652085553/lgmh5kxhjcyh5alymomd.png",
  //   },
  //   {
  //     id: 11,
  //     message: "Đây là tin nhắn",
  //     isSend: 1,
  //     imageUrl:
  //       "https://res.cloudinary.com/trhung/image/upload/v1652085553/lgmh5kxhjcyh5alymomd.png",
  //   },
  // ]);
  const [messages, setMessages] = useState([]);

  let AllMessages = [];

  const params = useParams();
  //scroll when add chat
  const listInnerRef = useRef();
  const onScroll = () => {
    scrollInViewDiv(listInnerRef, "bottom");
  };
  const sendMessage = async (messageContent = "", imageUrl = "") => {
    if (messageContent != "") {
      const mess = {
        message: messageContent,
      };
      await axios
        .post(apiSendMessage, mess, {
          headers: headers,
        })
        .then((res) => {
          console.log("Thanh cong");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Bạn chưa nhập nội dung tin nhắn");
    }
    setTimeout(() => {
      onScroll();
    }, 100);
  };

  useEffect(() => {
    setLinkDirect();
    setTimeout(() => {
      setPreload(true);
      onScroll();
    }, 500);
    return () => {
      setPreload();
      setMessages([]);
    };
  }, []);

  useEffect(() => {
    setUserActive(params.id);
    return () => {};
  }, [params.id]);

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher("1bf1895dca0e9f4afb6a", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      AllMessages.push(data);
      setMessages(AllMessages);
      console.log("all message", data);
    });
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
                <Link
                  to={`/chat/${item.id}`}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <ItemChat
                    item={item}
                    userActive={userActive}
                    setIsStart={setIsStart}
                  />
                </Link>
              </div>
            ))}
          </div>
          <div className="chat-right col-md-8 col-sm-12">
            {isStart ? (
              <div ref={listInnerRef}>
                <StartPage />
              </div>
            ) : (
              <>
                <Header />
                <div className="chat-mess-content" ref={listInnerRef}>
                  {messages &&
                    messages.map((mess, index) => (
                      <Message key={index} message={mess} />
                    ))}
                </div>
                <MenuInput sendMessage={sendMessage} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
