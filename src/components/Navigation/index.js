import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { toast } from "react-toastify";

export default function Navigation({ isAuthenticated, setAuth }) {
    const classes = useStyles();

    useEffect(() => {
        console.log("isAuthenticated", isAuthenticated);
    });

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logout is successfully!");
    };

    return (
        <nav className={classes.container}>
            <Grid container className={classes.gridContainer}>
                <Grid item xs={2}>
                    <Link to="/" className={classes.linkStyle}>
                        <h3>Logo</h3>
                    </Link>
                </Grid>
                <Grid item xs={10}>
                    <ul className={classes.ul}>
                        <li className={classes.li}>
                            <Link to="/" className={classes.linkStyle}>
                                Home
                            </Link>
                        </li>
                        <li className={classes.li}>
                            <Link to="/service" className={classes.linkStyle}>
                                Service
                            </Link>
                        </li>
                        <li className={classes.li}>
                            <Link to="/about" className={classes.linkStyle}>
                                About
                            </Link>
                        </li>
                        {!isAuthenticated ? (
                            <li className={classes.li}>
                                <Link to="/login" className={classes.linkStyle}>
                                    Login
                                </Link>
                            </li>
                        ) : null}
                        {!isAuthenticated ? (
                            <li className={classes.li}>
                                <Link
                                    to="/register"
                                    className={classes.linkStyle}
                                >
                                    Sign in
                                </Link>
                            </li>
                        ) : null}

                        <li className={classes.li}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={(e) => logout(e)}
                            >
                                Logout
                            </Button>
                        </li>
                    </ul>
                </Grid>
            </Grid>
        </nav>
    );
}
