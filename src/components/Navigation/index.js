import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import Logo from "../../assets/image/logopersonal2.png";
import "./navigation.scss";
import Search from "./Search";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import DevicesIcon from "@material-ui/icons/Devices";
import { ReactComponent as CloseMenu } from "../../assets/image/x.svg";
import { ReactComponent as MenuIcon } from "../../assets/image/menu.svg";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}

var lastScrollTop = 0;

export default function Navigation({ isAuthenticated, setAuth }) {
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logout is successfully!");
    };
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const [isSmall, setIsSmall] = useState(false);
    const [isScroll, setIsScroll] = useState({
        onTop: false,
    });
    //choose the screen size
    const handleResize = () => {
        if (window.innerWidth < 1040) {
            setIsSmall(true);
        } else {
            setIsSmall(false);
        }
    };

    // create an event listener
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            //delete listener
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.onscroll = () => {
                let currentScrollPos = window.pageYOffset;
                if (currentScrollPos > lastScrollTop) {
                    setIsScroll({ onTop: true });
                } else {
                    setIsScroll({ onTop: false });
                }
                lastScrollTop = currentScrollPos <= 0 ? 0 : currentScrollPos;
            };
        }
        console.log("cuon xuong:", isScroll.onTop);
    }, [isScroll]);

    return (
        <div
            className="nav"
            style={{
                height: 140,
                top: isScroll.onTop ? -150 : 0,
            }}
        >
            <div className="header">
                <div className="logo-nav">
                    <div className="logo-container">
                        <a
                            href="/"
                            title="Trang chu"
                            style={{
                                padding: 0,
                                margin: 20,
                                backgroundColor: "transparent",
                            }}
                        >
                            <img
                                id="logopersonal"
                                alt="logo"
                                src={Logo}
                                width="50"
                                height="50"
                            />
                        </a>
                    </div>
                    <ul
                        className={click ? "nav-options active" : "nav-options"}
                    >
                        <li className="option" onClick={closeMobileMenu}>
                            <a href="/" className="underline">
                                <HomeIcon className="icon-btn" />
                                Trang chủ
                            </a>
                        </li>
                        <li className="option" onClick={closeMobileMenu}>
                            <a href="/" className="underline">
                                <DevicesIcon className="icon-btn" />
                                Quản lý
                            </a>
                        </li>
                        <li className="option" onClick={closeMobileMenu}>
                            <a href="/" className="underline">
                                <NotificationsIcon className="icon-btn" />
                                Thông báo
                            </a>
                        </li>
                        <li className="option" onClick={closeMobileMenu}>
                            <a href="/" className="underline">
                                <ChatBubbleIcon className="icon-btn" />
                                Tin nhắn
                            </a>
                        </li>
                        <li
                            className="option mobile-option"
                            onClick={closeMobileMenu}
                        >
                            <a href="/login" className="underline">
                                Đăng nhập
                            </a>
                        </li>
                        <li
                            className="option mobile-option"
                            onClick={closeMobileMenu}
                        >
                            <a href="/login" className="underline">
                                Đăng ký
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="mobile-menu" onClick={handleClick}>
                    {click ? (
                        <CloseMenu className="menu-icon" />
                    ) : (
                        <MenuIcon className="menu-icon" />
                    )}
                </div>
                <ul className="signin-up">
                    <li className="sign-in" onClick={closeMobileMenu}>
                        <a href="/login">
                            <i className="fas fa-sign-in-alt icon-btn"></i>Đăng
                            nhập
                        </a>
                    </li>
                    <li className="signup-btn" onClick={closeMobileMenu}>
                        <a href="/login">Đăng ký</a>
                    </li>
                </ul>
            </div>
            <div className="bottomNav">
                {!isSmall ? (
                    <Grid container>
                        <Grid item xs={8} className="searchContainer">
                            <Search />
                        </Grid>
                        <Grid item xs={4} className="upContrainer">
                            <div className="up-btn">
                                <a href="/">
                                    <i className="fas fa-user icon-btn"></i>
                                    Trang cá nhân
                                </a>
                            </div>
                            <div className="up-btn">
                                <a href="/">
                                    <i className="fas fa-edit icon-btn"></i>Đăng
                                    bài
                                </a>
                            </div>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container>
                        <Grid item xs={12} className="searchContainer">
                            <Search />
                        </Grid>
                    </Grid>
                )}
            </div>
        </div>
    );
}
