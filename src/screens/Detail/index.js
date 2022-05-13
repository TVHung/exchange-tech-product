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
import {
  apiFetchPostDetail,
  apiFetchRecommendPosts,
  apiGetUser,
  headers,
} from "../../constants";
import axios from "axios";
import Breadcrumb from "../../components/Breadcrumb";
import { gameBreadcrumb } from "../../constants/breadcrumData";
import { useParams } from "react-router-dom";

export default function Detail() {
  const [preload, setPreload] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [stateCopy, setStateCopy] = useState(false);
  const [postDetail, setPostDetail] = useState({});
  const [recommendPost, setRecommendPost] = useState([]);
  const [postUser, setPostUser] = useState({});
  const params = useParams();

  useEffect(() => {
    fetchAllData(params.id);
    fetchRecommendPost();
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
          console.log("post user profile", userPost);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRecommendPost = async () => {
    try {
      await axios
        .get(`${apiFetchRecommendPosts}`, {
          headers: headers,
        })
        .then((res) => {
          const recommendPost = res.data.data;
          setRecommendPost(recommendPost);
          console.log("post recommend", recommendPost);
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
                  <SlideDetail
                    dataSlides={postDetail.images}
                    video_url={postDetail.video_url}
                  />
                  <div className="detail-time-create">
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
                    {postDetail.ram > 0 && (
                      <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                        <i className="fas fa-memory"></i>
                        <span>Ram: {postDetail.ram}GB</span>
                      </div>
                    )}
                    {postDetail.storage > 0 && (
                      <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                        <i className="fas fa-tags"></i>
                        <span>Dung lượng: {postDetail.storage}GB</span>
                      </div>
                    )}
                    {postDetail.status != null && (
                      <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                        <i className="fas fa-microchip"></i>
                        <span>Tình trạng: {postDetail.status_value}</span>
                      </div>
                    )}
                    <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                      <i className="fas fa-hdd"></i>
                      {postDetail.guarantee > 0 ? (
                        <span>Bảo hành: {postDetail.guarantee} Tháng</span>
                      ) : (
                        <span>Bảo hành: Không</span>
                      )}
                    </div>
                    {/* mobile */}
                    {postDetail.category_id === 1 && (
                      <>
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-tags"></i>
                          <span>Hãng: {postDetail.brand_id}</span>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-tags"></i>
                          <span>Màu sắc: {postDetail.color}</span>
                        </div>
                      </>
                    )}
                    {/* laptop */}
                    {postDetail.category_id === 2 && (
                      <>
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-tags"></i>
                          <span>Hãng: {postDetail.brand_id}</span>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-tags"></i>
                          <span>Màu sắc: {postDetail.color}</span>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-microchip"></i>
                          <span>CPU: {postDetail.cpu}</span>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-microchip"></i>
                          <span>GPU: {postDetail.gpu}</span>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-hdd"></i>
                          <span>
                            Loại ổ cứng: {postDetail.storage_type_value}
                          </span>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-hdd"></i>
                          <span>Màn hình: {postDetail.display_size}</span>
                        </div>
                      </>
                    )}
                    {/* pc */}
                    {postDetail.category_id === 3 && (
                      <>
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-microchip"></i>
                          <span>CPU: {postDetail.cpu}</span>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-microchip"></i>
                          <span>GPU: {postDetail.gpu}</span>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-hdd"></i>
                          <span>Loại ổ cứng: {postDetail.storage_type}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {postDetail.post_trade_id != null ? (
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
          <hr />
          <div className="related-products">
            <h3>Sản phẩm liên quan</h3>
            <ListItem dataList={recommendPost} />
          </div>
          <div className="copy-check-mark">
            <CheckMark stateCopy={stateCopy} setStateCopy={setStateCopy} />
          </div>
        </>
      )}
    </div>
  );
}
