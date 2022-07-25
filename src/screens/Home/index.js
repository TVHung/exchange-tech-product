import React, { useState, useEffect } from "react";
import ListItem from "../../components/ListItem";
import SlideShow from "../../components/SlideShow";
import "./home.scss";
import MetaTag from "../../components/MetaTag";
import Preloading from "../../components/Loading";
import Categories from "../../components/Categories";
import banner1 from "../../assets/image/banner1.jpg";
import banner2 from "../../assets/image/banner2.jpg";
import banner3 from "../../assets/image/banner3.jpg";
import axios from "axios";
import { apiPostMostInterest, apiPostRecently } from "../../constants";
import { setLinkDirect } from "../../utils/common";
import { apiPostHasTrade } from "./../../constants/index";

const dataSlides = [
  {
    id: 1,
    tite: "We are team ssv",
    bio: "Blog chia sẻ về những thông tin của nhóm và những kiến thức bổ ích khác",
    image: banner1,
  },
  {
    id: 2,
    tite: "We are team ssv",
    bio: "Blog chia sẻ về những thông tin của nhóm và những kiến thức bổ ích khác",
    image: banner2,
  },
  {
    id: 3,
    tite: "We are team ssv",
    bio: "Blog chia sẻ về những thông tin của nhóm và những kiến thức bổ ích khác",
    image: banner3,
  },
];

export default function Home() {
  const [preload, setPreload] = useState(false);
  const [allPostMostInterest, setAllPostMostInterest] = useState([]);
  const [postRecently, setPostRecently] = useState([]);
  const [postHasTrade, setPostHasTrade] = useState([]);

  useEffect(() => {
    setLinkDirect();
    fetchAllPostWithFeild();
    return () => {
      setPreload(false);
    };
  }, []);

  const fetchAllPostWithFeild = () => {
    let URL1 = apiPostMostInterest;
    let URL2 = apiPostRecently;
    let URL3 = apiPostHasTrade;

    const promise1 = axios.get(URL1);
    const promise2 = axios.get(URL2);
    const promise3 = axios.get(URL3);

    Promise.all([promise1, promise2, promise3]).then(function (res) {
      setAllPostMostInterest(res[0].data.data);
      setPostRecently(res[1].data.data);
      setPostHasTrade(res[2].data.data);
      setPreload(true);
    });
  };

  return (
    <div id="homeContainer" className="container">
      <MetaTag
        title={"Texchange - Trang chủ"}
        description={"Trang web buôn bán, trao đổi sản phẩm cũ"}
      />
      {!preload ? (
        <Preloading />
      ) : (
        <div className="home-posts">
          <SlideShow dataSlides={dataSlides} />
          <Categories />
          <h3>Tin mới đăng</h3>
          <ListItem dataList={postRecently} />
          <h3>Bài viết được nhiều người quan tâm</h3>
          <ListItem dataList={allPostMostInterest} />
          <h3>Bài viết đổi sản phẩm</h3>
          <ListItem dataList={postHasTrade} />
        </div>
      )}
    </div>
  );
}
