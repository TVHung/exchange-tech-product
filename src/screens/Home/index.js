import React, { useState, useEffect } from "react";
import ListItem from "../../components/ListItem";
import SlideShow from "../../components/SlideShow";
import "./home.scss";
import MetaTag from "../../components/MetaTag";
import Preloading from "../../components/Loading";
import Categories from "../../components/Categories";
import banner1 from "../../assets/image/banner1.png";
import banner2 from "../../assets/image/banner2.png";
import banner3 from "../../assets/image/banner3.png";
import axios from "axios";
import { apiPostMostInterest, apiPostRecently, headers } from "../../constants";
import { setLinkDirect } from "../../utils/common";
import { apiPostHasTrade } from "./../../constants/index";

const dataSlides = [
  {
    id: 1,
    image: banner1,
  },
  {
    id: 2,
    image: banner2,
  },
  {
    id: 3,
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

    const promise1 = axios.get(URL1, { headers: headers });
    const promise2 = axios.get(URL2, { headers: headers });
    const promise3 = axios.get(URL3, { headers: headers });

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
          <h3>Sản phẩm mới đăng</h3>
          <ListItem dataList={postRecently} />
          <h3>Sản phẩm được nhiều người quan tâm</h3>
          <ListItem dataList={allPostMostInterest} />
          <h3>Sản phẩm muốn mua</h3>
          <ListItem dataList={postHasTrade} />
        </div>
      )}
    </div>
  );
}
