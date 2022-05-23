import React, { useState, useEffect } from "react";
import "./_profileUser.scss";
import Preloading from "../../components/Loading";
import MetaTag from "../../components/MetaTag";
import Breadcrumb from "../../components/Breadcrumb";
import { profileBreadcrumb } from "../../constants/breadcrumData";
import { setLinkDirect } from "../../utils/common";
import AccountUserInfor from "../../components/ProfileComponent/AccountUserInfor";

export default function ProfileUser() {
  const [preload, setPreload] = useState(false);

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
        <div className="account-manager">
          <Breadcrumb arrLink={profileBreadcrumb} />
          <AccountUserInfor />
        </div>
      )}
    </div>
  );
}
