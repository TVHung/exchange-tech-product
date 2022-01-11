import React, { useState, useEffect } from "react";
import "./profile.scss";
import Preloading from "../../components/Loading";
import { Box, Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import {
  AccountInfor,
  Favorite,
  ListPost,
} from "../../components/ProfileComponent";
import MetaTag from "../../components/MetaTag";

export default function Profile() {
  const [preload, setPreload] = useState(false);
  const [value, setValue] = React.useState("1");
  const [key, setKey] = useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setTimeout(() => {
      setPreload(true);
    }, 500);
    return () => {};
  }, []);

  return (
    <div className="profile-container">
      <MetaTag
        title={"Thông tin người dùng"}
        description={"Trang web buôn bán, trao đổi sản phẩm cũ"}
      />
      {!preload ? (
        <Preloading />
      ) : (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Tài khoản" value="1" className="profile-tab" />
                <Tab label="Bài viết" value="2" className="profile-tab" />
                <Tab
                  label="Sản phẩm yêu thích"
                  value="3"
                  className="profile-tab"
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <AccountInfor />
            </TabPanel>
            <TabPanel value="2">
              <ListPost />
            </TabPanel>
            <TabPanel value="3">
              <Favorite />
            </TabPanel>
          </TabContext>
        </Box>
      )}
    </div>
  );
}
