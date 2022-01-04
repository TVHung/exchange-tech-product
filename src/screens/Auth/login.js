import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import GoogleLogin from "react-google-login";
import logoGoogle from "../../assets/image/google.png";
import { toast } from "react-toastify";
import "./auth.scss";
import MetaTag from "../../components/MetaTag";
import { apiLogin } from "../../constants";
import { setCookie } from "./../../utils/cookie";
import { validateEmail, validatePassword } from "../../validations";

const UseFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };
  return [htmlElRef, setFocus];
};
export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const continueWithGoogle = (e) => {
    e.preventDefault();
  };

  //check login
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    let userLogin = {
      email: user.email,
      password: user.password,
    };
    setErrorEmail(validateEmail(user.email));
    setErrorPassword(validatePassword(user.password));
    if (
      validateEmail(user.email) == "" &&
      validatePassword(user.password) == ""
    )
      await axios
        .post(apiLogin, userLogin)
        .then((res) => {
          const data = res.data;
          if (data.access_token) {
            toast.success("正常にログインしました！");
            setCookie("access_token", data.access_token, 3600);
          }
          // setLoginFaild("");
          window.location.href = `/`;
        })
        .catch((error) => {
          toast.error("ログインに失敗しました！");
          // setLoginFaild("メールアドレスまたはパスワードが間違っています！");
        });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const loginSuccess = (response) => {
    console.log("Login success", response);
  };
  const loginFailure = (response) => {
    console.log("Login Failed", response);
  };

  return (
    <div className="containerLogin">
      <MetaTag
        title="Login"
        description={"Đăng nhập, đăng kí để trao đổi, mua bán sản phẩm"}
      />

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paperLogin">
          <p className="titleLogin">Login</p>
          <form className="formLogin" noValidate>
            <TextField
              error={errorEmail != "" ? true : false}
              variant="filled"
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
            />
            <p id="validateEmail" className="nofiLogin">
              {errorEmail}
            </p>
            <TextField
              error={errorPassword != "" ? true : false}
              variant="filled"
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
              {errorPassword}
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
                Log in
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
                      Continue with Google
                    </Button>
                  )}
                ></GoogleLogin>
              </Grid>
            </Grid>
            <hr style={{ marginTop: 20, opacity: 0.5 }} />
            <Grid container>
              <a href="/register" className="textLogin">
                Can't log in?
              </a>
              <a href="/register" className="textLogin">
                Sign up for an account
              </a>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
