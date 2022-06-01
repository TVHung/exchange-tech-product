import React from "react";
import "./_chat.scss";

export default function Message({ message }) {
  return (
    <div className="message-content">
      <div className={message.isSend ? "mess-sender" : "mess-receiver"}>
        <div className="mess">
          <span className="d-block">{message.message}</span>
          {message?.imageUrl && (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src={message?.imageUrl}
              alt="image-chat"
              className="mess-img d-block"
            />
          )}
          <span className="d-block mess-time">3:30</span>
        </div>
      </div>
    </div>
  );
}
