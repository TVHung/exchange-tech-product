import React, { useState, useEffect } from "react";
import "./_chat.scss";
import { Grid } from "@material-ui/core";
import avt from "../../assets/image/avt-common.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiDeleteConversation, apiGetUser, headers } from "../../constants";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function Header({ userActive, users }) {
  const [userChat, setUserChat] = useState({});
  const params = useParams();
  const [show, setShow] = useState(false);

  const getUserChat = async (user_id) => {
    try {
      await axios
        .get(`${apiGetUser}/${user_id}`, {
          headers: headers,
        })
        .then((res) => {
          setUserChat(res?.data?.data);
        });
    } catch (error) {
      return { statusCode: 500, body: error.toString() };
    }
  };

  useEffect(() => {
    getUserChat(params.id);
  }, [params.id]);

  const deleteConversation = () => {
    console.log("delete chat");
    axios
      .delete(`${apiDeleteConversation}/${params.id}`, { headers: headers })
      .then((res) => {
        console.log(res);
        handleClose();
        if (res.data.status == 1) {
          toast.success(res.data.message);
          window.location.href = "/chat";
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        handleClose();
        console.error(error);
        toast.error("Xóa hội thoại thất bại");
      });
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (id) => {
    setShow(true);
  };

  return (
    <div className="chat-mess-header">
      <Modal show={show} onHide={() => handleClose()} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Bạn có chắc chắn muốn xóa hội thoại</p>
            <p>Tin nhắn giữa 2 người sẽ bị xóa</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-end mt-1">
            <div className="btn btn-primary mx-2" onClick={() => handleClose()}>
              Hủy
            </div>
            <div
              className="btn btn-danger mx-2"
              onClick={(e) => deleteConversation(e)}
            >
              Xác nhận
            </div>
          </div>
        </Modal.Footer>
      </Modal>
      <Grid container>
        <Grid item xs={6}>
          <div className="chat-avatar">
            <img
              src={userChat?.profile?.avatar_url || avt}
              alt="avt"
              className="chat-header-avatar"
            />
          </div>
          <div className="chat-header-infor">
            <span className="chat-header-name">
              {userChat?.profile?.name || "Người dùng"}
            </span>
            {/* <p className="chat-header-online">3 giờ trước</p> */}
          </div>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
      <div
        className="delete-conversation"
        onClick={() => handleShow()}
        title="Xóa cuộc trò chuyện"
      >
        <i className="fas fa-trash-alt"></i>
      </div>
    </div>
  );
}
