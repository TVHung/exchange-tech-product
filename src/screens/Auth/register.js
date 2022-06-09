import React, { useState, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import axios from "axios";
import GoogleLogin from "react-google-login";
import logoGoogle from "../../assets/image/google.png";
import { toast } from "react-toastify";
import "./auth.scss";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import MetaTag from "../../components/MetaTag";
import { apiRegister } from "./../../constants";

const UseFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };
  return [htmlElRef, setFocus];
};
export default function Login({ type }) {
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
  });
  const [userValidate, setUserValidate] = useState({
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  useEffect(() => {
    return () => {
      setUser();
      setUserValidate();
    };
  }, []);

  const handleOnChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const continueWithGoogle = (e) => {
    e.preventDefault();
  };

  //check sign up
  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    setUserValidate({
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
    });
    let userRegister = {
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation,
    };

    await axios
      .post(apiRegister, userRegister)
      .then((res) => {
        console.log(res);
        if (res.data?.status == 1) {
          toast.success(res.data?.message);
          window.location.href = `/login`;
        } else {
          handleValidate(res.data);
          toast.error("Đăng ký không thành công");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Đăng ký không thành công");
      });
  };

  const handleValidate = (validateData) => {
    Object.keys(validateData).forEach(function (key) {
      setUserValidate((prevState) => ({
        ...prevState,
        [key]: validateData[key][0],
      }));
    });
  };

  const loginSuccess = (response) => {
    console.log("Register success", response);
  };
  const loginFailure = (response) => {
    console.log("Register Failed", response);
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
        title="Đăng ký"
        description={"Đăng nhập, đăng kí để trao đổi, mua bán sản phẩm"}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paperLogin">
          <p className="titleLogin">Register</p>
          <form className="formLogin" noValidate>
            <TextField
              error={userValidate?.name != "" ? true : false}
              margin="normal"
              required
              fullWidth
              name="name"
              label="Username"
              type="text"
              id="name"
              onChange={(e) => handleOnChange(e)}
              className="inputLogin"
            />
            <p id="validateEmail" className="nofiLogin">
              {userValidate?.name}
            </p>
            <TextField
              error={userValidate?.email != "" ? true : false}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => handleOnChange(e)}
              className="inputLogin"
              inputProps={{
                style: {},
              }}
            />
            <p id="validateEmail" className="nofiLogin">
              {userValidate?.email}
            </p>
            <TextField
              error={userValidate?.password != "" ? true : false}
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
              {userValidate?.password}
            </p>
            <TextField
              error={userValidate?.password_confirmation != "" ? true : false}
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
                      {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <p id="validateEmail" className="nofiLogin">
              {userValidate?.password_confirmation}
            </p>
            <div style={{ marginTop: 10 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submitLogin"
                onClick={(e) => handleSubmitSignup(e)}
              >
                Sign up
              </Button>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <GoogleLogin
                  clientId={
                    "943683537472-djj3f68jb2spj4f7vgrr7hevsd28u7tk.apps.googleusercontent.com"
                  }
                  onSuccess={loginSuccess}
                  onFailure={loginFailure}
                  isSignedIn={true}
                  render={(renderProps) => (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      className="submitLogin"
                      style={{
                        marginTop: 20,
                        color: "#05042c",
                        background: "#fafafa",
                      }}
                      startIcon={
                        <img
                          alt="googleIcon"
                          src={logoGoogle}
                          width="20px"
                          height="20px"
                        />
                      }
                      onClick={renderProps.onClick}
                      // disabled={renderProps.disabled}
                      // disabled={true}
                    >
                      Tiếp tục với Google
                    </Button>
                  )}
                ></GoogleLogin>
              </Grid>
            </Grid>
            <hr style={{ marginTop: 20, opacity: 0.5 }} />
            <Grid container>
              <a href="/login" className="textLogin">
                Bạn đã có tài khoản? Login
              </a>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
