import React from "react";
import { Grid } from "@material-ui/core";
import PostItem from "./PostItem";

const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

export default function ListPost() {
  return (
    <div style={{ paddingTop: 10 }}>
      <h2>Bài viết đã đăng</h2>
      <Grid container spacing={3} alignItems="stretch">
        {data.map((item) => (
          <Grid key={item.id} item xs={12}>
            <PostItem item={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
