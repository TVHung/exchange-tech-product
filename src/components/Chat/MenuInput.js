import React, { useState } from "react";
import { maxNumImage, maxNumImageChat, maxSizeImage } from "../../constants";
import "./_chat.scss";

const messSuggest = [
  "Sản phẩm này còn không?",
  "Sản phẩm còn bảo hành không?",
  "Sản phẩm có lỗi không?",
  "Sản phẩm này còn không?",
  "Sản phẩm còn bảo hành không?",
  "Sản phẩm có lỗi không?",
];

export default function MenuInput({ sendMessage }) {
  const [inputVal, setInputVal] = useState("");
  const submitSendMessage = () => {
    sendMessage(inputVal);
  };

  const [file, setFile] = useState([]);
  const [fileObject, setFileOject] = useState([]);
  const uploadSingleFile = (e) => {
    let fileImage = e.target.files[0];
    let mess = "";
    if (file && file.length < maxNumImageChat && fileImage) {
      if (fileImage.size <= maxSizeImage) {
        setFile([...file, URL.createObjectURL(fileImage)]);
        setFileOject([...fileObject, fileImage]);
      } else {
        mess = "Bạn chỉ được đăng ảnh kích thước tối đa 2mb";
        alert(mess);
      }
    } else {
      mess = `Bạn chỉ được đăng tối đa ${maxNumImage} ảnh`;
      alert(mess);
    }
  };

  const deleteFile = (e) => {
    const s = file.filter((item, index) => index !== e);
    const o = fileObject.filter((item, index) => index !== e);
    setFile(s);
    setFileOject(o);
  };

  return (
    <div className="chat-mess-input">
      <div className="preview-image-send row">
        {file &&
          file.map((item, index) => {
            return (
              <div
                key={index}
                className="col-lg-6 col-md-4 col-sm-6 image-preview mb-2 "
              >
                <div className="image-selected">
                  <img src={item} alt="" width="100%" />
                  <i
                    className="fas fa-times-circle fa delete-image"
                    onClick={() => deleteFile(index)}
                  ></i>
                </div>
              </div>
            );
          })}
      </div>
      <div className="chat-mess-suggest">
        {messSuggest.map((item, index) => (
          <div key={index} className="d-inline-block mess-suggest">
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div className="chat-mess-input-content">
        <label htmlFor="file-upload-chat" className="icon-send-media">
          <i
            className="fas fa-2x fa-images icon-btn-chat"
            htmlFor="file-upload-chat"
          ></i>
        </label>
        <input
          type="file"
          className="custom-file-input"
          id="file-upload-chat"
          // multiple
          hidden
          accept="image/*"
          onChange={(e) => uploadSingleFile(e)}
        />
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
          <i
            class="fas fa-paper-plane fa-2x send-icon"
            onClick={() => submitSendMessage()}
          ></i>
        </div>
      </div>
    </div>
  );
}
