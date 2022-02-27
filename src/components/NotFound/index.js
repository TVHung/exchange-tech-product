import React from "react";
import "./_notFound.scss";
import notFound from "../../assets/image/no-results.png";

export default function NotFound() {
  return (
    <div className="row not-found-container">
      <div className="col-12 not-found-img">
        <img alt="" src={notFound} className="not-found-image" />
      </div>
      <div className="col-12 not-found-content">
        <p>Không tìm thấy kết quả từ khóa đã nhập</p>
      </div>
      <div className="col-12 not-found-content">
        <span>
          Hãy chắc chắn rằng tất cả các từ đều đúng chính tả. Hãy thử những từ
          khóa khác hoặc những từ khóa chung hơn.
        </span>
      </div>
    </div>
  );
}
