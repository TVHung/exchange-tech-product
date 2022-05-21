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
import Loading from "../../components/Loading";

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
  const [errorLogin, setErrorLogin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      setUser({ email: "", password: "" });
      setErrorEmail("");
      setErrorPassword("");
      setErrorLogin("");
    };
  }, []);

  const handleOnChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //check login
  const handleSubmitLogin = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
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
            toast.success("Đăng nhập thành công");
            setCookie("access_token", data.access_token, 3600);
          }
          setIsLoading(false);
          setErrorLogin("");
          window.location.href = `/`;
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error("Đặng nhập không thành công");
          setErrorLogin("Email hoặc mật khẩu không đúng");
        });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const loginSuccess = (response) => {
    console.log(response);
    toast.success("Đăng nhập thành công");
  };
  const loginFailure = (response) => {
    // console.log(response);
    toast.error("Đặng nhập không thành công");
  };

  return (
    <div className="containerLogin">
      <MetaTag
        title="Login"
        description={"Đăng nhập, đăng kí để trao đổi, mua bán sản phẩm"}
      />
      {isLoading ? (
        <Loading />
      ) : (
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
              <p id="validateEmail" className="nofiLogin">
                {errorLogin}
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
                  Đăng nhập
                </Button>
              </div>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <GoogleLogin
                    clientId={
                      "217349199407-r0efehl3tjiavtkk5b8c035bqj5aer2q.apps.googleusercontent.com"
                    }
                    // onSuccess={(res) => loginSuccess(res)}
                    // onFailure={(res) => loginFailure(res)}
                    isSignedIn={true}
                    cookiePolicy={"single_host_origin"}
                    render={(renderProps) => (
                      <Button
                        type="button"
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
                        disabled={renderProps.disabled}
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
                <Grid item xs={6}>
                  <a href="/register" className="textLogin">
                    Không thể đăng nhập?
                  </a>
                </Grid>
                <Grid item xs={6}>
                  <a href="/register" className="textLogin">
                    Đăng kí một tài khoản
                  </a>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      )}
    </div>
  );
}
