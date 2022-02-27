import React from "react";
import "./_itemSearch.scss";

export default function ItemSearch() {
  return (
    <div>
      <div className="post-result py-2 px-2 pb-2">
        <div className="row">
          <div className="col-lg-3">
            {" "}
            <img
              src="https://image.thanhnien.vn/w1024/Uploaded/2022/xdrkxrvekx/2022_01_26/ip-4546.png"
              alt=""
              className="post-result-img"
            />{" "}
          </div>
          <div className="col-lg-9">
            <div className="d-md-flex align-items-md-center">
              <div className="name">Iphone 13 pro component</div>
              <div className="ms-auto code">Hà nội</div>
            </div>
            <div className="rating">
              {" "}
              <span className="fas fa-star"></span>{" "}
              <span className="fas fa-star"></span>{" "}
              <span className="fas fa-star"></span>{" "}
              <span className="fas fa-star"></span>{" "}
              <span className="far fa-star"></span>
            </div>
            <div className="d-flex flex-column tags pt-1">
              <div>
                <i className="fas fa-dollar-sign"></i> Miễn phí
              </div>
              <div>
                <i className="fas fa-memory"></i> 4GB
              </div>
              <div>
                <i class="fas fa-hdd"></i> 512GB
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-1">
          <div className="btn enquiry  mx-2">Liện hệ</div>
          <div className="btn btn-primary ">Chi tiết</div>
        </div>
      </div>
    </div>
  );
}
