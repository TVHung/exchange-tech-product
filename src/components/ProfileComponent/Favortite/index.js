import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Item from "./../../ListItem/Item/index";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishList } from "../../../redux/actions/postActions";
import "./_favorite.scss";
import NotPost from "../../NotPost";

export default function Favorite() {
  //get data post
  const dispatch = useDispatch();
  const get_wish_list = useSelector((state) => state.post.wish_list);
  const getWishList = () => {
    dispatch(fetchWishList());
  };

  useEffect(() => {
    getWishList();
  }, []);

  return (
    <div className="my-favorite-post">
      <h3>Bài đăng quan tâm</h3>
      {get_wish_list.length > 0 ? (
        <Grid container alignItems="stretch" spacing={1}>
          {get_wish_list &&
            get_wish_list.map((data) => (
              <Grid key={data.id} item xs={12} sm={6} md={3} lg={2}>
                <Item data={data} status={true} />
              </Grid>
            ))}
        </Grid>
      ) : (
        <NotPost type={"my-favorite"} />
      )}
    </div>
  );
}
