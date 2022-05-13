import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import Logo from "../../assets/image/logopersonal2.png";
import "./navigation.scss";
import Search from "./Search";
import { ReactComponent as CloseMenu } from "../../assets/image/x.svg";
import { ReactComponent as MenuIcon } from "../../assets/image/menu.svg";
import { useSelector } from "react-redux";
import axios from "axios";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import { getCookie, deleteCookie } from "../../utils/cookie";
import { headers, apiLogout } from "../../constants";

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

export default function Navigation() {
  const logout = async (e) => {
    e.preventDefault();
    if (getCookie("access_token") != "") {
      try {
        await axios
          .post(apiLogout, { data: "mydata" }, { headers: headers })
          .then((res) => {
            toast.success("Đăng xuất thành công");
            deleteCookie("access_token");
            setTimeout(() => {
              window.location.href = `/`;
            }, 1000);
          });
      } catch (error) {
        deleteCookie("access_token");
        return { statusCode: 500, body: error.toString() };
      }
    } else {
      window.location.href = `/`;
    }
  };
  const [click, setClick] = useState(false);
  const handleClickMobile = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [isSmall, setIsSmall] = useState(false);
  const [isScroll, setIsScroll] = useState({
    onTop: false,
  });
  const [isAuth, setIsAuth] = useState(false);
  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 500) {
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
        if (currentScrollPos > lastScrollTop && currentScrollPos > 150) {
          setIsScroll({ onTop: true });
        } else {
          setIsScroll({ onTop: false });
        }
        lastScrollTop = currentScrollPos <= 0 ? 0 : currentScrollPos;
      };
    }
  }, [isScroll]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    setIsAuth(isLogin);
    return () => {};
  }, [isLogin]);

  return (
    <div
      className="nav-container"
      style={{
        height: 140,
        top: isScroll.onTop ? -150 : 0,
        boxShadow: !isScroll.onTop
          ? "none"
          : "0 10px 10px 3px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="nav-header container-fluid">
        <div className="logo-nav">
          <div className="logo-container">
            <a href="/" title="Trang chu">
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
            style={{ marginBottom: 0 }}
          >
            <li className="option" onClick={closeMobileMenu}>
              <a href="/" className="underline">
                <i className="fas fa-home icon-btn"></i>
                Trang chủ
              </a>
            </li>
            <li className="option" onClick={closeMobileMenu}>
              <a href="/" className="underline">
                <i className="fas fa-user-cog icon-btn"></i>
                Quản lý tin
              </a>
            </li>
            <li className="option" onClick={closeMobileMenu}>
              <a href="/" className="underline">
                <i className="fas fa-bell icon-btn">
                  <div className="nofi-dot">
                    <p className="nofi-num">3</p>
                  </div>
                </i>
                Thông báo
              </a>
            </li>
            <li className="option" onClick={closeMobileMenu}>
              <a href="/chat" className="underline">
                <i className="fas fa-comments icon-btn">
                  <div className="nofi-dot">
                    <p className="nofi-num">10</p>
                  </div>
                </i>
                Tin nhắn
              </a>
            </li>
            <li className="option mobile-option" onClick={closeMobileMenu}>
              <a href="/login" className="underline">
                Đăng nhập
              </a>
            </li>
            <li className="option mobile-option" onClick={closeMobileMenu}>
              <a href="/register" className="underline">
                Đăng ký
              </a>
            </li>
          </ul>
        </div>
        <div className="mobile-menu" onClick={handleClickMobile}>
          {click ? (
            <CloseMenu className="menu-icon" />
          ) : (
            <MenuIcon className="menu-icon" />
          )}
        </div>
        {getCookie("access_token") ? (
          <div className="drop-layout-function">
            <i
              className="fas fa-ellipsis-v dot-menu-icon"
              onClick={handleClick}
            ></i>
          </div>
        ) : (
          <ul className="signin-up" style={{ marginBottom: 0 }}>
            <li className="sign-in" onClick={closeMobileMenu}>
              <a href="/login">
                <i className="fas fa-sign-in-alt icon-btn"></i>Đăng nhập
              </a>
            </li>
            <li className="signup-btn" onClick={closeMobileMenu}>
              <a href="/register">Đăng ký</a>
            </li>
          </ul>
        )}
      </div>
      <div className="bottomNav container-fluid">
        {!isSmall ? (
          <Grid container>
            <Grid item xs={8} className="searchContainer">
              <Search />
            </Grid>
            <Grid item xs={4} className="upContrainer">
              <div className="up-btn">
                <a href="/profile">
                  <i className="fas fa-user icon-btn"></i>
                  Trang cá nhân
                </a>
              </div>
              <div className="up-btn">
                <a href="/create-post">
                  <i className="fas fa-edit icon-btn"></i>Đăng bài
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
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        className="menu-container"
      >
        <Link to="/profile">
          <MenuItem className="menu-content">
            <ListItemIcon>
              <i className="fas fa-user"></i>
            </ListItemIcon>
            Trang cá nhân
          </MenuItem>
        </Link>
        <Link to="/profile">
          <MenuItem className="menu-content">
            <ListItemIcon>
              <i className="fas fa-bookmark"></i>
            </ListItemIcon>
            Sản phẩm quan tâm
          </MenuItem>
        </Link>
        <Divider style={{ height: 2 }} />
        <MenuItem className="menu-content">
          <ListItemIcon>
            <i className="fas fa-cog"></i>
          </ListItemIcon>
          Cài đặt
        </MenuItem>
        <MenuItem className="menu-content" onClick={(e) => logout(e)}>
          <ListItemIcon>
            <i className="fas fa-sign-out-alt"></i>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
