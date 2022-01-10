import React from "react";
import { Grid } from "@material-ui/core";
import FavoriteItem from "./FavoriteItem";

const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

export default function Favorite() {
  return (
    <div style={{ paddingTop: 10 }}>
      <h2>Bài đăng quan tâm</h2>
      <Grid container spacing={3} alignItems="stretch">
        {data.map((item) => (
          <Grid key={item.id} item xs={12} md={6}>
            <FavoriteItem item={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
