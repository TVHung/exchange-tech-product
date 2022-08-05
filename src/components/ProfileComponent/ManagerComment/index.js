import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { getCommentMyProduct } from "../../../redux/actions/postActions";
import CommentItem from "../../Comment/CommentItem";

export default function ManagerComment({ setPreload }) {
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommentMyProduct(1));
    return () => {};
  }, []);
  const product_comments = useSelector(
    (state) => state.post.commentsOfMyProduct
  );
  useEffect(() => {
    setComments(product_comments?.data);
  }, [product_comments]);

  return (
    <div>
      <div className="comment-container">
        <div>
          <div className="row">
            {comments &&
              comments?.map((comment) => (
                <div key={comment.id} className="col-lg-6 col-sm-12">
                  <CommentItem
                    comment={comment}
                    product_id={comment?.product_id}
                    isAuth={true}
                    isCommentManager={true}
                  />
                </div>
              ))}
          </div>
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
                    dispatch(getCommentMyProduct(pageNumber));
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
            <div className="text-center">
              <p>Hãy là người bình luận đầu tiên</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
