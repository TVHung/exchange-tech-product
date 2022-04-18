import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Item from "./../../ListItem/Item/index";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishList } from "../../../redux/actions/postActions";

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
    <div style={{ paddingTop: 10 }}>
      <h2>Bài đăng quan tâm</h2>
      <Grid container alignItems="stretch" spacing={1}>
        {get_wish_list &&
          get_wish_list.map((data) => (
            <Grid key={data.id} item xs={12} sm={6} md={3} lg={2}>
              <Item data={data} status={true} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
