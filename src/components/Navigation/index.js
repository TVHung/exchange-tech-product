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

export default function Navigation({ isAuthenticated, setAuth }) {
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logout is successfully!");
    };

    return (
        <>
            <div className="topNav" id="myTopnav">
                <ul>
                    <li>
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
                    </li>
                    <li>
                        <a href="/" title="Trang chủ">
                            <HomeIcon style={{ paddingRight: 5 }} />
                            Trang chủ
                        </a>
                    </li>
                    <li>
                        <a href="/" title="Khám phá">
                            <DevicesIcon style={{ paddingRight: 5 }} />
                            Quản lý
                        </a>
                    </li>
                    <li>
                        <a href="/" title="Bản tin mới">
                            <NotificationsIcon style={{ paddingRight: 5 }} />
                            Thông báo
                        </a>
                    </li>
                    <li>
                        <a href="/" title="Dùng pro">
                            <ChatBubbleIcon style={{ paddingRight: 5 }} />
                            Tin nhắn
                        </a>
                    </li>
                    <li
                        style={{
                            float: "right",
                            right: 10,
                            position: "absolute",
                            marginLeft: "auto",
                        }}
                    >
                        <a href="/" title="Dùng pro">
                            <ChatBubbleIcon style={{ paddingRight: 5 }} />
                            Đăng nhập
                        </a>
                    </li>
                </ul>
            </div>
            <div id="bottomNav">
                <Search />
            </div>
        </>
    );
}
