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
import "./login.scss";

const getParam = (param) => {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var para = url.searchParams.get(param);
    return para;
};

const openLink = (url) => {
    const win = window.open(url, "_self");
};

var directLink;

const UseFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
        htmlElRef.current && htmlElRef.current.focus();
    };
    return [htmlElRef, setFocus];
};
export default function Signin() {
    directLink = getParam("continue") + "/signin?ticket=";
    const [user, setUser] = useState({
        email: "",
        name: "",
        mobile: "",
        password: "",
    });
    const [errorEmail, setErrorEmail] = useState("");
    const [errorName, setErrorName] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorMobile, setErrorMobile] = useState("");

    const [title, setTitle] = useState("Login to Exchange Tech");
    const [switchState, setswitchState] = useState("continue"); //thay doi trang thai: continue, login, signup
    const [showPassword, setShowPassword] = useState(false);
    const [indexElement, setIndexElement] = React.useState(1); //trang thai show hide các trường

    const [inputEmailRef, setInputEmailRefFocus] = UseFocus();
    const [inputPassRef, setInputPassRefFocus] = UseFocus();
    const [inputUsernameRef, setInputUsernameRefFocus] = UseFocus();
    const [inputPhoneRef, setInputPhoneRefFocus] = UseFocus();

    const handleOnChange = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const continueWithGoogle = (e) => {
        e.preventDefault();
    };

    //check email;
    const handleSubmitContinue = (e) => {
        e.preventDefault();
    };

    //check login
    const handleSubmitLogin = (e) => {
        e.preventDefault();
        console.log(indexElement);
        let userLogin = {
            email: user.email,
            password: user.password,
        };
    };

    //check sign up
    const handleSubmitSignup = (e) => {
        e.preventDefault();
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const onClickChangeLogin = () => {
        setIndexElement(1);
        setswitchState("continue");
        setTitle("Login to Exchange Tech");
        resetForm();
        setInputEmailRefFocus();
    };

    const onClickChangeSignup = () => {
        setswitchState("signup");
        setTitle("Signup to Exchange Tech");
        setIndexElement(3);
        resetForm();
        console.log("Dang ki");
        if (user.email == "") {
            setInputEmailRefFocus();
        } else {
            setInputUsernameRefFocus();
        }
    };

    const resetForm = () => {
        setErrorEmail("");
        setErrorName("");
        setErrorPassword("");
        setErrorMobile("");
    };

    useEffect(() => {
        document.title = title;
    }, [title]);

    let button;
    if (indexElement == 1) {
        button = (
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submitLogin"
                onClick={(e) => handleSubmitContinue(e)}
            >
                Continue
            </Button>
        );
    } else if (indexElement == 2) {
        button = (
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
        );
    } else {
        button = (
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
        );
    }

    const loginSuccess = (response) => {
        console.log("Login success", response);
    };
    const loginFailure = (response) => {
        console.log("Login Failed", response);
    };

    return (
        <div className="containerLogin">
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="avatarLogin">
                    <img src={logo} alt="Logo" className="logoLogin" />
                </div>
                <div className="paperLogin">
                    <Typography
                        style={{
                            color: "#4150b5",
                            fontSize: 20,
                            marginTop: 20,
                            fontFamily: "inherit",
                            fontWeight: "bold",
                        }}
                    >
                        {title}
                    </Typography>
                    <form className="formLogin" noValidate>
                        <TextField
                            error={errorEmail != "" ? true : false}
                            variant="outlined"
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
                            inputRef={inputEmailRef}
                        />
                        <p id="validateEmail" className="nofiLogin">
                            {errorEmail}
                        </p>

                        {switchState == "signup" ? (
                            <TextField
                                error={errorName != "" ? true : false}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="name"
                                label="Username"
                                type="text"
                                id="name"
                                onChange={(e) => handleOnChange(e)}
                                className="inputLogin"
                                inputRef={inputUsernameRef}
                            />
                        ) : null}

                        <p id="validateEmail" className="nofiLogin">
                            {errorName}
                        </p>
                        {switchState == "signup" ? (
                            <TextField
                                error={errorMobile != "" ? true : false}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="mobile"
                                label="Mobile"
                                type="text"
                                id="mobile"
                                onChange={(e) => handleOnChange(e)}
                                className="inputLogin"
                                inputRef={inputPhoneRef}
                            />
                        ) : null}

                        <p id="validateMobile" className="nofiLogin">
                            {errorMobile}
                        </p>
                        {switchState == "signup" || switchState == "login" ? (
                            <div>
                                <TextField
                                    error={errorPassword != "" ? true : false}
                                    variant="outlined"
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
                                    inputRef={inputPassRef}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() =>
                                                        handleClickShowPassword()
                                                    }
                                                    onMouseDown={() =>
                                                        handleMouseDownPassword()
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <span></span>
                            </div>
                        ) : null}
                        <p id="validateEmail" className="nofiLogin">
                            {errorPassword}
                        </p>
                        <div style={{ marginTop: 10 }}>{button}</div>
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
                                                color: "rgb(66 82 110)",
                                                backgroundColor: "#fafafa",
                                                marginTop: 20,
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
                            {/* {switchState != "signup" ? (
                                <p className="textLogin">Can't log in?</p>
                            ) : null} */}
                            {switchState == "signup" ? (
                                <p
                                    onClick={() => onClickChangeLogin()}
                                    className="textLogin"
                                >
                                    Have an account? Login
                                </p>
                            ) : (
                                <p
                                    onClick={() => onClickChangeSignup()}
                                    className="textLogin"
                                >
                                    Sign up for an account
                                </p>
                            )}
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>
    );
}
