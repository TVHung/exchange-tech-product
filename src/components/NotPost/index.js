import React from "react";
import "./_notPost.scss";
import notFound from "../../assets/image/error.png";

export default function NotPost({ type }) {
  return (
    <div className="row not-post-container">
      {type == "my-post" && (
        <>
          <div className="col-12 not-post-img">
            <img alt="" src={notFound} className="not-post-image" />
          </div>
          <div className="col-12 not-post-content">
            <p>Bạn chưa có bài viết nào</p>
          </div>
          <div className="col-12 not-post-content">
            <span>
              Hãy cùng tạo bài viết mới bằng cách nhấn vào{" "}
              <a href="create-post">đây</a>.
            </span>
          </div>
        </>
      )}
      {type == "my-favorite" && (
        <>
          <div className="col-12 not-post-img">
            <img alt="" src={notFound} className="not-post-image" />
          </div>
          <div className="col-12 not-post-content">
            <p>Bạn chưa có quan tâm đến bài viết nào</p>
          </div>
          <div className="col-12 not-post-content">
            <span>
              Xem thêm các bài viết tại <a href="/">đây</a>.
            </span>
          </div>
        </>
      )}
    </div>
  );
}
