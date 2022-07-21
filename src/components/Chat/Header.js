import React, { useState, useEffect } from "react";
import "./_chat.scss";
import { Grid } from "@material-ui/core";
import avt from "../../assets/image/avt-common.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiGetUser, headers } from "../../constants";

export default function Header({ userActive, users }) {
  const [userChat, setUserChat] = useState({});
  const params = useParams();

  const getUserChat = async (user_id) => {
    try {
      await axios
        .get(`${apiGetUser}/${user_id}`, {
          headers: headers,
        })
        .then((res) => {
          setUserChat(res?.data?.data);
        });
    } catch (error) {
      return { statusCode: 500, body: error.toString() };
    }
  };

  useEffect(() => {
    getUserChat(params.id);
  }, [params.id]);

  return (
    <div className="chat-mess-header">
      <Grid container>
        <Grid item xs={6}>
          <div className="chat-avatar">
            <img
              src={userChat?.profile?.avatar_url || avt}
              alt="avt"
              className="chat-header-avatar"
            />
          </div>
          <div className="chat-header-infor">
            <span className="chat-header-name">
              {userChat?.profile?.name || "Người dùng"}
            </span>
            {/* <p className="chat-header-online">3 giờ trước</p> */}
          </div>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </div>
  );
}
