import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import GoogleLogin from "react-google-login";
import logoGoogle from "../../assets/image/google.png";
import logo from "../../assets/image/logopersonal2.png";
import "./auth.scss";
import MetaTag from "../../components/MetaTag";
import Preloading from "../../components/Loading";

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
  });
  const [errorEmail, setErrorEmail] = useState("");
  const [errorName, setErrorName] = useState("");
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

  //check sign up
  const handleSubmitSignup = (e) => {
    e.preventDefault();
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
        title="Register"
        description={"Đăng nhập, đăng kí để trao đổi, mua bán sản phẩm"}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paperLogin">
          <p className="titleLogin">Register</p>
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
              inputProps={{
                style: {},
              }}
            />
            <p id="validateEmail" className="nofiLogin">
              {errorEmail}
            </p>
            <TextField
              error={errorName != "" ? true : false}
              variant="filled"
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
              {errorName}
            </p>
            <div>
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
            </div>
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
                      Continue with Google
                    </Button>
                  )}
                ></GoogleLogin>
              </Grid>
            </Grid>
            <hr style={{ marginTop: 20, opacity: 0.5 }} />
            <Grid container>
              <a href="/login" className="textLogin">
                Have an account? Login
              </a>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
