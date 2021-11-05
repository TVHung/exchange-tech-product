import React, { useState, useEffect } from "react";
import "./accountInfor.scss";
import { Grid, Button, TextField } from "@material-ui/core";
import avt from "../../../assets/image/avt.jpg";
import { Link } from "react-router-dom";

export default function AccountInfor() {
  return (
    <div className="account-container">
      <div className="account-infor">
        <h2>Thông tin người dùng</h2>
        <div className="account-infor-content">
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              className="account-infor-content-detail-left"
            >
              <Grid container>
                <Grid item xs={4}>
                  <img src={avt} alt="avt" className="account-avatar" />
                </Grid>
                <Grid item xs={8}>
                  <h3 style={{ marginTop: 0 }}>Truong Hung</h3>
                  <div>
                    <span>
                      <span className="account-followed">
                        <b>1000</b> Người theo dõi
                      </span>
                      <span className="account-following">
                        <b>1</b> Đang theo dõi
                      </span>
                    </span>
                  </div>
                  <Link to="/profile/edit">
                    <Button className="account-edit-button">
                      Chỉnh sửa thông tin <i className="fas fa-user-edit"></i>
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              className="account-infor-content-detail-right"
            >
              <div className="account-detail">
                <ul>
                  <li>
                    <i className="fas fa-star"></i>
                    <b>Đánh giá: </b>
                    <span className="infor-detail">1000 sao</span>
                  </li>
                  <li>
                    <i className="fas fa-address-book"></i>
                    <b>Địa chỉ: </b>
                    <span className="infor-detail">
                      Đức Lân, Yên Phụ, Yên Phong, Bắc Ninh
                    </span>
                  </li>
                  <li>
                    <i className="fas fa-calendar-day"></i>
                    <b>Ngày tham gia: </b>
                    <span className="infor-detail">13/09/1999</span>
                  </li>
                  <li>
                    <i className="fas fa-comment-dots"></i>
                    <b>Phản hồi: </b>
                    <span className="infor-detail">Trong 1 giờ</span>
                  </li>
                  <li>
                    <i className="fas fa-check-circle"></i>
                    <b>Kết nối: </b>
                    <span className="infor-detail">
                      <i className="fab fa-facebook social-icon"></i>
                      <i className="fab fa-twitter social-icon"></i>
                      <i className="fab fa-google-plus-g social-icon"></i>
                      <i className="fab fa-instagram social-icon"></i>
                    </span>
                  </li>
                </ul>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="account-password">
        <h2>Thay đổi mật khẩu</h2>
        <div className="account-password-content">
          <Grid container>
            <Grid item xs={12} md={6} className="account-password-left-top">
              <h3>Nhập mật khẩu cũ</h3>
              <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="Nhập mật khẩu cũ"
                className="text-input"
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              className="account-password-right-top"
            ></Grid>
            <Grid item xs={12} md={6} className="account-password-left-bottom">
              <h3>Nhập mật khẩu mới</h3>
              <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="Nhập mật khẩu mới"
                className="text-input"
              />
            </Grid>
            <Grid item xs={12} md={6} className="account-password-right-bottom">
              <h3>Nhập lại mật khẩu mới</h3>
              <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="Nhập lại mật khẩu mới"
                className="text-input"
              />
            </Grid>
            <Grid item xs={12} className="account-password-button">
              <Button className="account-password-update-button">
                Cập nhật <i class="fas fa-save"></i>
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
