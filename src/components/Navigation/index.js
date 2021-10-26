import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

    return (
        <>
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
                            <a href="/">
                                <HomeIcon style={{ paddingRight: 5 }} />
                                Trang chủ
                            </a>
                        </li>
                        <li className="option" onClick={closeMobileMenu}>
                            <a href="/">
                                <DevicesIcon style={{ paddingRight: 5 }} />
                                Quản lý
                            </a>
                        </li>
                        <li className="option" onClick={closeMobileMenu}>
                            <a href="/">
                                <NotificationsIcon
                                    style={{ paddingRight: 5 }}
                                />
                                Thông báo
                            </a>
                        </li>
                        <li className="option" onClick={closeMobileMenu}>
                            <a href="/">
                                <ChatBubbleIcon style={{ paddingRight: 5 }} />
                                Tin nhắn
                            </a>
                        </li>
                        <li
                            className="option mobile-option"
                            onClick={closeMobileMenu}
                        >
                            <a href="/">Đăng nhập</a>
                        </li>
                        <li
                            className="option mobile-option"
                            onClick={closeMobileMenu}
                        >
                            <a href="/" className="sign-up">
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
                        <a href="/">Đăng nhập</a>
                    </li>
                    <li className="sign-in" onClick={closeMobileMenu}>
                        <a href="/">Đăng ký</a>
                    </li>
                </ul>
            </div>
            <div id="bottomNav">
                <Search />
            </div>
        </>
    );
}
