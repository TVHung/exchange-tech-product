import { Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import "./footer.scss";

function Footer() {
  return (
    <Grid container id="footer">
      <hr style={{ width: "100%" }} />
      <Grid item xs={12} sm={4} className="support">
        <span>
          <h3>Hỗ trợ khách hàng</h3>
          <ul>
            <li>
              <a href="/">Trung tâm trợ giúp</a>
            </li>
            <li>
              <a href="/">An toàn mua bán</a>
            </li>
            <li>
              <a href="/">Quy định cần biết</a>
            </li>
            <li>
              <a href="/">Quy chế quyền riêng tư</a>
            </li>
            <li>
              <a href="/">Liên hệ hỗ trợ</a>
            </li>
          </ul>
        </span>
      </Grid>
      <Grid item xs={12} sm={4} className="support">
        <span>
          <h3>Về chợ công nghệ</h3>
          <ul>
            <li>
              <a href="/">Giới thiệu</a>
            </li>
            <li>
              <a href="/">Tuyển dụng</a>
            </li>
            <li>
              <a href="/">Truyền thông</a>
            </li>
            <li>
              <a href="/">Blog</a>
            </li>
          </ul>
        </span>
      </Grid>
      <Grid item xs={12} sm={4} className="support">
        <span>
          <h3>Liên kết</h3>
          <ul>
            <li style={{ float: "left" }}>
              <a href="/">
                <FacebookIcon fontSize="large" />
              </a>
            </li>
            <li style={{ float: "left" }}>
              <a href="/">
                <InstagramIcon fontSize="large" />
              </a>
            </li>
            <li style={{ float: "left" }}>
              <a href="/">
                <TwitterIcon fontSize="large" />
              </a>
            </li>
          </ul>
        </span>
      </Grid>
      <hr style={{ width: "80%" }} />
      <Grid item xs={12} id="nocopyright">
        <p style={{ color: "white" }}>
          @2021 - Truong Hung. All Right Reserved. Designed and Developed by
          <a
            href="https://www.facebook.com/hung.tv99"
            rel="name noreferrer"
            target="_blank"
            style={{ color: "coral", textDecoration: "none" }}
          >
            &nbsp;Truong Hung
          </a>
        </p>
      </Grid>
    </Grid>
  );
}

export default React.memo(Footer);
