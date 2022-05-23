import React from "react";
import "./_chat.scss";

export default function Message({ message }) {
  return (
    <div className="message-content">
      <div className={message.isSend ? "mess-sender" : "mess-receiver"}>
        <div className="mess">
          <span>{message.message}</span>
          <span className="d-block mess-time">3:30</span>
        </div>
      </div>
    </div>
  );
}
