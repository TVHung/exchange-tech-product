import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import Logo from "../../assets/image/logopersonal2.png";
import "./navigation.scss";
import Search from "./Search";
import { ReactComponent as CloseMenu } from "../../assets/image/x.svg";
import { ReactComponent as MenuIcon } from "../../assets/image/menu.svg";

import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Settings from "@material-ui/icons/Settings";
// import Logout from "@material-ui/icons/Logout";
import DropdownNofi from "./../DropdownNofi";

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
  const handleClickMobile = () => setClick(!click);
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
      <div className="nav-header">
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
          <ul className={click ? "nav-options active" : "nav-options"}>
            <li className="option" onClick={closeMobileMenu}>
              <a href="/" className="underline">
                <i className="fas fa-home icon-btn"></i>
                Trang chủ
              </a>
            </li>
            <li className="option" onClick={closeMobileMenu}>
              <a href="/" className="underline">
                <i className="fas fa-user-cog icon-btn"></i>
                Quản lý
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
        <ul className="signin-up">
          <li className="sign-in" onClick={closeMobileMenu}>
            <a href="/login">
              <i className="fas fa-sign-in-alt icon-btn"></i>Đăng nhập
            </a>
          </li>
          <li className="signup-btn" onClick={closeMobileMenu}>
            <a href="/register">Đăng ký</a>
          </li>
        </ul>
        {/* <div className="drop-layout-function">
          <i
            className="fas fa-ellipsis-v dot-menu-icon"
            onClick={handleClick}
          ></i>
        </div> */}
      </div>
      <div className="bottomNav">
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
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
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
        <MenuItem className="menu-content">
          <Avatar className="menu-icon-btn" /> Profile
        </MenuItem>
        <MenuItem className="menu-content">
          <Avatar className="menu-icon-btn" /> My account
        </MenuItem>
        <MenuItem className="menu-content">
          <Avatar className="menu-icon-btn" /> My favorite
        </MenuItem>
        <Divider />
        <MenuItem className="menu-content">
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem className="menu-content">
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem className="menu-content">
          <ListItemIcon>
            <i class="fas fa-sign-out-alt"></i>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
