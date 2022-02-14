import React from "react";
import { Grid, Button } from "@material-ui/core";
import Item from "./Item";
import "./listItem.scss";

function ListItem({ dataList }) {
  return (
    <div className="listContainer">
      <Grid container alignItems="stretch" spacing={1}>
        {dataList &&
          dataList.map((data) => (
            <Grid key={data.id} item xs={12} sm={6} md={3} lg={2}>
              <Item data={data} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default React.memo(ListItem);
