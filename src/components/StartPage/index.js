import React from "react";
import "./_startPage.scss";
import ChatStartImage from "../../assets/image/chat.png";

export default function StartPage() {
  return (
    <div className="row start-page-container">
      <div className="col-12 start-page-img">
        <img alt="" src={ChatStartImage} className="start-page-image" />
      </div>
      <div className="col-12 start-page-content">
        <p>Bây giờ bạn có thể trao đổi với những người khác</p>
      </div>
    </div>
  );
}
