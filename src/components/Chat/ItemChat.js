import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import avt from "../../assets/image/avt.jpg";
import "./_chat.scss";

export default function ItemChat({
  item,
  userActive,
  setIsStart,
  latestMessage,
}) {
  const onClickChat = () => {
    setIsStart(false);
  };
  useEffect(() => {
    if (userActive) setIsStart(false);
    return () => {};
  }, []);

  return (
    <div
      className={
        userActive == item.id
          ? "chat-item-container activeChat"
          : "chat-item-container"
      }
      onClick={() => onClickChat()}
    >
      <Grid container style={{ flexWrap: "nowrap" }}>
        <Grid item>
          <img
            src={item?.profile?.avatar_url}
            alt="avt"
            className="chat-account-avatar"
          />
        </Grid>
        <Grid item>
          <div className="chat-item-infor">
            <span className="chat-item-name">{item?.profile?.name}</span>
            <span className="chat-item-online"></span>
          </div>
          {/* <div>
            <span>
              {item.id != latestMessage?.user_id ? (
                <span className="chat-account-mess">
                  Bạn: {latestMessage?.message}
                </span>
              ) : (
                <span className="chat-account-mess">
                  {latestMessage?.message}
                </span>
              )}
            </span>
          </div> */}
        </Grid>
      </Grid>
      {/* {true ? <div className="chat-dot-have-mess"></div> : null} */}
    </div>
  );
}
