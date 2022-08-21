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
  apiSendMessage,
  headerFiles,
  headers,
} from "../../constants";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations } from "../../redux/actions/chatAction";

export default function Chat() {
  const [preload, setPreload] = useState(false);
  const [loadChat, setLoadChat] = useState(false);
  const [isStart, setIsStart] = useState(true);
  const [userActive, setUserActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

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
      await axios
        .post(apiSendMessage, messFormData, {
          headers: headerFiles,
        })
        .then((res) => {
          addMessage(res.data);
          dispatch(fetchConversations());
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
    return () => {
      setPreload();
      setMessages([]);
      setIsStart();
      setUserActive();
      setUsers();
      setPage();
    };
  }, []);

  useEffect(() => {
    if (params.id) {
      setUserActive(params.id);
      getAllMess(params.id);
    }
    return () => {};
  }, [params.id]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchConversations());
    return () => {};
  }, []);
  const userConversations = useSelector((state) => state.chat.myListChat);
  useEffect(() => {
    setUsers(userConversations);
    setPreload(true);
  }, [userConversations]);

  useEffect(() => {
    Pusher.logToConsole = false;

    const pusher = new Pusher("1bf1895dca0e9f4afb6a", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      dispatch(fetchConversations());
      console.log("nhan", data?.message);
      if (
        parseInt(data?.message.user_id) == parseInt(params.id) &&
        parseInt(data?.message.target_user_id) ==
          parseInt(JSON.parse(localStorage.getItem("user"))?.id)
      ) {
        addMessage(data?.message);
      }
    });
  }, []);

  const addMessage = (data) => {
    let newMess = {
      image_url: data?.image_url,
      message: data?.message,
      target_user_id: data?.target_user_id,
      user_id: data?.user_id,
      created_at: data?.created_at,
      id: null,
      updated_at: data?.updated_at,
    };
    setTimeout(() => {
      setMessages((messages) => [...messages, newMess]);
      onScroll();
    }, 100);
  };

  const getAllMess = async (target_user_id, page = 1) => {
    const target = {
      target_user_id: target_user_id,
    };
    setLoadChat(true);

    await axios
      .post(`${apiGetMessage}/?page=${page}`, target, {
        headers: headers,
      })
      .then((res) => {
        var allMess = res.data.data;
        setMessages(allMess);
        setLoadChat(false);
        setTimeout(() => {
          onScroll();
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        setLoadChat(false);
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
            {users?.length > 0 ? (
              <>
                {users?.map((item) => (
                  <div key={item?.user?.id}>
                    <a
                      href={`/chat/${item?.user?.id}`}
                      style={{ textDecoration: "none", color: "#000" }}
                    >
                      <ItemChat
                        item={item}
                        userActive={userActive}
                        setIsStart={setIsStart}
                      />
                    </a>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center mt-5">
                <p>Bạn chưa có tin nhắn nào</p>
              </div>
            )}
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
                  {!loadChat ? (
                    messages?.map((mess, index) => (
                      <Message
                        userActive={userActive}
                        key={index}
                        message={mess}
                      />
                    ))
                  ) : (
                    <div className="new-chat w-100 h-100 d-flex justify-content-center align-items-center">
                      <p>
                        <b>Đang tải cuộc trò chuyện...</b>
                      </p>
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
