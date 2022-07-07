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
    sendMessage(inputVal, fileUpload);
    setInputVal("");
    deleteFile();
  };

  const [file, setFile] = useState();
  const [fileUpload, setFileUpload] = useState(); //dung de upload len server
  const uploadSingleFile = (e) => {
    let fileImage = e.target.files[0];
    let mess = "";
    if (fileImage) {
      if (fileImage.size <= maxSizeImage) {
        setFile(URL.createObjectURL(fileImage));
        setFileUpload(fileImage);
      } else {
        mess = "Bạn chỉ được đăng ảnh kích thước tối đa 2mb";
        alert(mess);
      }
    } else {
      mess = `Có lỗi xảy ra, hãy thử lại`;
      alert(mess);
    }
  };

  const deleteFile = (e) => {
    setFile(null);
    setFileUpload(null);
    document.getElementById("file-upload-chat").value = "";
  };

  return (
    <div className="chat-mess-input">
      <div className="preview-image-send row">
        {file && (
          <div className="col-4 image-preview mb-2 ">
            <div className="image-selected">
              <img src={file} alt="" width="100%" />
              <i
                className="fas fa-times-circle fa delete-image"
                onClick={() => deleteFile()}
              ></i>
            </div>
          </div>
        )}
      </div>
      <div className="chat-mess-suggest">
        {messSuggest.map((item, index) => (
          <div
            key={index}
            className="d-inline-block mess-suggest"
            onClick={() => setInputVal(item)}
          >
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
              setInputVal(e.target.value);
            }}
          />
        </div>
        <div className="input-send">
          <i
            className="fas fa-paper-plane fa-2x send-icon"
            onClick={() => submitSendMessage()}
          ></i>
        </div>
      </div>
    </div>
  );
}
