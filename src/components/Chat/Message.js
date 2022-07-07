import React from "react";
import { timeConverter } from "../../utils/common";
import "./_chat.scss";

export default function Message({ userActive, message }) {
  return (
    <div className="message-content">
      <div
        className={
          Number(message?.user_id) !== Number(userActive)
            ? "mess-sender"
            : "mess-receiver"
        }
      >
        <div className="mess">
          <span className="d-block">{message?.message}</span>
          {message?.image_url && (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src={message?.image_url}
              alt="image-chat"
              className="mess-img d-block"
            />
          )}
          <span className="d-block mess-time">
            {timeConverter(message.created_at)}
          </span>
        </div>
      </div>
    </div>
  );
}
