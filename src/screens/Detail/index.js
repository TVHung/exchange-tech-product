import React, { useState, useEffect } from "react";
import "./_detail.scss";
import Preloading from "../../components/Loading";
import SlideDetail from "../../components/SlideShow/SlideDetail";
import { formatPrice, handleCalculateTime } from "../../utils/common";
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
import ListItem from "./../../components/ListItemRecommend";
import StarRatings from "react-star-ratings";
import CheckMark from "../../components/CheckMark";
import { apiFetchPostDetail, apiGetUser, headers } from "../../constants";
import axios from "axios";
import Breadcrumb from "../../components/Breadcrumb";
import { gameBreadcrumb } from "../../constants/breadcrumData";
import { useParams } from "react-router-dom";

const dataList = [
  {
    id: 1,
    user_id: 1,
    is_trade: 0,
    post_trade_id: 2,
    title: "day la san pham 1",
    category_id: 1,
    category: "Mobile",
    name: "Iphone 13",
    description:
      "Vi xử lý: Intel Core i5 11400H, 6 nhân / 12 luồng Màn hình: 15.6 FullHD IPS 144Hz (1920 x 1080), màn nhám Độ phủ màu: 65% sRGB",
    ram: 6,
    storage: 64,
    status: "Mới",
    price: "400000",
    address: "Minh khai, Hai bà trưng, Hà nội",
    public_status: 1,
    guarantee: 2,
    images: [
      {
        id: 1,
        is_banner: 1,
        image_url:
          "https://media.vneconomy.vn/w800/images/upload/2021/12/29/iphone-13-pro-max.jpg",
        post_id: 1,
        created_at: null,
        updated_at: null,
      },
      {
        id: 2,
        is_banner: 0,
        image_url:
          "https://bachlongmobile.com/bnews/wp-content/uploads/2021/09/tren-tay-thuc-te-iphone-13-pro-max-819x1024.jpg",
        post_id: 1,
        created_at: null,
        updated_at: null,
      },
      {
        id: 3,
        is_banner: 0,
        image_url:
          "https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/uploads/images/tin-tuc/138687/Originals/Tren-tay-iphone-13-mini-2.jpg",
        post_id: 1,
        created_at: null,
        updated_at: null,
      },
    ],
    created_at: "2022-02-08T17:07:15.000000Z",
    updated_at: null,
  },
  {
    id: 2,
    user_id: 1,
    is_trade: 0,
    post_trade_id: 2,
    title: "day la san pham 2",
    category_id: 1,
    category: "Mobile",
    name: "Iphone 14",
    description:
      "Vi xử lý: Intel Core i5 11400H, 6 nhân / 12 luồng Màn hình: 15.6 FullHD IPS 144Hz (1920 x 1080), màn nhám Độ phủ màu: 65% sRGB",
    ram: 6,
    storage: 64,
    status: "Mới",
    price: "400000",
    address: "Minh khai, Hai bà trưng, Hà nội",
    public_status: 1,
    guarantee: 2,
    images: [
      {
        id: 4,
        is_banner: 1,
        image_url:
          "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/10/19/637702682508615222_macbook-pro-16-2021-xam-1.jpg",
        post_id: 2,
        created_at: null,
        updated_at: null,
      },
      {
        id: 5,
        is_banner: 0,
        image_url:
          "https://static.remove.bg/remove-bg-web/d450d501f6500a09e72d0e306a5d62768359d9fa/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png",
        post_id: 2,
        created_at: null,
        updated_at: null,
      },
      {
        id: 6,
        is_banner: 0,
        image_url:
          "http://www.maccenter.vn/Adv_Images/Banner-MacBookPro-2021-1.jpg",
        post_id: 2,
        created_at: null,
        updated_at: null,
      },
    ],
    created_at: "2022-02-08T17:07:15.000000Z",
    updated_at: null,
  },
  {
    id: 3,
    user_id: 1,
    is_trade: 0,
    post_trade_id: 2,
    title: "day la san pham 3",
    category_id: 1,
    category: "Mobile",
    name: "Iphone 15",
    description:
      "Vi xử lý: Intel Core i5 11400H, 6 nhân / 12 luồng Màn hình: 15.6 FullHD IPS 144Hz (1920 x 1080), màn nhám Độ phủ màu: 65% sRGB",
    ram: 6,
    storage: 64,
    status: "Mới",
    price: "8200000",
    address: "Minh khai, Hai bà trưng, Hà nội",
    public_status: 1,
    guarantee: 2,
    images: [
      {
        id: 7,
        is_banner: 1,
        image_url:
          "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/10/19/637702682508615222_macbook-pro-16-2021-xam-1.jpg",
        post_id: 3,
        created_at: null,
        updated_at: null,
      },
      {
        id: 8,
        is_banner: 0,
        image_url:
          "https://static.remove.bg/remove-bg-web/d450d501f6500a09e72d0e306a5d62768359d9fa/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png",
        post_id: 3,
        created_at: null,
        updated_at: null,
      },
      {
        id: 9,
        is_banner: 0,
        image_url:
          "http://www.maccenter.vn/Adv_Images/Banner-MacBookPro-2021-1.jpg",
        post_id: 3,
        created_at: null,
        updated_at: null,
      },
    ],
    created_at: "2022-02-08T17:07:15.000000Z",
    updated_at: null,
  },
  {
    id: 4,
    user_id: 1,
    is_trade: 0,
    post_trade_id: 2,
    title: "day la san pham 4",
    category_id: 2,
    category: "Laptop",
    name: "Iphone 13",
    description:
      "Vi xử lý: Intel Core i5 11400H, 6 nhân / 12 luồng Màn hình: 15.6 FullHD IPS 144Hz (1920 x 1080), màn nhám Độ phủ màu: 65% sRGB",
    ram: 6,
    storage: 64,
    status: "Mới",
    price: "2900000",
    address: "Minh khai, Hai bà trưng, Hà nội",
    public_status: 1,
    guarantee: 2,
    images: [
      {
        id: 10,
        is_banner: 1,
        image_url:
          "https://media.vneconomy.vn/w800/images/upload/2021/12/29/iphone-13-pro-max.jpg",
        post_id: 4,
        created_at: null,
        updated_at: null,
      },
      {
        id: 11,
        is_banner: 0,
        image_url:
          "https://bachlongmobile.com/bnews/wp-content/uploads/2021/09/tren-tay-thuc-te-iphone-13-pro-max-819x1024.jpg",
        post_id: 4,
        created_at: null,
        updated_at: null,
      },
      {
        id: 12,
        is_banner: 0,
        image_url:
          "https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/uploads/images/tin-tuc/138687/Originals/Tren-tay-iphone-13-mini-2.jpg",
        post_id: 4,
        created_at: null,
        updated_at: null,
      },
    ],
    created_at: "2022-02-08T17:07:15.000000Z",
    updated_at: null,
  },
  {
    id: 5,
    user_id: 1,
    is_trade: 1,
    post_trade_id: 2,
    title: "day la san pham 5",
    category_id: 2,
    category: "Laptop",
    name: "Iphone 14",
    description:
      "Vi xử lý: Intel Core i5 11400H, 6 nhân / 12 luồng Màn hình: 15.6 FullHD IPS 144Hz (1920 x 1080), màn nhám Độ phủ màu: 65% sRGB",
    ram: 6,
    storage: 64,
    status: "Mới",
    price: "9900000",
    address: "Minh khai, Hai bà trưng, Hà nội",
    public_status: 1,
    guarantee: 2,
    images: [
      {
        id: 13,
        is_banner: 1,
        image_url:
          "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/10/19/637702682508615222_macbook-pro-16-2021-xam-1.jpg",
        post_id: 5,
        created_at: null,
        updated_at: null,
      },
      {
        id: 14,
        is_banner: 0,
        image_url:
          "https://static.remove.bg/remove-bg-web/d450d501f6500a09e72d0e306a5d62768359d9fa/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png",
        post_id: 5,
        created_at: null,
        updated_at: null,
      },
      {
        id: 15,
        is_banner: 0,
        image_url:
          "http://www.maccenter.vn/Adv_Images/Banner-MacBookPro-2021-1.jpg",
        post_id: 5,
        created_at: null,
        updated_at: null,
      },
    ],
    created_at: "2022-02-08T17:07:15.000000Z",
    updated_at: null,
  },
  {
    id: 6,
    user_id: 1,
    is_trade: 1,
    post_trade_id: 2,
    title: "day la san pham 6",
    category_id: 2,
    category: "Laptop",
    name: "Iphone 15",
    description:
      "Vi xử lý: Intel Core i5 11400H, 6 nhân / 12 luồng Màn hình: 15.6 FullHD IPS 144Hz (1920 x 1080), màn nhám Độ phủ màu: 65% sRGB",
    ram: 6,
    storage: 64,
    status: "Mới",
    price: "4400000",
    address: "Yên Phụ, Yên Phong, Bắc Ninh",
    public_status: 1,
    guarantee: 2,
    images: [
      {
        id: 16,
        is_banner: 1,
        image_url:
          "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/10/19/637702682508615222_macbook-pro-16-2021-xam-1.jpg",
        post_id: 6,
        created_at: null,
        updated_at: null,
      },
      {
        id: 17,
        is_banner: 0,
        image_url:
          "https://static.remove.bg/remove-bg-web/d450d501f6500a09e72d0e306a5d62768359d9fa/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png",
        post_id: 6,
        created_at: null,
        updated_at: null,
      },
      {
        id: 18,
        is_banner: 0,
        image_url:
          "http://www.maccenter.vn/Adv_Images/Banner-MacBookPro-2021-1.jpg",
        post_id: 6,
        created_at: null,
        updated_at: null,
      },
    ],
    created_at: "2022-02-08T17:07:15.000000Z",
    updated_at: null,
  },
];

