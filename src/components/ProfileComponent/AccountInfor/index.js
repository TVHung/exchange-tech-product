import React, { useState, useEffect } from "react";
import "./accountInfor.scss";
import { Grid, Button } from "@material-ui/core";
import avt from "../../../assets/image/avt.jpg";
import axios from "axios";
import { apiChangePass, headers } from "../../../constants";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

export default function AccountInfor() {
  const [newPass, setNewPass] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [valOldPass, setvalOldPass] = useState("");
  const [valNewPass, setvalNewPass] = useState("");
  const [valNewPassConfirm, setvalNewPassConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState({});
  const [avatar, setAvatar] = useState("");
  const [style, setStyle] = useState({ display: "block" });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewPass((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleOnChangeProfile = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const validateFormNewPass = () => {
    let valPass = true;
    if (newPass.old_password.length === 0) {
      setvalOldPass("*Trường này không được để trống!");
      valPass = false;
    } else {
      setvalOldPass("");
    }
    if (newPass.new_password.length === 0) {
      setvalNewPass("*Trường này không được để trống!");
      valPass = false;
    } else if (newPass.old_password === newPass.new_password) {
      setvalNewPass("Mật khẩu cũ và mới giống nhau");
      valPass = false;
    } else setvalNewPass("");

    if (newPass.new_password_confirmation.length === 0) {
      setvalNewPassConfirm("*Trường này không được để trống!");
      valPass = false;
    } else if (newPass.new_password != newPass.new_password_confirmation) {
      setvalNewPassConfirm(
        "Mật khẩu mới và xác nhận lại mật khẩu không giống nhau"
      );
      valPass = false;
    } else setvalNewPassConfirm("");
    console.log(valPass);
    return valPass;
  };

  const onSubmitNewPass = async (e) => {
    // e.preventdefault();
    if (validateFormNewPass())
      await axios
        .post(apiChangePass, newPass, { headers: headers })
        .then((res) => {
          console.log(res);
          toast.success("Cập nhật mật khẩu thành công");
          document.getElementById("form-update-password").reset();
        })
        .catch((error) => {
          toast.error("Cập nhật mật khẩu không thành công");
          console.error(error);
        });
  };

  const handleSubmit = () => {};
  const handleClose = () => {
    setShow(false);
  };

  const uploadFile = (e) => {
    if (e.target.files.length !== 0)
      setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="account-container">
      <Modal show={show} onHide={() => handleClose()} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin cá nhân</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-outline mb-3 avatar-container">
              <div
                className="account-avatar-profile"
                style={{
                  backgroundImage: `url(${avatar || avt})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                // onMouseLeave={(e) => {
                //   setStyle({ display: "none" });
                // }}
              ></div>
              <div className="change-avatar" style={style}>
                <input
                  type="file"
                  name="avatar-file"
                  id="change-avatar"
                  hidden
                />
                <label htmlFor="avatar-upload" className="custom-file-upload">
                  <i className="fas fa-pen"></i>
                </label>
                <input
                  type="file"
                  className="custom-file-input"
                  id="avatar-upload"
                  hidden
                  onChange={(e) => uploadFile(e)}
                />
              </div>
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="profile-name">
                Tên người dùng&nbsp;<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="profile-name"
                className="form-control"
                placeholder="Tên"
                name="name"
                onChange={(e) => handleOnChange(e)}
              />
              <p className="validate-form-text"></p>
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="profile-address">
                Địa chỉ&nbsp;<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="profile-address"
                className="form-control"
                placeholder="Địa chỉ"
                name="address"
                onChange={(e) => handleOnChange(e)}
              />
              <p className="validate-form-text"></p>
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="profile-facebook">
                Đường dẫn tài khoản facebook&nbsp;
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="profile-facebook"
                className="form-control"
                placeholder="Đường dẫn tài khoản facebook"
                name="facebook_url"
                onChange={(e) => handleOnChange(e)}
              />
              <p className="validate-form-text"></p>
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="profile-phone">
                Số điện thoại&nbsp;
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="profile-phone"
                className="form-control"
                placeholder="Số điện thoại"
                name="phone"
                onChange={(e) => handleOnChange(e)}
              />
              <p className="validate-form-text"></p>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Hủy
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="account-infor">
        <h3>Thông tin người dùng</h3>
        <div className="account-infor-content">
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              className="account-infor-content-detail-left"
            >
              <Grid container>
                <Grid item xs={4}>
                  <img src={avt} alt="avt" className="account-avatar" />
                </Grid>
                <Grid item xs={8}>
                  <h3 style={{ marginTop: 0 }}>Truong Hung</h3>
                  <Button
                    className="account-edit-button"
                    onClick={() => setShow(true)}
                  >
                    Chỉnh sửa <i className="fas fa-user-edit"></i>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              className="account-infor-content-detail-right"
            >
              <div className="account-detail">
                <ul>
                  <li>
                    <i className="fas fa-phone"></i>
                    <b>Số điện thoại: </b>
                    <span className="infor-detail">09383621309</span>
                  </li>
                  <li>
                    <i className="fas fa-address-book"></i>
                    <b>Địa chỉ: </b>
                    <span className="infor-detail">
                      Đức Lân, Yên Phụ, Yên Phong, Bắc Ninh
                    </span>
                  </li>
                  <li>
                    <i className="fas fa-calendar-day"></i>
                    <b>Ngày tham gia: </b>
                    <span className="infor-detail">13/09/1999</span>
                  </li>
                  <li>
                    <i className="fas fa-comment-dots"></i>
                    <b>Phản hồi: </b>
                    <span className="infor-detail">Trong 1 giờ</span>
                  </li>
                  <li>
                    <i className="fas fa-check-circle"></i>
                    <b>Kết nối: </b>
                    <span className="infor-detail">
                      <i className="fab fa-facebook social-icon"></i>
                      <i className="fab fa-twitter social-icon"></i>
                      <i className="fab fa-google-plus-g social-icon"></i>
                      <i className="fab fa-instagram social-icon"></i>
                    </span>
                  </li>
                </ul>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="account-password">
        <h3>Thay đổi mật khẩu</h3>
        <div className="account-password-content">
          <form
            className="form-product"
            id="form-update-password"
            onSubmit={(e) => onSubmitNewPass(e)}
          >
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="post-old_password">
                Nhập mật khẩu hiện tại&nbsp;
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="post-old_password"
                className="form-control"
                placeholder="Nhập mật khẩu hiện tại"
                name="old_password"
                onChange={(e) => handleOnChange(e)}
              />
              <p className="validate-form-text">{valOldPass}</p>
            </div>
            <div className="row mb-3">
              <div className="col">
                <div className="form-outline">
                  <label className="form-label" htmlFor="post-new_password">
                    Mật khẩu mới&nbsp;
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="post-new_password"
                    className="form-control"
                    placeholder="Nhập mật khẩu mới"
                    name="new_password"
                    onChange={(e) => handleOnChange(e)}
                  />
                  <p className="validate-form-text">{valNewPass}</p>
                </div>
              </div>
              <div className="col">
                <div className="form-outline">
                  <label
                    className="form-label"
                    htmlFor="post-new_password_confirmation"
                  >
                    Nhập lại mật khẩu mới&nbsp;
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="post-new_password_confirmation"
                    className="form-control"
                    placeholder="Nhập lại mật khẩu mới"
                    name="new_password_confirmation"
                    onChange={(e) => handleOnChange(e)}
                  />
                  <p className="validate-form-text">{valNewPassConfirm}</p>
                </div>
              </div>
            </div>
            <div className="account-password-button">
              <Button
                className="account-password-update-button"
                onClick={(e) => onSubmitNewPass(e)}
              >
                Cập nhật <i className="fas fa-save"></i>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
