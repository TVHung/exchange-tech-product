import React, { useState, useEffect, useRef } from "react";
import "./_detail.scss";
import Preloading from "../../components/Loading";
import SlideDetail from "../../components/SlideShow/SlideDetail";
import {
  formatPrice,
  formatView,
  getValueInArrayObjectWithId,
  handleCalculateTime,
  setLinkDirect,
} from "../../utils/common";
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
import ListItemRecommend from "./../../components/ListItemRecommend";
import StarRatings from "react-star-ratings";
import CheckMark from "../../components/CheckMark";
import {
  apiFetchPostDetail,
  apiFetchRecommendPosts,
  apiGetCommentProduct,
  apiGetUser,
  apiUpView,
  categoryData,
  headers,
  resolutionData,
  commandData,
} from "../../constants";
import axios from "axios";
import Breadcrumb from "../../components/Breadcrumb";
import { useParams } from "react-router-dom";
import NotPost from "../../components/NotPost";
import { useDispatch, useSelector } from "react-redux";
import { addWishList, setListCompare } from "../../redux/actions/postActions";
import Comment from "../../components/Comment";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

export default function Detail({ isAuth }) {
  const [preload, setPreload] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [stateCopy, setStateCopy] = useState(false);
  const [postDetail, setPostDetail] = useState({});
  const [recommendPost, setRecommendPost] = useState([]);
  const [postUser, setPostUser] = useState({});
  const [getError, setGetError] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [isCompare, setIsCompare] = useState(false);
  const [show, setShow] = useState(false);
  const textareaRef = useRef(null);
  const params = useParams();
  const list_compare = useSelector((state) => state.post.list_compare);

  useEffect(() => {
    setIsCompare(list_compare?.split(",")?.includes(params.id));
  }, [list_compare]);

  useEffect(() => {
    setLinkDirect();
    fetchAllData(params.id);
    fetchRecommendPost();
    setIsCompare(
      localStorage.getItem("array_id_compare")?.split(",")?.includes(params.id)
    );
    return () => {};
  }, [params.id]);

  const changeRating = () => {
    setFavorite(!favorite);
  };
  const toProfile = (user_id) => {
    window.location.href = `/profile/${user_id}`;
  };
  const toChat = (user_id) => {
    window.location.href = `/chat/${user_id}`;
  };
  const onClickCopyLink = (s) => {
    navigator.clipboard.writeText(window.location.href);
    setStateCopy(true);
  };

  useEffect(() => {
    return () => {
      setPostDetail({});
      setPreload(false);
      setRecommendPost([]);
      setPostUser({});
    };
  }, []);

  const fetchAllData = async (postId) => {
    let apiPostDetail = `${apiFetchPostDetail}/${postId}`;
    let apiView = `${apiUpView}/${postId}`;
    const requestPost = axios.get(apiPostDetail, { headers: headers });
    const requestView = axios.get(apiView);

    await axios
      .all([requestPost, requestView])
      .then(
        axios.spread((...responses) => {
          let status = responses[0].data?.status;
          if (status === 1) {
            const post = responses[0].data.data;
            setPostDetail(post);
            setDataBreadcrumb(post?.category_id);
            fetchUserPost(post?.user_id);
            setGetError(false);
          } else {
            setPreload(true);
            //show notify
            setGetError(true);
          }
        })
      )
      .catch((errors) => {
        console.error(errors);
      });
  };

  const setDataBreadcrumb = (type) => {
    let val = "";
    categoryData.map((data) => {
      if (type == data.id) val = data.value;
    });
    setBreadcrumb([
      { name: "Trang chủ", direct: "/" },
      { name: val, direct: "/" },
    ]);
  };

  const dispatch = useDispatch();
  const addNewWishList = () => {
    dispatch(addWishList(params.id));
  };
  const addCompare = (id, category) => {
    let current = localStorage.getItem("array_id_compare");
    let current_category = localStorage.getItem("current_category");
    let arrId = [];
    if (current) arrId = current.split(",");

    if (parseInt(current_category) != parseInt(category) && arrId?.length > 0) {
      localStorage.removeItem("array_id_compare");
      localStorage.removeItem("current_category");
      dispatch(setListCompare(""));
      arrId = [];
    }
    if (arrId.length === 3) {
      alert("Vui lòng xóa bớt sản phẩm để tiếp tục so sánh");
    } else if (arrId.includes(id)) {
      alert("Sản phẩm này đã được thêm vào so sánh");
    } else {
      arrId.push(id);
      current = arrId.length > 1 ? arrId.join(",") : arrId.join("");
      localStorage.setItem("array_id_compare", current);
      localStorage.setItem("current_category", category);
      dispatch(setListCompare(current));
      setIsCompare(true);
    }
  };

  const deleteCompare = (id) => {
    let current = localStorage.getItem("array_id_compare");
    let arrId = [];
    if (current) arrId = current.split(",");
    if (arrId.includes(id)) {
      arrId.pop(id);
      current = arrId.length > 1 ? arrId.join(",") : arrId.join("");
      localStorage.setItem("array_id_compare", current);
      dispatch(setListCompare(current));
      setIsCompare(false);
      if (arrId.length === 0) localStorage.removeItem("current_category");
    }
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
        });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRecommendPost = async () => {
    try {
      await axios
        .get(`${apiFetchRecommendPosts}/${params.id}`, {
          headers: headers,
        })
        .then((res) => {
          const recommendPost = res.data.data;
          setRecommendPost(recommendPost);
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
          {getError ? (
            <NotPost type={"post-is-block"} />
          ) : (
            <>
              <Breadcrumb arrLink={breadcrumb} />
              <div className="row">
                <div className="col-sm-12 col-lg-8">
                  <div className="detail-left">
                    <div className="detail-left-image">
                      <SlideDetail
                        dataSlides={postDetail?.images}
                        video_url={postDetail?.video_url}
                      />
                      <div className="detail-time-create">
                        <p>
                          Bài đăng cách đây{" "}
                          {handleCalculateTime(postDetail?.created_at)}
                          &nbsp;|&nbsp;
                          {`${formatView(postDetail?.view)} lượt xem`}
                        </p>
                      </div>
                    </div>
                    <div className="detail-left-content">
                      <h4>{postDetail?.name}</h4>
                      <p>
                        Giá:{" "}
                        {postDetail?.price > 0
                          ? `${formatPrice(postDetail?.price)}đ`
                          : "Miễn phí"}
                      </p>
                      <div className="detail-favorite-heart">
                        <button onClick={() => addNewWishList()}>
                          Quan tâm
                        </button>
                      </div>
                    </div>
                    <div className="detail-left-description">
                      <p>{postDetail?.title}</p>
                      <TextareaAutosize
                        aria-label="empty textarea"
                        placeholder=""
                        defaultValue={postDetail?.description}
                        disabled={true}
                        className="description-area"
                      />
                    </div>
                    <div className="detail-properties">
                      <div className="row">
                        {/* common */}
                        {postDetail?.command != null && (
                          <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                            <i className="fas fa-bullseye"></i>
                            <span>
                              Phù hợp:{" "}
                              {getValueInArrayObjectWithId(
                                commandData,
                                postDetail?.command
                              )}
                            </span>
                          </div>
                        )}
                        {postDetail?.ram > 0 && (
                          <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                            <i className="fas fa-memory"></i>
                            <span>Ram: {postDetail?.ram}GB</span>
                          </div>
                        )}
                        {postDetail?.storage > 0 && (
                          <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                            <i className="fas fa-database"></i>
                            <span>Dung lượng: {postDetail?.storage}GB</span>
                          </div>
                        )}
                        {postDetail?.status != null && (
                          <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                            <i className="fas fa-shield-alt"></i>
                            <span>Tình trạng: {postDetail?.status_value}</span>
                          </div>
                        )}
                        <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                          <i className="fas fa-hdd"></i>
                          {postDetail?.guarantee > 0 ? (
                            <span>Bảo hành: {postDetail?.guarantee} Tháng</span>
                          ) : (
                            <span>Bảo hành: Không</span>
                          )}
                        </div>
                        {/* mobile */}
                        {postDetail?.category_id === 1 && (
                          <>
                            {postDetail?.productMobile?.brand && (
                              <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                                <i className="fas fa-tags"></i>
                                <span>
                                  Hãng: {postDetail?.productMobile?.brand}
                                </span>
                              </div>
                            )}
                            {postDetail?.productMobile?.color && (
                              <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                                <i className="fas fa-palette"></i>
                                <span>
                                  Màu sắc: {postDetail?.productMobile?.color}
                                </span>
                              </div>
                            )}
                            {postDetail?.productMobile?.pin && (
                              <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                                <i className="fas fa-battery-full"></i>
                                <span>
                                  Pin: {postDetail?.productMobile?.pin} mah
                                </span>
                              </div>
                            )}
                            {postDetail?.productMobile?.resolution && (
                              <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                                <i className="fas fa-tv"></i>
                                <span>
                                  Độ phân giải:{" "}
                                  {getValueInArrayObjectWithId(
                                    resolutionData,
                                    postDetail?.productMobile?.resolution
                                  )}
                                </span>
                              </div>
                            )}
                          </>
                        )}
                        {/* laptop */}
                        {postDetail?.category_id === 2 && (
                          <>
                            {postDetail?.productLaptop?.brand && (
                              <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                                <i className="fas fa-tags"></i>
                                <span>
                                  Hãng: {postDetail?.productLaptop?.brand}
                                </span>
                              </div>
                            )}
                            {postDetail?.productLaptop?.color && (
                              <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                                <i className="fas fa-palette"></i>
                                <span>
                                  Màu sắc: {postDetail?.productLaptop?.color}
                                </span>
                              </div>
                            )}
                            {postDetail?.productLaptop?.cpu && (
                              <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                                <i className="fas fa-microchip"></i>
                                <span>
                                  CPU: {postDetail?.productLaptop?.cpu}
                                </span>
                              </div>
                            )}
                            {postDetail?.productLaptop?.gpu && (
                              <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                                <i className="fas fa-microchip"></i>
                                <span>
                                  GPU: {postDetail?.productLaptop?.gpu}
                                </span>
                              </div>
                            )}
                            {postDetail?.productLaptop?.storage_type_value && (
                              <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                                <i className="fas fa-hdd"></i>
                                <span>
                                  Loại ổ cứng:{" "}
                                  {
                                    postDetail?.productLaptop
                                      ?.storage_type_value
                                  }
                                </span>
                              </div>
                            )}
                            {postDetail?.productLaptop?.display_size && (
                              <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                                <i className="fas fa-tv"></i>
                                <span>
                                  Màn hình:{" "}
                                  {postDetail?.productLaptop?.display_size} inch
                                </span>
                              </div>
                            )}
                            {postDetail?.productLaptop?.resolution && (
                              <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                                <i className="fas fa-tv"></i>
                                <span>
                                  Độ phân giải:{" "}
                                  {getValueInArrayObjectWithId(
                                    resolutionData,
                                    postDetail?.productLaptop?.resolution
                                  )}
                                </span>
                              </div>
                            )}
                          </>
                        )}
                        {/* pc */}
                        {postDetail?.category_id === 3 && (
                          <>
                            {postDetail?.productPc?.cpu && (
                              <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                                <i className="fas fa-microchip"></i>
                                <span>CPU: {postDetail?.productPc?.cpu}</span>
                              </div>
                            )}
                            {postDetail?.productPc?.gpu && (
                              <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                                <i className="fas fa-microchip"></i>
                                <span>GPU: {postDetail?.productPc?.gpu}</span>
                              </div>
                            )}
                            {postDetail?.productPc?.storage_type_value && (
                              <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                                <i className="fas fa-hdd"></i>
                                <span>
                                  Loại ổ cứng:{" "}
                                  {postDetail?.productPc?.storage_type_value}
                                </span>
                              </div>
                            )}
                            {postDetail?.productPc?.display_size && (
                              <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                                <i className="fas fa-tv"></i>
                                <span>
                                  Màn hình:{" "}
                                  {postDetail?.productPc?.display_size} inch
                                </span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-lg-4">
                  <div className="detail-right">
                    <div className="detail-user-profile">
                      <img src={postUser?.profile?.avatar_url} alt="avt" />
                      <p>{postUser?.profile?.name}</p>
                      <div className="view-profile-seller">
                        <button
                          onClick={() => toProfile(postUser?.id)}
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
                          <p>{handleCalculateTime(postUser?.created_at)}</p>
                        </div>
                        <div className="col-6 detail-compare text-center">
                          <div className="mt-2">
                            {isCompare ? (
                              <button
                                className="detail-compare-btn btn fs-12"
                                onClick={() => deleteCompare(params.id)}
                              >
                                <i className="fas fa-minus-circle"></i>
                                Đã thêm so sánh
                              </button>
                            ) : (
                              <button
                                className="detail-compare-btn btn"
                                onClick={() =>
                                  addCompare(params.id, postDetail.category_id)
                                }
                              >
                                <i className="fas fa-plus-circle"></i>
                                So sánh
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="detail-contact-seller">
                      <p>Địa chỉ: {postDetail?.address}</p>
                      {postUser?.profile?.phone && (
                        <p>Số điện thoại: {postUser?.profile?.phone}</p>
                      )}
                    </div>
                    <div className="detail-chat-seller">
                      <button
                        className="btn"
                        onClick={() => toChat(postUser?.id)}
                      >
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
                    <div className="comment-component">
                      <h5>Bình luận về sản phẩm</h5>
                      <Comment product_id={params.id} isAuth={isAuth} />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="related-products">
                <h3>Sản phẩm liên quan</h3>
                <ListItemRecommend dataList={recommendPost} />
              </div>
              <div className="copy-check-mark">
                <CheckMark stateCopy={stateCopy} setStateCopy={setStateCopy} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
