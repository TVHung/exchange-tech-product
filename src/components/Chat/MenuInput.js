import React, { useState } from "react";
import "./_chat.scss";

const messSuggest = [
  "Sản phẩm này còn không?",
  "Sản phẩm còn bảo hành không?",
  "Sản phẩm có lỗi không?",
  "Sản phẩm này còn không?",
  "Sản phẩm còn bảo hành không?",
  "Sản phẩm có lỗi không?",
];

export default function MenuInput() {
  const [inputVal, setInputVal] = useState("");

  return (
    <div className="chat-mess-input">
      <div className="chat-mess-suggest">
        {messSuggest.map((item, index) => (
          <div key={index} className="d-inline-block mess-suggest">
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div className="chat-mess-input-content">
        <div className="icon-send-media">
          <i class="fas fa-2x fa-images icon-btn-chat"></i>
        </div>
        <div className="input-mess">
          <input
            type="text"
            id="chat"
            className="chat-input"
            placeholder="Nhập tin nhắn ..."
            name="chat"
            value={inputVal}
            onChange={(e) => {
              const val = e.target.value;
              setInputVal(val);
            }}
          />
        </div>
        <div className="input-send">
          <i class="fas fa-paper-plane fa-2x send-icon"></i>
        </div>
      </div>
    </div>
  );
}
