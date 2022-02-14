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
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPost } from "./../../redux/actions/postActions";

const dataList = [
  {
    id: 0,
    image: imgTest1,
    name: "Lenovo IdeaPad 3 15 (Intel Gen 11)",
    description:
      "Vi xử lý: Intel Core i5 11400H, 6 nhân / 12 luồng Màn hình: 15.6 FullHD IPS 144Hz (1920 x 1080), màn nhám Độ phủ màu: 65% sRGB",
    favorite: false,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 1,
    image: imgTest2,
    name: "Levevo ideapad gaming 3",
    description:
      "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: true,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 2,
    image: imgTest1,
    name: "Lenovo IdeaPad 3 15 (Intel Gen 11)",
    description:
      "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: false,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 3,
    image: imgTest2,
    name: "Levevo ideapad gaming 3",
    description:
      "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: false,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 4,
    image: imgTest1,
    name: "Lenovo IdeaPad 3 15 (Intel Gen 11)",
    description:
      "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: true,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 5,
    image: imgTest2,
    name: "Levevo ideapad gaming 3",
    description:
      "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: false,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 6,
    image: imgTest1,
    name: "Lenovo IdeaPad 3 15 (Intel Gen 11)",
    description:
      "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: true,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 7,
    image: imgTest2,
    name: "Levevo ideapad gaming 3",
    description:
      "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: false,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 8,
    image: imgTest1,
    name: "Lenovo IdeaPad 3 15 (Intel Gen 11)",
    description:
      "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: true,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 9,
    image: imgTest2,
    name: "Levevo ideapad gaming 3",
    description:
      "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: false,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 10,
    image: imgTest1,
    name: "Lenovo IdeaPad 3 15 (Intel Gen 11)",
    description:
      "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
    favorite: false,
    location: "Hà nội",
    createAt: new Date(2021, 10, 30, 10, 20, 20),
  },
  {
    id: 11,
    image: imgTest2,
    name: "Levevo ideapad gaming 3",
    description:
      "Dong máy mới nhất của levo sử dụng dòng chip mới nhất đến từ intel",
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

  //get data post
  const dispatch = useDispatch();
  const get_all_post = useSelector((state) => state.post.all_post);
  const getAllPost = () => {
    dispatch(fetchAllPost());
  };

  useEffect(() => {
    console.log(get_all_post);
    return () => {};
  }, [get_all_post]);

  useEffect(() => {
    getAllPost();
    setTimeout(() => {
      setPreload(true);
    }, 500);
    return () => {
      setPreload(false);
      setVisible(false);
    };
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

  const [fileSelected, setFileSelected] = useState("");
  const upload = async () => {
    const formData = new FormData();
    formData.append("file", fileSelected);
    formData.append("upload_preset", "weedzflm");
    await axios
      .post("https://api.cloudinary.com/v1_1/trhung/image/upload", formData)
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div id="homeContainer" className="container">
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
          {/* <div>
            <input
              type="file"
              onChange={(event) => {
                setFileSelected(event.target.files[0]);
              }}
            />
            <button onClick={() => upload()}>upload</button>
          </div> */}
          <SlideShow dataSlides={dataSlides} />
          <Categories />
          <h3>Tin mới đăng</h3>
          <ListItem dataList={get_all_post} />
          <h3>Bài viết nổi bật</h3>
          <ListItem dataList={get_all_post} />
          <h3>Bài viết đổi sản phẩm</h3>
          <ListItem dataList={get_all_post} />
        </>
      )}
    </div>
  );
}
