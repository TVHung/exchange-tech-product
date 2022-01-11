import React, { useState, useEffect } from "react";
import "./_detail.scss";
import Preloading from "../../components/Loading";
import SlideDetail from "../../components/SlideShow/SlideDetail";
import { formatPrice } from "../../utils/common";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailIcon,
  EmailShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import imgTest1 from "../../assets/image/imgtest.png";
import imgTest2 from "../../assets/image/imageTest2.jpg";
import avt from "../../assets/image/avt.jpg";
import ListItem from "./../../components/ListItem";
import StarRatings from "react-star-ratings";
import CheckMark from "../../components/CheckMark";
import iphone1 from "../../assets/image/iphone-13-hong.jpg";
import iphone2 from "../../assets/image/iPhone-13-mau-hong-jpeg-7940-1622557449.jpg";
import iphone3 from "../../assets/image/iphone-13.jpg";

const dataSlides = [
  {
    id: 1,
    tite: "We are team ssv",
    bio: "Blog chia sẻ về những thông tin của nhóm và những kiến thức bổ ích khác",
    image: iphone1,
  },
  {
    id: 2,
    tite: "We are team ssv",
    bio: "Blog chia sẻ về những thông tin của nhóm và những kiến thức bổ ích khác",
    image: iphone2,
  },
  {
    id: 3,
    tite: "We are team ssv",
    bio: "Blog chia sẻ về những thông tin của nhóm và những kiến thức bổ ích khác",
    image: iphone3,
  },
];

