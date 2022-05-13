import React, { useState, useEffect } from "react";
import "./_preview.scss";
import Preloading from "../../../components/Loading";
import SlideDetail from "../../../components/SlideShow/SlideDetail";
import { formatPrice } from "../../../utils/common";
import iphone1 from "../../../assets/image/iphone-13-hong.jpg";
import iphone2 from "../../../assets/image/iPhone-13-mau-hong-jpeg-7940-1622557449.jpg";
import iphone3 from "../../../assets/image/iphone-13.jpg";

const dataSlides = [
  {
    id: 1,
    tite: "We are team ssv",
    bio: "Blog chia sẻ về những thông tin của nhóm và những kiến thức bổ ích khác",
    image: iphone1,
  },
  {
    id: 2,
    tite: "We are team ssv",
    bio: "Blog chia sẻ về những thông tin của nhóm và những kiến thức bổ ích khác",
    image: iphone2,
  },
  {
    id: 3,
    tite: "We are team ssv",
    bio: "Blog chia sẻ về những thông tin của nhóm và những kiến thức bổ ích khác",
    image: iphone3,
  },
];

export default function PreviewPost() {
  const [preload, setPreload] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPreload(true);
    }, 500);
    return () => {};
  }, []);

  return (
    <div className="detail-container containers">
      {!preload ? (
        <Preloading />
      ) : (
        <>
          <div className="row">
            <div className="col-sm-12">
              <div className="detail-left">
                <div className="detail-left-image">
                  <SlideDetail dataSlides={dataSlides} />
                  <div className="detail-time-create">
                    <p>Bài đăng cách đây 5 phút</p>
                  </div>
                </div>
                <div className="detail-left-content">
                  <h4>Iphone 13 promax xanh ngọc</h4>
                  <p>Giá: {formatPrice(15000000)}đ</p>
                </div>
                <div className="detail-left-description">
                  <p>
                    Sản phẩm mua ở shopee cách đây 8 tháng còn bảo hành đến
                    tháng 1 năm 2023
                  </p>
                </div>
                <div className="detail-properties">
                  <div className="row">
                    <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                      <i className="fas fa-tags"></i>
                      <span>Hãng: Apple</span>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                      <i className="fas fa-tags"></i>
                      <span>Tình trạng: Mới</span>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                      <i className="fas fa-tags"></i>
                      <span>Màu sắc: Apple</span>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                      <i className="fas fa-tags"></i>
                      <span>Màu sắc: Apple</span>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                      <i className="fas fa-tags"></i>
                      <span>Màu sắc: Apple</span>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                      <i className="fas fa-tags"></i>
                      <span>Màu sắc: Apple</span>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                      <i className="fas fa-tags"></i>
                      <span>Màu sắc: Apple</span>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                      <i className="fas fa-tags"></i>
                      <span>Màu sắc: Apple</span>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-lg-4 itemt-property">
                      <i className="fas fa-tags"></i>
                      <span>Màu sắc: Apple</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
