import React from "react";
import { Grid } from "@material-ui/core";
import ItemSearch from "../../Items/ItemSearch";

const data = [
  {
    id: 1,
    user_id: 1,
    is_trade: 0,
    post_trade_id: 2,
    title: "day la san pham 1",
    category_id: 1,
    category: "Mobile",
    name: "Iphone 13",
    description:
      "Vi xử lý: Intel Core i5 11400H, 6 nhân / 12 luồng Màn hình: 15.6 FullHD IPS 144Hz (1920 x 1080), màn nhám Độ phủ màu: 65% sRGB",
    ram: 6,
    storage: 64,
    status: "Mới",
    price: "400000",
    address: "Minh khai, Hai bà trưng, Hà nội",
    public_status: 1,
    guarantee: 2,
    images: [
      {
        id: 1,
        is_banner: 1,
        image_url:
          "https://media.vneconomy.vn/w800/images/upload/2021/12/29/iphone-13-pro-max.jpg",
        post_id: 1,
        created_at: null,
        updated_at: null,
      },
      {
        id: 2,
        is_banner: 0,
        image_url:
          "https://bachlongmobile.com/bnews/wp-content/uploads/2021/09/tren-tay-thuc-te-iphone-13-pro-max-819x1024.jpg",
        post_id: 1,
        created_at: null,
        updated_at: null,
      },
      {
        id: 3,
        is_banner: 0,
        image_url:
          "https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/uploads/images/tin-tuc/138687/Originals/Tren-tay-iphone-13-mini-2.jpg",
        post_id: 1,
        created_at: null,
        updated_at: null,
      },
    ],
    created_at: "2022-02-08T17:07:15.000000Z",
    updated_at: null,
  },
  {
    id: 2,
    user_id: 1,
    is_trade: 0,
    post_trade_id: 2,
    title: "day la san pham 2",
    category_id: 1,
    category: "Mobile",
    name: "Iphone 14",
    description:
      "Vi xử lý: Intel Core i5 11400H, 6 nhân / 12 luồng Màn hình: 15.6 FullHD IPS 144Hz (1920 x 1080), màn nhám Độ phủ màu: 65% sRGB",
    ram: 6,
    storage: 64,
    status: "Mới",
    price: "400000",
    address: "Minh khai, Hai bà trưng, Hà nội",
    public_status: 1,
    guarantee: 2,
    images: [
      {
        id: 4,
        is_banner: 1,
        image_url:
          "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/10/19/637702682508615222_macbook-pro-16-2021-xam-1.jpg",
        post_id: 2,
        created_at: null,
        updated_at: null,
      },
      {
        id: 5,
        is_banner: 0,
        image_url:
          "https://static.remove.bg/remove-bg-web/d450d501f6500a09e72d0e306a5d62768359d9fa/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png",
        post_id: 2,
        created_at: null,
        updated_at: null,
      },
      {
        id: 6,
        is_banner: 0,
        image_url:
          "http://www.maccenter.vn/Adv_Images/Banner-MacBookPro-2021-1.jpg",
        post_id: 2,
        created_at: null,
        updated_at: null,
      },
    ],
    created_at: "2022-02-08T17:07:15.000000Z",
    updated_at: null,
  },
  {
    id: 3,
    user_id: 1,
    is_trade: 0,
    post_trade_id: 2,
    title: "day la san pham 3",
    category_id: 1,
    category: "Mobile",
    name: "Iphone 15",
    description:
      "Vi xử lý: Intel Core i5 11400H, 6 nhân / 12 luồng Màn hình: 15.6 FullHD IPS 144Hz (1920 x 1080), màn nhám Độ phủ màu: 65% sRGB",
    ram: 6,
    storage: 64,
    status: "Mới",
    price: "8200000",
    address: "Minh khai, Hai bà trưng, Hà nội",
    public_status: 1,
    guarantee: 2,
    images: [
      {
        id: 7,
        is_banner: 1,
        image_url:
          "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/10/19/637702682508615222_macbook-pro-16-2021-xam-1.jpg",
        post_id: 3,
        created_at: null,
        updated_at: null,
      },
      {
        id: 8,
        is_banner: 0,
        image_url:
          "https://static.remove.bg/remove-bg-web/d450d501f6500a09e72d0e306a5d62768359d9fa/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png",
        post_id: 3,
        created_at: null,
        updated_at: null,
      },
      {
        id: 9,
        is_banner: 0,
        image_url:
          "http://www.maccenter.vn/Adv_Images/Banner-MacBookPro-2021-1.jpg",
        post_id: 3,
        created_at: null,
        updated_at: null,
      },
    ],
    created_at: "2022-02-08T17:07:15.000000Z",
    updated_at: null,
  },
  {
    id: 4,
    user_id: 1,
    is_trade: 0,
    post_trade_id: 2,
    title: "day la san pham 4",
    category_id: 2,
    category: "Laptop",
    name: "Iphone 13",
    description:
      "Vi xử lý: Intel Core i5 11400H, 6 nhân / 12 luồng Màn hình: 15.6 FullHD IPS 144Hz (1920 x 1080), màn nhám Độ phủ màu: 65% sRGB",
    ram: 6,
    storage: 64,
    status: "Mới",
    price: "2900000",
    address: "Minh khai, Hai bà trưng, Hà nội",
    public_status: 1,
    guarantee: 2,
    images: [
      {
        id: 10,
        is_banner: 1,
        image_url:
          "https://media.vneconomy.vn/w800/images/upload/2021/12/29/iphone-13-pro-max.jpg",
        post_id: 4,
        created_at: null,
        updated_at: null,
      },
      {
        id: 11,
        is_banner: 0,
        image_url:
          "https://bachlongmobile.com/bnews/wp-content/uploads/2021/09/tren-tay-thuc-te-iphone-13-pro-max-819x1024.jpg",
        post_id: 4,
        created_at: null,
        updated_at: null,
      },
      {
        id: 12,
        is_banner: 0,
        image_url:
          "https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/uploads/images/tin-tuc/138687/Originals/Tren-tay-iphone-13-mini-2.jpg",
        post_id: 4,
        created_at: null,
        updated_at: null,
      },
    ],
    created_at: "2022-02-08T17:07:15.000000Z",
    updated_at: null,
  },
  {
    id: 5,
    user_id: 1,
    is_trade: 1,
    post_trade_id: 2,
    title: "day la san pham 5",
    category_id: 2,
    category: "Laptop",
    name: "Iphone 14",
    description:
      "Vi xử lý: Intel Core i5 11400H, 6 nhân / 12 luồng Màn hình: 15.6 FullHD IPS 144Hz (1920 x 1080), màn nhám Độ phủ màu: 65% sRGB",
    ram: 6,
    storage: 64,
    status: "Mới",
    price: "9900000",
    address: "Minh khai, Hai bà trưng, Hà nội",
    public_status: 1,
    guarantee: 2,
    images: [
      {
        id: 13,
        is_banner: 1,
        image_url:
          "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/10/19/637702682508615222_macbook-pro-16-2021-xam-1.jpg",
        post_id: 5,
        created_at: null,
        updated_at: null,
      },
      {
        id: 14,
        is_banner: 0,
        image_url:
          "https://static.remove.bg/remove-bg-web/d450d501f6500a09e72d0e306a5d62768359d9fa/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png",
        post_id: 5,
        created_at: null,
        updated_at: null,
      },
      {
        id: 15,
        is_banner: 0,
        image_url:
          "http://www.maccenter.vn/Adv_Images/Banner-MacBookPro-2021-1.jpg",
        post_id: 5,
        created_at: null,
        updated_at: null,
      },
    ],
    created_at: "2022-02-08T17:07:15.000000Z",
    updated_at: null,
  },
  {
    id: 6,
    user_id: 1,
    is_trade: 1,
    post_trade_id: 2,
    title: "day la san pham 6",
    category_id: 2,
    category: "Laptop",
    name: "Iphone 15",
    description:
      "Vi xử lý: Intel Core i5 11400H, 6 nhân / 12 luồng Màn hình: 15.6 FullHD IPS 144Hz (1920 x 1080), màn nhám Độ phủ màu: 65% sRGB",
    ram: 6,
    storage: 64,
    status: "Mới",
    price: "4400000",
    address: "Yên Phụ, Yên Phong, Bắc Ninh",
    public_status: 1,
    guarantee: 2,
    images: [
      {
        id: 16,
        is_banner: 1,
        image_url:
          "https://images.fpt.shop/unsafe/fit-in/585x390/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/10/19/637702682508615222_macbook-pro-16-2021-xam-1.jpg",
        post_id: 6,
        created_at: null,
        updated_at: null,
      },
      {
        id: 17,
        is_banner: 0,
        image_url:
          "https://static.remove.bg/remove-bg-web/d450d501f6500a09e72d0e306a5d62768359d9fa/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png",
        post_id: 6,
        created_at: null,
        updated_at: null,
      },
      {
        id: 18,
        is_banner: 0,
        image_url:
          "http://www.maccenter.vn/Adv_Images/Banner-MacBookPro-2021-1.jpg",
        post_id: 6,
        created_at: null,
        updated_at: null,
      },
    ],
    created_at: "2022-02-08T17:07:15.000000Z",
    updated_at: null,
  },
];

export default function ListPost() {
  return (
    <div style={{ paddingTop: 10 }}>
      <h2>Bài viết đã đăng</h2>
      <Grid container spacing={3} alignItems="stretch">
        {data.map((item) => (
          <Grid key={item.id} item xs={12}>
            <ItemSearch data={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
