import React, { useState, useEffect, useRef } from "react";
import { apiAddComment, headers } from "../../../constants";
import { timeConverter } from "../../../utils/common";
import Reply from "./Reply";
import "./_commentItem.scss";
import axios from "axios";
import { toast } from "react-toastify";

export default function CommentItem({
  comment,
  product_id,
  isAuth,
  isCommentManager,
}) {
  const [isReply, setIsReply] = useState(false);
  const [commentContentReply, setCommentContentReply] = useState({
    content: "",
    comment_parent_id: null,
  });

  const onClickReply = () => {
    setIsReply(true);
    setCommentContentReply((commentData) => ({
      ...commentData,
      comment_parent_id: comment?.id || null,
    }));
  };

  useEffect(() => {
    return () => {
      setCommentContentReply({});
    };
  }, []);

  const handleOnChangeComment = (e) => {
    const { name, value } = e.target;
    setCommentContentReply((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const addCommentReply = async (e) => {
    e.preventDefault();
    const commentData = {
      product_id: parseInt(product_id),
      content: commentContentReply?.content,
      comment_parent_id: parseInt(commentContentReply?.comment_parent_id),
    };
    try {
      await axios
        .post(`${apiAddComment}`, commentData, {
          headers: headers,
        })
        .then((res) => {
          if (res.data.status == 1) {
            const comment = res.data.data;
            toast.success("Bình luận thành công");
          } else {
            toast.error(res.data.message);
          }
          setCommentContentReply({
            content: "",
            comment_parent_id: null,
          });
        });
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, hãy thử lại");
    }
  };

  const goDetail = () => {
    if (isCommentManager) {
      window.location.href = `/detail/${product_id}`;
    }
  };

  return (
    <div className="comment-item row">
      <div className="avatar-comment col-lg-2 col-md-1 col-sm-2">
        <img
          src={comment?.user?.profile?.avatar_url}
          alt="avatar"
          className="avatar"
        />
      </div>
      <div className="comment-detail d-inline-block col-lg-10 col-md-11 col-sm-10">
        <div className="comment-content" onClick={() => goDetail()}>
          <span className="bold">{comment?.user?.profile?.name}</span>
          <span>{comment?.content}</span>
          <span className="created-at">
            {timeConverter(comment?.created_at)}
          </span>
        </div>
        <div className="reply">
          {isAuth && <span onClick={() => onClickReply()}>Trả lời</span>}
        </div>
      </div>
      <div className="col-12 comment-reply">
        <Reply replies={comment?.replies} />
      </div>
      {isReply && isAuth && (
        <div className="comment-reply-form">
          <form>
            <div className="input-group mb-1">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập bình luận của bạn..."
                aria-label="Nhập bình luận của bạn..."
                aria-describedby="enter-comment"
                name="content"
                value={commentContentReply?.content || ""}
                onChange={(e) => handleOnChangeComment(e)}
              />
              <button
                className="btn btn-primary"
                type="submit"
                id="enter-comment"
                onClick={(e) => addCommentReply(e)}
              >
                Gửi
              </button>
            </div>
          </form>
          <div className="cancel-reply" onClick={() => setIsReply(false)}>
            <span>Hủy</span>
          </div>
        </div>
      )}
    </div>
  );
}
