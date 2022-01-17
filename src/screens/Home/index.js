import React, { useState, useEffect } from "react";
import ListItem from "../../components/ListItem";
import SlideShow from "../../components/SlideShow";
import "./home.scss";
import imgTest1 from "../../assets/image/imgtest.png";
import imgTest2 from "../../assets/image/imageTest2.jpg";
import MetaTag from "../../components/MetaTag";
import Preloading from "../../components/Loading";
import Categories from "../../components/Categories";
import banner1 from "../../assets/image/banner1.jpg";
import banner2 from "../../assets/image/banner2.jpg";
import banner3 from "../../assets/image/banner3.jpg";

const dataList = [
  {
    id: 0,
    image: imgTest1,
    nameProduct: "Lenovo IdeaPad 3 15 (Intel Gen 11)",
    infor:
      "Vi xử lý: Intel Core i5 11400H, 6 nhân / 12 luồng Màn hình: 15.6 FullHD IPS 144Hz (1920 x 1080), màn nhám Độ phủ màu: 65% sRGB",
    favorite: false,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 1,
    image: imgTest2,
    nameProduct: "Levevo ideapad gaming 3",
    infor: "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: true,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 2,
    image: imgTest1,
    nameProduct: "Lenovo IdeaPad 3 15 (Intel Gen 11)",
    infor: "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: false,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 3,
    image: imgTest2,
    nameProduct: "Levevo ideapad gaming 3",
    infor: "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: false,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 4,
    image: imgTest1,
    nameProduct: "Lenovo IdeaPad 3 15 (Intel Gen 11)",
    infor: "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: true,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 5,
    image: imgTest2,
    nameProduct: "Levevo ideapad gaming 3",
    infor: "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: false,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 6,
    image: imgTest1,
    nameProduct: "Lenovo IdeaPad 3 15 (Intel Gen 11)",
    infor: "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: true,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 7,
    image: imgTest2,
    nameProduct: "Levevo ideapad gaming 3",
    infor: "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: false,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 8,
    image: imgTest1,
    nameProduct: "Lenovo IdeaPad 3 15 (Intel Gen 11)",
    infor: "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: true,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 9,
    image: imgTest2,
    nameProduct: "Levevo ideapad gaming 3",
    infor: "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: false,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 10,
    image: imgTest1,
    nameProduct: "Lenovo IdeaPad 3 15 (Intel Gen 11)",
    infor: "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: false,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 11,
    image: imgTest2,
    nameProduct: "Levevo ideapad gaming 3",
    infor: "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: true,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
];

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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPreload(true);
    }, 500);
    return () => {};
  }, []);

  //handle scroll to top
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", toggleVisible);

  return (
    <div id="homeContainer">
      <MetaTag
        title={"Trang chủ"}
        description={"Trang web buôn bán, trao đổi sản phẩm cũ"}
      />
      {!preload ? (
        <Preloading />
      ) : (
        <>
          {visible && (
            <div className="scroll-to-top" onClick={() => scrollToTop()}>
              <i className="fas fa-chevron-up fa-2x"></i>
            </div>
          )}
          <SlideShow dataSlides={dataSlides} />
          <Categories />
          <h3>Tin mới đăng</h3>
          <ListItem dataList={dataList} />
          <h3>Bài viết nổi bật</h3>
          <ListItem dataList={dataList} />
          <h3>Bài viết đổi sản phẩm</h3>
          <ListItem dataList={dataList} />
        </>
      )}
    </div>
  );
}
