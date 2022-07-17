import React, { useState, useEffect, useRef } from "react";
import "./chat.scss";
import MetaTag from "../../components/MetaTag";
import Preloading from "../../components/Loading";
import Breadcrumb from "./../../components/Breadcrumb";
import { chatBreadcrumb } from "../../constants/breadcrumData";
import {
  appendArrayToFormData,
  scrollInViewDiv,
  setLinkDirect,
} from "../../utils/common";
import ItemChat from "../../components/Chat/ItemChat";
import MenuInput from "../../components/Chat/MenuInput";
import Header from "../../components/Chat/Header";
import Message from "../../components/Chat/Message";
import StartPage from "../../components/StartPage";
import { Link, useParams } from "react-router-dom";
import Pusher from "pusher-js";
import axios from "axios";
import {
  apiGetMessage,
  apiGetMyConversation,
  apiSendMessage,
  headerFiles,
  headers,
} from "../../constants";

export default function Chat() {
  const [preload, setPreload] = useState(false);
  const [isStart, setIsStart] = useState(true);
  const [userActive, setUserActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [latestMessage, setLatestMessage] = useState({});

  const params = useParams();
  //scroll when add chat
  const listInnerRef = useRef();
  const onScroll = () => {
    scrollInViewDiv(listInnerRef, "bottom");
  };
  const sendMessage = async (messageContent = "", imageFile = null) => {
    if (messageContent != "") {
      const mess = {
        message: messageContent,
        target_user_id: params.id,
        image: imageFile,
      };
      const messFormData = appendArrayToFormData(mess);
      console.log("form", imageFile);
      await axios
        .post(apiSendMessage, messFormData, {
          headers: headerFiles,
        })
        .then((res) => {
          // alert("Thành công");
          console.log(res);
          setLatestMessage(res.data);
        })
        .catch((error) => {
          console.error(error);
          alert("Gửi tin nhắn thất bại");
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
    getAllConversation();
    return () => {
      setPreload();
      setMessages([]);
      setIsStart();
      setUserActive();
      setUsers();
      setLatestMessage();
    };
  }, []);

  useEffect(() => {
    if (params.id) {
      setUserActive(params.id);
      getAllMess(params.id);
    }
    return () => {};
  }, [params.id]);

  useEffect(() => {
    Pusher.logToConsole = false;

    const pusher = new Pusher("1bf1895dca0e9f4afb6a", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      console.log(data);
      let newMess = {
        image_url: data?.image_url,
        message: data?.message,
        target_user_id: data?.target_user_id,
        user_id: data?.user_id,
        created_at: "2022-07-16T09:12:15.000000Z",
        id: 33,
        updated_at: "2022-07-16T09:12:15.000000Z",
      };
      // getAllMess(params.id);
      setMessages((messages) => [...messages, newMess]);
      setTimeout(() => {
        onScroll();
      }, 100);
    });
  }, []);

  const getAllMess = async (target_user_id) => {
    const target = {
      target_user_id: target_user_id,
    };
    await axios
      .post(apiGetMessage, target, {
        headers: headers,
      })
      .then((res) => {
        setMessages(res.data.data);
        console.log("Get all message", res.data.data);
        setTimeout(() => {
          onScroll();
        }, 100);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getAllConversation = async () => {
    setPreload(false);
    await axios
      .get(apiGetMyConversation, {
        headers: headers,
      })
      .then((res) => {
        setUsers(res.data.data);
        setPreload(true);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.error(error);
        setPreload(true);
      });
  };

  return (
    <div className="chat-container container">
      <Breadcrumb arrLink={chatBreadcrumb} />
      <MetaTag title={"Tin nhắn"} description={"Kết nối với người mua, bán"} />
      {!preload ? (
        <Preloading />
      ) : (
        <div className="row chatContainer">
          <div className="chat-left col-md-4">
            {users?.map((item) => (
              <div key={item.id}>
                <Link
                  to={`/chat/${item.id}`}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <ItemChat
                    item={item}
                    userActive={userActive}
                    setIsStart={setIsStart}
                    latestMessage={latestMessage}
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
                <Header userActive={userActive} users={users} />
                <div className="chat-mess-content" ref={listInnerRef}>
                  {console.log("Danh sach message", messages)}
                  {messages?.length > 0 ? (
                    messages.map((mess, index) => (
                      <Message
                        userActive={userActive}
                        key={index}
                        message={mess}
                      />
                    ))
                  ) : (
                    <div className="new-chat w-100 h-100 d-flex justify-content-center align-items-center">
                      {/* <p>Hãy gửi tin nhắn để bắt đầu cuộc trò chuyện</p> */}
                    </div>
                  )}
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
