import React from "react";
import "./footer.scss";

function Footer() {
  return (
    <footer className="text-center text-white footer-container">
      <div className="container-fluid p-4">
        <section className="mb-4">
          <a
            className="btn btn-primary btn-floating m-1 icon-social-footer"
            style={{ backgroundColor: "#3b5998" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            className="btn btn-primary btn-floating m-1 icon-social-footer"
            style={{ backgroundColor: "#55acee" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            className="btn btn-primary btn-floating m-1 icon-social-footer"
            style={{ backgroundColor: "#dd4b39" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-google"></i>
          </a>
          <a
            className="btn btn-primary btn-floating m-1 icon-social-footer"
            style={{ backgroundColor: "#ac2bac" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            className="btn btn-primary btn-floating m-1 icon-social-footer"
            style={{ backgroundColor: "#0082ca" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            className="btn btn-primary btn-floating m-1 icon-social-footer"
            style={{ backgroundColor: "#333333" }}
            href="#!"
            role="button"
          >
            <i className="fab fa-github"></i>
          </a>
        </section>

        <section className="">
          <form action="">
            <div className="row d-flex justify-content-center">
              <div className="col-auto">
                <p className="pt-2">
                  <strong>Đăng kí để nhận những thông tin mới nhất</strong>
                </p>
              </div>

              <div className="col-md-5 col-12">
                <div className="form-outline form-white mb-4">
                  <input
                    type="email"
                    id="form5Example21"
                    className="form-control"
                  />
                  <label className="form-label mt-1" htmlFor="form5Example21">
                    Địa chỉ email của bạn
                  </label>
                </div>
              </div>

              <div className="col-auto">
                <button type="submit" className="btn btn-outline-light mb-4">
                  Subscribe
                </button>
              </div>
            </div>
          </form>
        </section>

        <section className="mb-4">
          <p>Texchange giúp bạn mua sắm trở lên tiết kiệm hơn</p>
        </section>

        <section className="">
          <div className="row">
            <div className="col-lg-4 col-xs-12 mb-md-0 mb-2">
              <h5 className="text-uppercase">Hỗ trợ khách hàng</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-white">
                    Trung tâm trợ giúp
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    An toàn mua bán
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Quy định cần biết
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Quy chế quyền riêng tư
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Liên hệ hỗ trợ
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-xs-12 mb-md-0 mb-2">
              <h5 className="text-uppercase">Về chợ công nghệ</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-white">
                    Giới thiệu
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Tuyển dụng
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Truyền thông
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-xs-12 mb-md-0 mb-2">
              <h5 className="text-uppercase">Liên kết</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-white">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Tiktok
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      <div className="text-center p-3 no-copyright">
        <p style={{ color: "white" }}>
          @2021 - Truong Hung. All Right Reserved. Designed and Developed by
          <a
            href="https://www.facebook.com/hung.tv99"
            rel="name noreferrer"
            target="_blank"
            style={{ color: "#0abfd2", textDecoration: "none" }}
          >
            &nbsp;Truong Hung
          </a>
        </p>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
