import React, { useState, useEffect } from "react";
import "./_postManager.scss";
import Preloading from "../../components/Loading";
import { Box, Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { Favorite, ListPost } from "../../components/ProfileComponent";
import MetaTag from "../../components/MetaTag";
import Breadcrumb from "../../components/Breadcrumb";
import { postManagerBreadcrumb } from "../../constants/breadcrumData";
import { setLinkDirect, insertParam } from "../../utils/common";
import { useHistory } from "react-router-dom";
import { getParam } from "./../../utils/common";

export default function PostManager() {
  const [preload, setPreload] = useState(false);
  const [value, setValue] = React.useState("profile");
  const history = useHistory();

  const insertParams = (key, value) => {
    let params = insertParam(key, value);
    history.push({
      pathname: "/post-manager",
      search: `?${params}`,
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    insertParams("tab", newValue);
  };

  useEffect(() => {
    setLinkDirect();
    setTimeout(() => {
      setPreload(true);
    }, 1000);
    if (getParam("tab")) setValue(getParam("tab"));
    else insertParams("tab", "profile");
    return () => {};
  }, []);

  return (
    <div className="profile-container container">
      <MetaTag
        title={"Quản lý sản phẩm đã đăng"}
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
                    value="profile"
                    className="profile-tab"
                  />
                  <Tab
                    label="Bài viết quan tâm"
                    value="post-favorite"
                    className="profile-tab"
                  />
                </TabList>
              </Box>
              <TabPanel value="profile">
                <ListPost setPreload={setPreload} />
              </TabPanel>
              <TabPanel value="post-favorite">
                <Favorite setPreload={setPreload} />
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      )}
    </div>
  );
}
