import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { toast } from "react-toastify";
import "./auth.scss";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import MetaTag from "../../components/MetaTag";
import { apiResetPass } from "./../../constants";
import { getParam } from "./../../utils/common";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

export default function ResetPassword() {
  const [user, setUser] = useState({
    password: "",
    password_confirmation: "",
  });
  const [userValidate, setUserValidate] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    return () => {
      setUser();
      setUserValidate();
      setShow();
      setShowLoading();
    };
  }, []);

  const handleOnChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    setUserValidate("");
    let token = getParam("token");
    if (token) {
      //handle call api change password
      const dataPassword = {
        password: user?.password,
        password_confirmation: user?.password_confirmation,
      };
      await axios
        .put(`${apiResetPass}/${token}`, dataPassword)
        .then((res) => {
          if (res.data.status === 1) {
            toast.success(res.data.message);
            setShow(true);
          } else {
            setUserValidate(res.data.password);
          }
          setShowLoading(false);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Đổi mật khẩu không thành công");
          setShowLoading(false);
        });
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm(!showPasswordConfirm);
  const handleMouseDownPasswordConfirm = () =>
    setShowPasswordConfirm(!showPasswordConfirm);

  return (
    <div className="containerLogin">
      <MetaTag
        title="Lấy lại mật khẩu"
        description={"Đăng nhập, đăng kí để trao đổi, mua bán sản phẩm"}
      />
      {showLoading ? (
        <Loading />
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="paperLogin">
            {show ? (
              <div className="text-center">
                <p>Bạn đã đổi mật khẩu thành công</p>
                <p>Bạn vui lòng đăng nhập lại để truy cập vào hệ thống</p>
                <Link to="/login">
                  <p>Quay lại trang nhập</p>
                </Link>
              </div>
            ) : (
              <>
                <p className="titleLogin">Thay đổi mật khẩu mới</p>
                <form className="formLogin" noValidate>
                  <TextField
                    error={userValidate != "" ? true : false}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => handleOnChange(e)}
                    className="inputLogin"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => handleClickShowPassword()}
                            onMouseDown={() => handleMouseDownPassword()}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <p id="validateEmail" className="nofiLogin">
                    {userValidate}
                  </p>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password_confirmation"
                    label="Confirm password"
                    type={showPasswordConfirm ? "text" : "password"}
                    id="password-confirm"
                    autoComplete="current-password"
                    onChange={(e) => handleOnChange(e)}
                    className="inputLogin"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => handleClickShowPasswordConfirm()}
                            onMouseDown={() => handleMouseDownPasswordConfirm()}
                          >
                            {showPasswordConfirm ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div style={{ marginTop: 10 }}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className="submitLogin"
                      onClick={(e) => handleSubmitNewPassword(e)}
                    >
                      Cập nhật
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </Container>
      )}
    </div>
  );
}
