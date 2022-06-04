import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Item from "./Item";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishList } from "../../../redux/actions/postActions";
import "./_favorite.scss";
import NotPost from "../../NotPost";
import Pagination from "react-js-pagination";

export default function Favorite({ setPreload }) {
  //get data post
  const dispatch = useDispatch();
  const get_wish_list = useSelector((state) => state.post.wish_list);
  const getWishList = () => {
    dispatch(fetchWishList());
  };

  useEffect(() => {
    getWishList();
  }, []);

  console.log(get_wish_list);

  return (
    <div className="my-favorite-post">
      <h3>Bài đăng quan tâm</h3>
      {get_wish_list?.data?.length > 0 ? (
        <>
          <Grid container alignItems="stretch" spacing={1}>
            {get_wish_list &&
              get_wish_list?.data.map((data) => (
                <Grid key={data.id} item xs={12} sm={6} md={3} lg={2}>
                  <Item data={data} status={true} />
                </Grid>
              ))}
          </Grid>
          <div className="paginate mt-3">
            <small className="fw-bold d-block">
              Hiển thị <b>{get_wish_list?.data?.length}</b> trên{" "}
              <b>{get_wish_list?.total}</b> bài viết
            </small>
          </div>
          <div className="paginate mt-1">
            <Pagination
              activePage={get_wish_list?.current_page}
              itemsCountPerPage={get_wish_list?.per_page}
              totalItemsCount={get_wish_list?.total || 0}
              onChange={(pageNumber) => {
                dispatch(fetchWishList(pageNumber));
              }}
              pageRangeDisplayed={5}
              itemClass="page-item"
              linkClass="page-link"
              firstPageText="Trang đầu"
              lastPageText="Trang cuối"
            />
          </div>
        </>
      ) : (
        <NotPost type={"my-favorite"} />
      )}
    </div>
  );
}
