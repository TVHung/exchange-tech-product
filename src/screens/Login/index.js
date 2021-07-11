import React, { useState, useCallback } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignIn({ setAuth }) {
    const classes = useStyles();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleOnChange = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        console.log(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5000/login", user)
            .then((res) => {
                console.log(res);
                const token = res.data.token;
                if (token) {
                    localStorage.setItem("token", token);
                    setAuth(true);
                    toast.success("Login successfully!");
                } else {
                    setAuth(false);
                    toast.error("Email or password iscorrect!");
                }
            })
            .catch((error) => {
                toast.error(error.message);
                console.error(error);
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
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
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => handleOnChange(e)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e) => handleSubmit(e)}
                    >
                        Login
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/register" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/register">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Facebook
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                            >
                                Google
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
