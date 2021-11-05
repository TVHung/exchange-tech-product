import React, { useState, useEffect } from "react";
import ListItem from "../../components/ListItem";
import SlideShow from "../../components/SlideShow";
import "./home.scss";
import imgTest1 from "../../assets/image/imgtest.png";
import imgTest2 from "../../assets/image/imageTest2.jpg";
import MetaTag from "../../components/MetaTag";
import Preloading from "../../components/Loading";

const dataList = [
    {
        id: 0,
        image: imgTest1,
        nameProduct: "Lenovo IdeaPad 3 15 (Intel Gen 11)",
        infor: "Vi xử lý: Intel Core i5 11400H, 6 nhân / 12 luồng Màn hình: 15.6 FullHD IPS 144Hz (1920 x 1080), màn nhám Độ phủ màu: 65% sRGB",
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
        image: "https://monkeymedia.com.vn/storage/2020/06/757b505cfd34c64c85ca5b5690ee5293/c/16a17bdd79859ddbc494.jpg-large.jpg",
    },
    {
        id: 2,
        tite: "We are team ssv",
        bio: "Blog chia sẻ về những thông tin của nhóm và những kiến thức bổ ích khác",
        image: "https://cn24h.net/uploads/img_nd/dinh-dang-anh-tiff-la-gi-1.jpg",
    },
    {
        id: 3,
        tite: "We are team ssv",
        bio: "Blog chia sẻ về những thông tin của nhóm và những kiến thức bổ ích khác",
        image: "http://cdn2.tieudungplus.vn/upload/TgBSumXIHarRW68IEfydSA/files/bst-hinh-anh-phong-canh-thien-nhien-tuyet-dep-lang-man-tho-mong-hung-vi-nhat-the-gioi-1.jpeg",
    },
];

export default function Home() {
    const [preload, setPreload] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setPreload(true);
        }, 500);
        return () => {};
    }, []);

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
                    <SlideShow dataSlides={dataSlides} />
                    <ListItem dataList={dataList} />
                </>
            )}
        </div>
    );
}
