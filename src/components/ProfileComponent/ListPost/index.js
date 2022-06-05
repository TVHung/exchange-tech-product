import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MyPostItem from "./MyPostItem";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyPost, fetchMyPosts } from "../../../redux/actions/postActions";
import { Modal, Button } from "react-bootstrap";
import NotPost from "../../NotPost";
import "./_listPost.scss";
import Pagination from "react-js-pagination";

export default function ListPost({ setPreload }) {
  const [show, setShow] = useState(false);
  const [postIdDelete, setPostIdDelete] = useState(null);
  const [filter, setFilter] = useState("all"); //1 tat ca , 2 chua ban, 3 da ban
  const [myPostFilter, setMyPostFilter] = useState([]); //1 tat ca , 2 chua ban, 3 da ban

  const dispatch = useDispatch();
  const my_posts = useSelector((state) => state.post.my_posts);
  const getAllMyPosts = () => {
    dispatch(fetchMyPosts());
  };
  useEffect(() => {
    getAllMyPosts();
  }, []);
  useEffect(() => {
    console.log("my post", my_posts);
    setMyPostFilter(my_posts?.data);
  }, [my_posts]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (id) => {
    setPostIdDelete(id);
    setShow(true);
  };
  const handleDeletePost = () => {
    dispatch(deleteMyPost(postIdDelete));
    handleClose();
  };

  const onChangeCheckStatus = (e) => {
    const { name } = e.target;
    setFilter(name);
    dispatch(fetchMyPosts(1, name));
  };

  return (
    <div style={{ paddingTop: 10 }}>
      <Modal show={show} onHide={() => handleClose()} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Bạn có chắc chắn muốn xóa bài viết</p>
            <p>Bài viết của bạn sẽ bị xóa vĩnh viễn</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-end mt-1">
            <div className="btn btn-primary mx-2" onClick={() => handleClose()}>
              Hủy
            </div>
            <div
              className="btn btn-danger mx-2"
              onClick={(e) => handleDeletePost(e)}
            >
              Xác nhận
            </div>
          </div>
        </Modal.Footer>
      </Modal>
      <div className="my-post-manager">
        <h3>Bài viết đã đăng</h3>
        <div className="my-post-status-select">
          <div className="d-flex justify-content-start ms-auto py-sm-3 filter-header">
            <div className="form-check filter-header-sort">
              <span>
                <i
                  className="fas fa-funnel-dollar"
                  style={{ marginRight: 5 }}
                ></i>
                {`Chọn trạng thái`}
              </span>
            </div>
            <div className="form-check filter-header-sort">
              <input
                className="form-check-input"
                type="radio"
                name="all"
                id="my-post-all"
                onChange={(e) => onChangeCheckStatus(e)}
                checked={filter === "all"}
              />
              <label className="form-check-label" htmlFor="my-post-all">
                Tất cả
              </label>
            </div>
            <div className="form-check filter-header-sort">
              <input
                className="form-check-input"
                type="radio"
                name="not_sold"
                id="my-post-not-sold"
                onChange={(e) => onChangeCheckStatus(e)}
                checked={filter === "not_sold"}
              />
              <label className="form-check-label" htmlFor="my-post-not-sold">
                Chưa bán
              </label>
            </div>
            <div className="form-check filter-header-sort">
              <input
                className="form-check-input"
                type="radio"
                name="sold"
                id="my-post-sold"
                onChange={(e) => onChangeCheckStatus(e)}
                checked={filter === "sold"}
              />
              <label className="form-check-label" htmlFor="my-post-sold">
                Đã bán
              </label>
            </div>
            <div className="form-check filter-header-sort">
              <input
                className="form-check-input"
                type="radio"
                name="private"
                id="my-post-private"
                onChange={(e) => onChangeCheckStatus(e)}
                checked={filter === "private"}
              />
              <label className="form-check-label" htmlFor="my-post-private">
                Đã ẩn
              </label>
            </div>
          </div>
        </div>
        {myPostFilter?.length > 0 ? (
          <div>
            <Grid container spacing={1} alignItems="stretch">
              {myPostFilter &&
                myPostFilter.map((item) => (
                  <Grid key={item.id} item xs={6}>
                    <MyPostItem data={item} handleShow={handleShow} />
                  </Grid>
                ))}
            </Grid>
            <div className="paginate mt-3">
              <small className="fw-bold d-block">
                Hiển thị <b>{myPostFilter?.length}</b> trên{" "}
                <b>{my_posts?.meta?.total}</b> bài viết
              </small>
            </div>
            <div className="mt-1 paginate">
              <Pagination
                activePage={my_posts?.meta?.current_page}
                itemsCountPerPage={my_posts?.meta?.per_page}
                totalItemsCount={my_posts?.meta?.total || 0}
                onChange={(pageNumber) => {
                  dispatch(fetchMyPosts(pageNumber));
                }}
                pageRangeDisplayed={5}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="Trang đầu"
                lastPageText="Trang cuối"
              />
            </div>
          </div>
        ) : (
          <NotPost type={"my-post"} />
        )}
      </div>
    </div>
  );
}
