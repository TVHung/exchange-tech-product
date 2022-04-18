import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MyPostItem from "./MyPostItem";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyPost, fetchMyPosts } from "../../../redux/actions/postActions";
import { Modal, Button } from "react-bootstrap";

export default function ListPost() {
  const [show, setShow] = useState(false);
  const [postIdDelete, setPostIdDelete] = useState(null);

  const dispatch = useDispatch();
  const my_posts = useSelector((state) => state.post.my_posts);
  const getAllMyPosts = () => {
    dispatch(fetchMyPosts());
  };
  useEffect(() => {
    getAllMyPosts();
  }, []);
  useEffect(() => {
    if (my_posts) console.log(my_posts);
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

  return (
    <div style={{ paddingTop: 10 }}>
      <Modal show={show} onHide={() => handleClose()} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chọn địa chỉ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Bạn có chắc chắn muốn xóa bài viết</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Hủy
          </Button>
          <Button variant="primary" onClick={() => handleDeletePost()}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
      <h2>Bài viết đã đăng</h2>
      <Grid container spacing={1} alignItems="stretch">
        {my_posts &&
          my_posts.map((item) => (
            <Grid key={item.id} item xs={6}>
              <MyPostItem data={item} handleShow={handleShow} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
