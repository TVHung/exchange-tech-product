import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { toast } from "react-toastify";
import "./auth.scss";
import MetaTag from "../../components/MetaTag";
import { apiResetPass } from "../../constants";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

export default function FormResetPassword() {
  const [email, setEmail] = useState("");
  const [emailValidate, setEmailValidate] = useState("");
  const [show, setshow] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => {
    return () => {
      setEmail();
      setEmailValidate();
    };
  }, []);

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  //check login
  const handleSubmitLogin = async (e) => {
    if (e) e.preventDefault();
    setShowLoading(true);
    setEmailValidate("");
    let emailData = {
      email: email,
    };
    await axios
      .post(apiResetPass, emailData)
      .then((res) => {
        if (res.data.status === 1) {
          toast.success(res.data.message);
          setshow(true);
        } else {
          setEmailValidate(res.data.message);
          console.log(res.data);
        }
        setShowLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setEmailValidate(
          "Email không tồn tại, bạn vui lòng nhập đúng email tài khoản của mình"
        );
        setShowLoading(false);
      });
  };

  return (
    <div className="containerLogin">
      <MetaTag title="Quên mật khẩu" description={"Lấy lại mật khẩu"} />
      {showLoading ? (
        <Loading />
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="paperLogin">
            {show ? (
              <div className="text-center">
                <p>Email đã gửi đến bạn thành công</p>
                <p>Bạn vui lòng kiểm tra hòm thư email của mình</p>
                <Link to="/login">
                  <p>Quay lại trang nhập</p>
                </Link>
              </div>
            ) : (
              <>
                <p className="titleLogin">Nhập email tài khoản của bạn</p>
                <form className="formLogin" noValidate>
                  <TextField
                    error={emailValidate !== "" ? true : false}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    type="email"
                    autoFocus
                    onChange={(e) => handleOnChange(e)}
                    className="inputLogin"
                  />
                  <p id="validateEmail" className="nofiLogin">
                    {emailValidate}
                  </p>
                  <div style={{ marginTop: 10 }}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className="submitLogin"
                      onClick={(e) => handleSubmitLogin(e)}
                    >
                      Gửi
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
