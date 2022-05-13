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
import { headers } from "../../constants";

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

  //get data post
  const dispatch = useDispatch();
  const get_all_post = useSelector((state) => state.post.all_post);
  const getAllPost = () => {
    dispatch(fetchAllPost());
  };

  useEffect(() => {
    getAllPost();
    setTimeout(() => {
      setPreload(true);
    }, 1000);
    return () => {
      setPreload(false);
    };
  }, []);

  useEffect(() => {
    if (get_all_post) setPreload(true);
  }, [get_all_post]);

  const [fileSelected, setFileSelected] = useState("");
  // const upload = async () => {
  //   const formData = new FormData();
  //   formData.append("file", fileSelected);
  //   formData.append("upload_preset", "weedzflm");
  //   await axios
  //     .post("https://api.cloudinary.com/v1_1/trhung/image/upload", formData)
  //     .then((res) => {
  //       console.log(res);
  //     });
  // };

  const upload = async () => {
    const formData = {
      file: fileSelected,
    };
    console.log(fileSelected);
    // await axios
    //   .post("http://127.0.0.1:8000/api/upload", formData, {
    //     headers: headers,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
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
        <div className="home-posts">
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
        </div>
      )}
    </div>
  );
}
