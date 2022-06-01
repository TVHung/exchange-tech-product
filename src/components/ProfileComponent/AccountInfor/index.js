import React, { useState, useEffect } from "react";
import "./_accountInfor.scss";
import { Grid } from "@material-ui/core";
import {
  apiFetchUserPosts,
  apiProfile,
  headers,
  sexData,
} from "../../../constants";
import { converDate } from "../../../utils/common";
import axios from "axios";
import { useParams } from "react-router-dom";
import NotPost from "../../NotPost";
import UserPostItem from "./UserPostItem";
import Pagination from "react-js-pagination";

export default function AccountInfor() {
  const params = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [paginateData, setPaginateData] = useState({});

  //get data profile
  useEffect(() => {
    fetchUserProfile(params.id);
    fetchUserPosts(params.id);
    return () => {};
  }, [params.id]);

  const fetchUserProfile = async (user_id) => {
    try {
      await axios
        .get(`${apiProfile}/${user_id}`, {
          headers: headers,
        })
        .then((res) => {
          const userProfile = res.data;
          setUserProfile(userProfile);
        });
    } catch (error) {
      return { statusCode: 500, body: error.toString() };
    }
  };

  const fetchUserPosts = async (user_id, pageNumber = 1) => {
    try {
      await axios
        .get(`${apiFetchUserPosts}/${user_id}/?page=${pageNumber}`, {
          headers: headers,
        })
        .then((res) => {
          const myPosts = res.data.data;
          setPaginateData(res?.data?.meta);
          console.log(res);
          setUserPosts(myPosts);
        });
    } catch (error) {
      return { statusCode: 500, body: error.toString() };
    }
  };

  const getNameById = (id) => {
    let data = sexData.find((x) => x.id == id);
    if (data) return data.value;
    else return "";
  };

  return (
    <div className="account-container">
      <div className="account-infor">
        <h3>Thông tin người dùng</h3>
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
                  <img
                    src={userProfile?.avatar_url}
                    alt="avt"
                    className="account-avatar"
                  />
                </Grid>
                <Grid item xs={8}>
                  <h4 style={{ marginTop: 0 }}>{userProfile?.name}</h4>
                  <div>
                    <span className="infor-detail">
                      <a
                        href={userProfile?.facebook_url}
                        title="Facebook"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fab fa-facebook fa-2x social-icon"></i>
                      </a>
                    </span>
                  </div>
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
                    <i className="fas fa-phone"></i>
                    <b>Số điện thoại: </b>
                    <span className="infor-detail">{userProfile?.phone}</span>
                  </li>
                  <li>
                    {userProfile?.sex === 0 && <i className="fas fa-male"></i>}
                    {userProfile?.sex === 1 && (
                      <i className="fas fa-female"></i>
                    )}
                    {userProfile?.sex === 2 && <i className="fas fa-user"></i>}
                    <b>Giới tính: </b>
                    <span className="infor-detail">
                      {getNameById(userProfile?.sex)}
                    </span>
                  </li>
                  <li>
                    <i className="fas fa-address-book"></i>
                    <b>Địa chỉ: </b>
                    <span className="infor-detail">{userProfile?.address}</span>
                  </li>
                  <li>
                    <i className="fas fa-calendar-day"></i>
                    <b>Ngày tham gia: </b>
                    <span className="infor-detail">
                      {converDate(userProfile?.created_at)}
                    </span>
                  </li>
                  <li>
                    <i className="fas fa-comment-dots"></i>
                    <b>Phản hồi: </b>
                    <span className="infor-detail">Trong 1 giờ</span>
                  </li>
                </ul>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="account-posts">
        <h3>Các bài viết người dùng này đã đăng</h3>
        <div className="account-post-list">
          <div className="num-post">
            <p>Các tin đã đăng: {paginateData?.total} tin</p>
          </div>
          {userPosts.length > 0 ? (
            <div>
              <Grid container spacing={1} alignItems="stretch">
                {userPosts &&
                  userPosts.map((item) => (
                    <Grid key={item.id} item xs={6}>
                      <UserPostItem data={item} />
                    </Grid>
                  ))}
              </Grid>
              <div className="mt-3 paginate">
                <Pagination
                  activePage={paginateData?.current_page}
                  itemsCountPerPage={paginateData?.per_page}
                  totalItemsCount={paginateData?.total || 0}
                  onChange={(pageNumber) => {
                    fetchUserPosts(params.id, pageNumber);
                  }}
                  pageRangeDisplayed={5}
                  itemClass="page-item"
                  linkClass="page-link"
                  firstPageText="Trang đầu"
                  lastPageText="Trang cuối"
                />
              </div>
              <div className="paginate">
                <small className="fw-bold d-block">
                  Hiển thị <b>{userPosts?.length}</b> trên{" "}
                  <b>{paginateData?.total}</b> bài viết
                </small>
              </div>
            </div>
          ) : (
            <NotPost type={"user-post"} />
          )}
        </div>
      </div>
    </div>
  );
}
