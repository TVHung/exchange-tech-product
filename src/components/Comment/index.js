import React, { useState, useEffect } from "react";
import { apiAddComment, headers } from "../../constants";
import CommentItem from "./CommentItem";
import { toast } from "react-toastify";
import axios from "axios";
import Pusher from "pusher-js";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { getCommentProduct } from "../../redux/actions/postActions";
export default function Comment({ product_id, isAuth }) {
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);

  const handleOnChangeComment = (e) => {
    const { value } = e.target;
    setCommentContent(value);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommentProduct(product_id, 1));
    return () => {};
  }, []);
  const product_comments = useSelector((state) => state.post.commentsOfProduct);
  useEffect(() => {
    setComments(product_comments?.data);
  }, [product_comments]);

  useEffect(() => {
    Pusher.logToConsole = false;
    var pusher = new Pusher("1bf1895dca0e9f4afb6a", {
      cluster: "ap1",
    });
    var channel = pusher.subscribe("comment");
    channel.bind("comment", function (data) {
      dispatch(getCommentProduct(product_id, 1));
    });
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
          setCommentContent("");
        });
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, hãy thử lại");
    }
  };

  return (
    <div className="comment-container">
      {isAuth && (
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
      )}
      <div>
        {comments &&
          comments?.map((comment) => (
            <div key={comment.id}>
              <CommentItem
                comment={comment}
                product_id={product_id}
                isAuth={isAuth}
              />
            </div>
          ))}
        {comments?.length ? (
          <>
            <div className="paginate mt-3">
              <small className="fw-bold d-block">
                Hiển thị <b>{comments?.length}</b> trên{" "}
                <b>{product_comments?.meta?.total}</b> bình luận
              </small>
            </div>
            <div className="mt-1 paginate">
              <Pagination
                activePage={product_comments?.meta?.current_page}
                itemsCountPerPage={product_comments?.meta?.per_page}
                totalItemsCount={product_comments?.meta?.total || 0}
                onChange={(pageNumber) => {
                  dispatch(getCommentProduct(product_id, pageNumber));
                }}
                pageRangeDisplayed={3}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="<<"
                lastPageText=">>"
              />
            </div>
          </>
        ) : (
          <>
            {isAuth ? (
              <div className="text-center">
                <p>Hãy là người bình luận đầu tiên</p>
              </div>
            ) : (
              <div className="text-center">
                <p>
                  Đăng nhập để có thể bình luận <a href="/login">tại đây</a>
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
