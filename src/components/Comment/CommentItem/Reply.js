import React from "react";
import { timeConverter } from "../../../utils/common";
import "./_commentItem.scss";
export default function Reply({ replies }) {
  return (
    <>
      {replies &&
        replies.map((comment) => (
          <div className="comment-item row" key={comment?.id}>
            <div className="avatar-comment-reply col-lg-2 col-md-1 col-sm-2">
              <img
                src={comment?.user?.profile?.avatar_url}
                alt="avatar"
                className="avatar"
              />
            </div>
            <div className="comment-detail d-inline-block col-lg-10 col-md-11 col-sm-10">
              <div className="comment-content">
                <span className="bold">{comment?.user?.profile?.name}</span>
                <span>{comment?.content}</span>
                <span className="created-at">
                  {timeConverter(comment?.created_at)}
                </span>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