const dataList = [
  {
    id: 0,
    image: imgTest1,
    nameProduct: "Lenovo IdeaPad 3 15 (Intel Gen 11)",
    infor:
      "Vi xử lý: Intel Core i5 11400H, 6 nhân / 12 luồng Màn hình: 15.6 FullHD IPS 144Hz (1920 x 1080), màn nhám Độ phủ màu: 65% sRGB",
    favorite: false,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 1,
    image: imgTest2,
    nameProduct: "Levevo ideapad gaming 3",
    infor: "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: true,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 2,
    image: imgTest1,
    nameProduct: "Lenovo IdeaPad 3 15 (Intel Gen 11)",
    infor: "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: false,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 3,
    image: imgTest2,
    nameProduct: "Levevo ideapad gaming 3",
    infor: "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: false,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 4,
    image: imgTest1,
    nameProduct: "Lenovo IdeaPad 3 15 (Intel Gen 11)",
    infor: "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: true,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 5,
    image: imgTest2,
    nameProduct: "Levevo ideapad gaming 3",
    infor: "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: false,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
];

export default function Detail() {
  const [preload, setPreload] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [stateCopy, setStateCopy] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPreload(true);
    }, 500);
    return () => {};
  }, []);

  const changeFavorite = () => {
    setFavorite(!favorite);
  };
  const changeRating = () => {
    setFavorite(!favorite);
  };
  const toProfile = () => {
    window.location.href = "/profile";
  };
  const toChat = () => {
    window.location.href = "/chat";
  };
  const onClickCopyLink = (s) => {
    navigator.clipboard.writeText(window.location.href);
    setStateCopy(true);
  };

  return (
    <div className="detail-container">
      {!preload ? (
        <Preloading />
      ) : (
        <>
          <div className="detail-bread-crumb">
            <ul>
              <li>
                <a href="/">Điện thoại</a>
              </li>
              <li>
                &nbsp;<i className="fas fa-angle-double-right"></i>&nbsp;
                <a href="/">Iphone</a>
              </li>
              <li>
                &nbsp;<i className="fas fa-angle-double-right"></i>&nbsp;
                <a href="/">Iphone 13 promax</a>
              </li>
            </ul>
          </div>
          <div className="row">
            <div className="col-sm-12 col-lg-8">
              <div className="detail-left">
                <div className="detail-left-image">
                  <SlideDetail dataSlides={dataSlides} />
                  <div className="detail-time-createat">
                    <p>Bài đăng cách đây 5 phút</p>
                  </div>
                </div>
                <div className="detail-left-content">
                  <h4>Iphone 13 promax xanh ngọc</h4>
                  <p>Giá: {formatPrice(15000000)}đ</p>
                  <div
                    className="detail-favorite-heart"
                    onClick={() => changeFavorite()}
                  >
                    <i
                      className="fas fa-heart"
                      style={{ color: favorite ? "grey" : "red" }}
                    ></i>
                  </div>
                </div>
                <div className="detail-left-description">
                  <p>
                    Sản phẩm mua ở shopee cách đây 8 tháng còn bảo hành đến
                    tháng 1 năm 2023
                  </p>
                </div>
                <div className="detail-properties">
                  <div className="row">
                    <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                      <i className="fas fa-tags"></i>
                      <span>Hãng: Apple</span>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                      <i className="fas fa-tags"></i>
                      <span>Tình trạng: Mới</span>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                      <i className="fas fa-tags"></i>
                      <span>Màu sắc: Apple</span>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                      <i className="fas fa-tags"></i>
                      <span>Màu sắc: Apple</span>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                      <i className="fas fa-tags"></i>
                      <span>Màu sắc: Apple</span>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                      <i className="fas fa-tags"></i>
                      <span>Màu sắc: Apple</span>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                      <i className="fas fa-tags"></i>
                      <span>Màu sắc: Apple</span>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                      <i className="fas fa-tags"></i>
                      <span>Màu sắc: Apple</span>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                      <i className="fas fa-tags"></i>
                      <span>Màu sắc: Apple</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-lg-4">
              <div className="detail-right">
                <div className="detail-user-profile">
                  <img src={avt} alt="avt" />
                  <p>Trương Hùng</p>
                  <div className="view-profile-seller">
                    <button
                      onClick={() => toProfile()}
                      className="btn btn-outline"
                    >
                      Xem trang
                    </button>
                  </div>
                </div>
                <div className="detail-seller-reviews">
                  <div className="row">
                    <div className="col-6 detail-time-join">
                      <p>Tham gia</p>
                      <p>1 tháng trước</p>
                    </div>
                    <div className="col-6 detail-rating">
                      <p>Đánh giá</p>
                      <div className="detail-seller-rating">
                        <StarRatings
                          starRatedColor="#fcbb00"
                          rating={4}
                          changeRating={() => changeRating()}
                          numberOfStars={5}
                          name="rating"
                          starDimension="20px"
                          starSpacing="2px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="detail-contact-seller">
                  <p>Địa chỉ: Yên Phụ, Yên Phong, Bắc Ninh</p>
                  <p>Số điện thoại: 0936269016</p>
                </div>
                <div className="detail-chat-seller">
                  <button className="btn" onClick={() => toChat()}>
                    Chat với người bán
                  </button>
                </div>
                <div className="detail-share">
                  <p>Chia sẻ cho mọi người</p>
                  <FacebookShareButton
                    url={window.location.href}
                    quote={document.title}
                    hashtag="#texchange"
                    className="socialMediaButton"
                  >
                    <FacebookIcon size={40} round={true} />
                  </FacebookShareButton>
                  <EmailShareButton
                    url={window.location.href}
                    quote={document.title}
                    hashtag="#texchange"
                    className="socialMediaButton"
                  >
                    <EmailIcon size={40} round={true} />
                  </EmailShareButton>
                  <FacebookMessengerShareButton
                    url={window.location.href}
                    quote={document.title}
                    hashtag="#texchange"
                    className="socialMediaButton"
                  >
                    <FacebookMessengerIcon size={40} round={true} />
                  </FacebookMessengerShareButton>
                  <TwitterShareButton
                    url={window.location.href}
                    quote={document.title}
                    hashtag="#texchange"
                    className="socialMediaButton"
                  >
                    <TwitterIcon size={40} round={true} />
                  </TwitterShareButton>
                  <TelegramShareButton
                    url={window.location.href}
                    quote={document.title}
                    hashtag="#texchange"
                    className="socialMediaButton"
                  >
                    <TelegramIcon size={40} round={true} />
                  </TelegramShareButton>
                  <button
                    className="btn copy-link-btn"
                    onClick={() => onClickCopyLink()}
                  >
                    <i className="fas fa-link"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="related-products">
            <h3>Sản phẩm liên quan</h3>
            <ListItem dataList={dataList} />
          </div>
          <div className="copy-check-mark">
            <CheckMark stateCopy={stateCopy} setStateCopy={setStateCopy} />
          </div>
        </>
      )}
    </div>
  );
}
