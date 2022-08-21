import React, { useState, useEffect } from "react";
import "./_accountUserInfor.scss";
import { Grid, Button } from "@material-ui/core";
import axios from "axios";
import {
  apiChangeAvatar,
  apiChangePass,
  apiUserProfile,
  headerFiles,
  headers,
  maxSizeImage,
  sexData,
} from "../../../constants";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../../redux/actions/userActions";
import { converDate } from "../../../utils/common";
import Loading from "../../Loading";

export default function AccountUserInfor() {
  const [newPass, setNewPass] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [newPassValidate, setNewPassValidate] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [show, setShow] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    sex: null,
    avatar_url: "",
    phone: "",
    address: "",
    facebook_url: "",
  });
  const [validateProfile, setValidateProfile] = useState({
    name: "",
    sex: "",
    avatar_url: "",
    phone: "",
    address: "",
    facebook_url: "",
  });
  const [style, setStyle] = useState({ display: "block" });
  const handleOnChangePass = (e) => {
    const { name, value } = e.target;
    setNewPass((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleOnChangeProfile = (e) => {
    const { name, value } = e.target;
    if (name == "sex") {
      let val = Number(value);
      setProfile((prevState) => ({
        ...prevState,
        [name]: val,
      }));
    } else {
      setProfile((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const onSubmitNewPass = async (e) => {
    setNewPassValidate({
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    });
    await axios
      .post(apiChangePass, newPass, { headers: headers })
      .then((res) => {
        if (res.data?.status == 1) {
          document.getElementById("form-update-password").reset();
          toast.success(res.data?.message);
        } else if (res.data?.status == -1) {
          toast.error(res.data?.message);
          let name = "old_password";
          setNewPassValidate((prevState) => ({
            ...prevState,
            [name]: res.data?.message,
          }));
        } else {
          handleValidate(res.data, setNewPassValidate);
          toast.error("Cập nhật mật khẩu không thành công");
        }
      })
      .catch((error) => {
        toast.error("Cập nhật mật khẩu không thành công");
        console.error(error);
      });
  };

  const handleSubmitProfile = () => {
    updateUserProfile(profile);
  };

  const updateUserProfile = async (data) => {
    try {
      await axios
        .put(apiUserProfile, data, {
          headers: headers,
        })
        .then((res) => {
          if (res.data.status == 1) {
            toast.success("Cập nhật thành công");
            dispatch(fetchUserProfile());
            setShow(false);
          } else {
            handleValidate(res.data, setValidateProfile);
          }
        });
    } catch (error) {
      toast.error("Cập nhật thất bại");
      setShow(false);
      return { statusCode: 500, body: error.toString() };
    }
  };

  const handleValidate = (validateData, setState) => {
    Object.keys(validateData).forEach(function (key) {
      setState((prevState) => ({
        ...prevState,
        [key]: validateData[key][0],
      }));
    });
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
    setValidateProfile({
      name: "",
      sex: "",
      avatar_url: "",
      phone: "",
      address: "",
      facebook_url: "",
    });
  };

  //get data profile
  const dispatch = useDispatch();
  useEffect(() => {
    fetchUser();
    return () => {
      setProfile();
      setValidateProfile();
      setNewPass();
      setNewPassValidate();
    };
  }, []);
  const user_profile = useSelector((state) => state.user.userProfile);
  const fetchUser = () => {
    dispatch(fetchUserProfile());
  };
  useEffect(() => {
    setProfile({
      name: user_profile?.name,
      sex: user_profile?.sex,
      avatar_url: user_profile?.avatar_url,
      phone: user_profile?.phone,
      address: user_profile?.address,
      facebook_url: user_profile?.facebook_url,
    });
  }, [user_profile]);

  const getNameById = (id) => {
    let data = sexData.find((x) => x.id == id);
    if (data) return data.value;
    else return "";
  };

  const [fileImage, setfileImage] = useState();
  const [fileImageUrl, setfileImageUrl] = useState("");
  const [validate, setValidate] = useState("");

  const setUploadFile = (e) => {
    let fileImage = e.target.files[0];
    if (fileImage.size <= maxSizeImage) {
      setfileImage(fileImage);
      changeAvatar(fileImage);
      setIsLoaded(true);
      setValidate("");
    } else setValidate("Bạn chỉ được đăng ảnh kích thước tối đa 2mb");
  };

  useEffect(() => {
    setIsLoaded(true);
    setTimeout(() => {
      setIsLoaded(false);
    }, 1000);
    return () => {
      setfileImage();
      setfileImageUrl();
      setValidate();
    };
  }, []);

  const changeAvatar = async (fileImage) => {
    const formData = new FormData();
    formData.append("file", fileImage);
    await axios
      .post(apiChangeAvatar, formData, {
        headers: headerFiles,
      })
      .then((res) => {
        if (res.data.status == 1) {
          setfileImageUrl(res.data.data);
        } else {
          setValidate("Thất bại");
        }
        setIsLoaded(false);
      })
      .catch((error) => {
        setIsLoaded(false);
        console.error(error);
      });
  };

  return (
    <div className="account-container">
      <Modal show={show} onHide={() => handleClose()} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin cá nhân</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-edit-profile">
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="profile-name">
                Tên người dùng&nbsp;<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="profile-name"
                placeholder="Tên"
                name="name"
                defaultValue={user_profile?.name}
                className={
                  validateProfile?.name
                    ? "form-control is-invalid"
                    : "form-control"
                }
                onChange={(e) => handleOnChangeProfile(e)}
              />
              <p className="validate-form-text">{validateProfile?.name}</p>
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="profile-sex">
                Giới tính
              </label>
              <select
                className="form-select"
                name="sex"
                id="profile-sex"
                onChange={(e) => handleOnChangeProfile(e)}
                value={profile?.sex}
              >
                <option>Chọn giới tính</option>
                {sexData.map((data, index) => (
                  <option key={index} value={data.id}>
                    {data.value}
                  </option>
                ))}
              </select>
              <p className="validate-form-text">{validateProfile?.sex}</p>
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="profile-address">
                Địa chỉ
              </label>
              <input
                type="text"
                id="profile-address"
                className={
                  validateProfile?.address
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Địa chỉ"
                name="address"
                defaultValue={user_profile?.address}
                onChange={(e) => handleOnChangeProfile(e)}
              />
              <p className="validate-form-text">{validateProfile?.address}</p>
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="profile-facebook">
                Đường dẫn tài khoản facebook
              </label>
              <input
                type="text"
                id="profile-facebook"
                className={
                  validateProfile?.facebook_url
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Đường dẫn tài khoản facebook"
                name="facebook_url"
                defaultValue={user_profile?.facebook_url}
                onChange={(e) => handleOnChangeProfile(e)}
              />
              <p className="validate-form-text">
                {validateProfile?.facebook_url}
              </p>
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="profile-phone">
                Số điện thoại
              </label>
              <input
                type="text"
                id="profile-phone"
                className={
                  validateProfile?.phone
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Số điện thoại"
                name="phone"
                defaultValue={user_profile?.phone}
                onChange={(e) => handleOnChangeProfile(e)}
              />
              <p className="validate-form-text">{validateProfile?.phone}</p>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => handleClose()}
          >
            Hủy
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSubmitProfile()}
          >
            Cập nhật
          </button>
        </Modal.Footer>
      </Modal>
      {isLoaded ? (
        <Loading />
      ) : (
        <>
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
                      <div className="form-outline mb-3 avatar-container">
                        <div
                          className="account-avatar-profile"
                          style={{
                            backgroundImage: `url(${
                              fileImageUrl
                                ? fileImageUrl
                                : user_profile?.avatar_url
                            })`,
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                          }}
                        >
                          <div className="change-avatar" style={style}>
                            <label
                              htmlFor="avatar-upload"
                              className="custom-file-upload"
                            >
                              <i className="fas fa-pen"></i>
                            </label>
                            <input
                              type="file"
                              className="custom-file-input"
                              id="avatar-upload"
                              hidden
                              onChange={(e) => setUploadFile(e)}
                            />
                          </div>
                        </div>
                      </div>
                      <p
                        style={{
                          color: "red",
                          marginBottom: 0,
                        }}
                      >
                        {validate}
                      </p>
                    </Grid>
                    <Grid item xs={8}>
                      <h4 style={{ marginTop: 0 }}>{user_profile?.name}</h4>
                      <Button
                        className="account-edit-button"
                        onClick={() => handleOpen()}
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
                        <span className="infor-detail">
                          {user_profile?.phone}
                        </span>
                      </li>
                      <li>
                        <i className="fas fa-user"></i>
                        <b>Giới tính: </b>
                        <span className="infor-detail">
                          {getNameById(user_profile?.sex)}
                        </span>
                      </li>
                      <li>
                        <i className="fas fa-address-book"></i>
                        <b>Địa chỉ: </b>
                        <span className="infor-detail">
                          {user_profile?.address}
                        </span>
                      </li>
                      <li>
                        <i className="fas fa-calendar-day"></i>
                        <b>Ngày tham gia: </b>
                        <span className="infor-detail">
                          {converDate(user_profile?.created_at)}
                        </span>
                      </li>
                      {/* <li>
                        <i className="fas fa-comment-dots"></i>
                        <b>Phản hồi: </b>
                        <span className="infor-detail">Trong 1 giờ</span>
                      </li> */}
                      <li>
                        <i className="fas fa-check-circle"></i>
                        <b>Kết nối: </b>
                        <span className="infor-detail">
                          {user_profile?.facebook_url && (
                            <a
                              href={user_profile?.facebook_url}
                              title="Facebook"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fab fa-facebook social-icon"></i>
                            </a>
                          )}
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
                    onChange={(e) => handleOnChangePass(e)}
                  />
                  <p className="validate-form-text">
                    {newPassValidate?.old_password}
                  </p>
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
                        onChange={(e) => handleOnChangePass(e)}
                      />
                      <p className="validate-form-text">
                        {newPassValidate?.new_password}
                      </p>
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
                        onChange={(e) => handleOnChangePass(e)}
                      />
                      <p className="validate-form-text">
                        {newPassValidate?.new_password_confirmation}
                      </p>
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
        </>
      )}
    </div>
  );
}