export default function Detail() {
  const [preload, setPreload] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [stateCopy, setStateCopy] = useState(false);
  const [postDetail, setPostDetail] = useState({});
  const [postUser, setPostUser] = useState({});
  const params = useParams();

  useEffect(() => {
    fetchAllData(params.id);
    return () => {};
  }, [params.id]);

  const changeFavorite = () => {
    setFavorite(!favorite);
  };
  const changeRating = () => {
    setFavorite(!favorite);
  };
  const toProfile = (user_id) => {
    window.location.href = "/profile";
  };
  const toChat = () => {
    window.location.href = "/chat";
  };
  const onClickCopyLink = (s) => {
    navigator.clipboard.writeText(window.location.href);
    setStateCopy(true);
  };

  useEffect(() => {
    return () => {
      setPostDetail({});
      setPreload(false);
    };
  }, []);

  const fetchAllData = async (postId) => {
    let apiPostDetail = `${apiFetchPostDetail}/${postId}`;
    const requestPost = axios.get(apiPostDetail);

    await axios
      .all([requestPost])
      .then(
        axios.spread((...responses) => {
          const post = responses[0].data.data;
          console.log("post", post);
          setPostDetail(post);
          fetchUserPost(post.user_id);
        })
      )
      .catch((errors) => {
        console.error(errors);
      });
  };

  const fetchUserPost = async (user_id) => {
    try {
      await axios
        .get(`${apiGetUser}/${user_id}`, {
          headers: headers,
        })
        .then((res) => {
          const userPost = res.data.data;
          setPostUser(userPost);
          setPreload(true);
          console.log("id", userPost);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="detail-container container">
      {!preload ? (
        <Preloading />
      ) : (
        <>
          <Breadcrumb arrLink={gameBreadcrumb} />
          <div className="row">
            <div className="col-sm-12 col-lg-8">
              <div className="detail-left">
                <div className="detail-left-image">
                  <SlideDetail dataSlides={postDetail.images} />
                  <div className="detail-time-createat">
                    <p>
                      Bài đăng cách đây{" "}
                      {handleCalculateTime(postDetail.created_at)}
                    </p>
                  </div>
                </div>
                <div className="detail-left-content">
                  <h4>{postDetail.name}</h4>
                  <p>Giá: {formatPrice(postDetail.price)}đ</p>
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
                  <p>{postDetail.description}</p>
                </div>
                <div className="detail-properties">
                  <div className="row">
                    {/* common */}
                    {postDetail.ram && (
                      <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                        <i className="fas fa-memory"></i>
                        <span>Ram: {postDetail.ram}GB</span>
                      </div>
                    )}
                    {postDetail.storage && (
                      <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                        <i className="fas fa-tags"></i>
                        <span>Dung lượng: {postDetail.storage}GB</span>
                      </div>
                    )}
                    {postDetail.status && (
                      <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                        <i className="fas fa-microchip"></i>
                        <span>Tình trạng: {postDetail.status}</span>
                      </div>
                    )}
                    {postDetail.guarantee && (
                      <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                        <i className="fas fa-hdd"></i>
                        <span>Bảo hành: {postDetail.guarantee} Tháng</span>
                      </div>
                    )}
                    {/* mobile */}
                    {postDetail.postMobiles.length === 1 && (
                      <>
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-tags"></i>
                          <span>
                            Hãng: {postDetail.postMobiles[0].brand_id}
                          </span>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-tags"></i>
                          <span>
                            Màu sắc: {postDetail.postMobiles[0].color}
                          </span>
                        </div>
                      </>
                    )}
                    {/* laptop */}
                    {postDetail.postLaptops.length === 1 && (
                      <>
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-tags"></i>
                          <span>
                            Hãng: {postDetail.postLaptops[0].brand_id}
                          </span>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-tags"></i>
                          <span>
                            Màu sắc: {postDetail.postLaptops[0].color}
                          </span>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-microchip"></i>
                          <span>CPU: {postDetail.postLaptops[0].cpu}</span>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-microchip"></i>
                          <span>GPU: {postDetail.postLaptops[0].gpu}</span>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-hdd"></i>
                          <span>
                            Loại ổ cứng:{" "}
                            {postDetail.postLaptops[0].storage_type}
                          </span>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-hdd"></i>
                          <span>
                            Màn hình: {postDetail.postLaptops[0].display_size}
                          </span>
                        </div>
                      </>
                    )}
                    {/* pc */}
                    {postDetail.postPcs.length === 1 && (
                      <>
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-microchip"></i>
                          <span>CPU: {postDetail.postPcs[0].cpu}</span>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-microchip"></i>
                          <span>GPU: {postDetail.postPcs[0].gpu}</span>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-hdd"></i>
                          <span>
                            Loại ổ cứng: {postDetail.postPcs[0].storage_type}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <hr />
              {postDetail.is_trade == 1 ? (
                <div className="detail-left">
                  <div className="detail-left-content">
                    <h3>Sản phẩm mong muốn được đổi qua</h3>
                    <h4>Iphone 12 promax</h4>
                  </div>
                  <div className="detail-left-description">
                    <p>Sản phẩm yêu cầu còn mới, không móp méo</p>
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
                        <i className="fas fa-microchip"></i>
                        <span>CPU: I7</span>
                      </div>
                      <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                        <i className="fas fa-memory"></i>
                        <span>Ram: 32gb</span>
                      </div>
                      <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                        <i className="fas fa-tags"></i>
                        <span>Màu sắc: Apple</span>
                      </div>
                      <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                        <i className="fas fa-hdd"></i>
                        <span>Loại ổ cứng: HDD</span>
                      </div>
                      <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                        <i className="fas fa-palette"></i>
                        <span>Màu sắc: Vàng</span>
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
              ) : null}
            </div>
            <div className="col-sm-12 col-lg-4">
              <div className="detail-right">
                <div className="detail-user-profile">
                  <img src={postUser.profile.avatar_url} alt="avt" />
                  <p>{postUser.profile.name}</p>
                  <div className="view-profile-seller">
                    <button
                      onClick={() => toProfile(postUser.id)}
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
                      <p>{handleCalculateTime(postUser.created_at)}</p>
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
                  <p>Địa chỉ: {postDetail.address}</p>
                  <p>Số điện thoại: {postUser.profile.phone}</p>
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
