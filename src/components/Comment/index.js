import React, { useState, useEffect } from "react";
import { apiAddComment, headers } from "../../constants";
import CommentItem from "./CommentItem";
import { toast } from "react-toastify";
import axios from "axios";

export default function Comment({ comments, product_id }) {
  const [commentContent, setCommentContent] = useState("");

  const handleOnChangeComment = (e) => {
    const { value } = e.target;
    setCommentContent(value);
  };

  useEffect(() => {
    return () => {
      setCommentContent("");
    };
  }, []);

  const addComment = async (e) => {
    e.preventDefault();
    const commentData = {
      product_id: parseInt(product_id),
      content: commentContent,
      comment_parent_id: null,
    };
    console.log(commentData);
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
          setCommentContent({
            content: "",
            comment_parent_id: null,
          });
        });
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, hãy thử lại");
    }
  };

  return (
    <div className="comment-container">
      <div className="input-comment">
        <form>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nhập bình luận của bạn..."
              aria-label="Nhập bình luận của bạn..."
              aria-describedby="enter-comment"
              name="content"
              value={commentContent || ""}
              onChange={(e) => handleOnChangeComment(e)}
            />
            <button
              className="btn btn-primary"
              type="submit"
              id="enter-comment"
              onClick={(e) => addComment(e)}
            >
              Gửi
            </button>
          </div>
        </form>
      </div>
      <div>
        {comments &&
          comments.map((comment) => (
            <div key={comment.id}>
              <CommentItem comment={comment} product_id={product_id} />
            </div>
          ))}
      </div>
    </div>
  );
}
