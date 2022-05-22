import React, { useState, useEffect } from "react";
import "./_postManager.scss";
import Preloading from "../../components/Loading";
import { Box, Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { Favorite, ListPost } from "../../components/ProfileComponent";
import MetaTag from "../../components/MetaTag";
import Breadcrumb from "../../components/Breadcrumb";
import { postManagerBreadcrumb } from "../../constants/breadcrumData";
import { setLinkDirect } from "../../utils/common";

export default function PostManager() {
  const [preload, setPreload] = useState(false);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setLinkDirect();
    setTimeout(() => {
      setPreload(true);
    }, 500);
    return () => {};
  }, []);

  return (
    <div className="profile-container container">
      <MetaTag
        title={"Thông tin người dùng"}
        description={"Trang web buôn bán, trao đổi sản phẩm cũ"}
      />
      {!preload ? (
        <Preloading />
      ) : (
        <div>
          <Breadcrumb arrLink={postManagerBreadcrumb} />
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    label="Bài viết của bạn"
                    value="1"
                    className="profile-tab"
                  />
                  <Tab
                    label="Bài viết quan tâm"
                    value="2"
                    className="profile-tab"
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <ListPost />
              </TabPanel>
              <TabPanel value="2">
                <Favorite />
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      )}
    </div>
  );
}
