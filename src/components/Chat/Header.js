import React, { useState, useEffect } from "react";
import "./_chat.scss";
import { Grid } from "@material-ui/core";
import avt from "../../assets/image/avt.jpg";

export default function Header({ userActive, users }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == userActive) {
        setUser(users[i]);
        console.log(users[i]);
        break;
      }
    }
    return () => {
      setUser({});
    };
  }, [userActive]);

  return (
    <div className="chat-mess-header">
      <Grid container>
        <Grid item xs={6}>
          <div className="chat-avatar">
            <img
              src={user?.profile?.avatar_url}
              alt="avt"
              className="chat-header-avatar"
            />
          </div>
          <div className="chat-header-infor">
            <span className="chat-header-name">{user?.profile?.name}</span>
            {/* <p className="chat-header-online">3 giờ trước</p> */}
          </div>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </div>
  );
}
