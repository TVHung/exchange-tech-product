import React from "react";
import "./_categories.scss";
import { Grid } from "@material-ui/core";
import imgLaptop from "../../assets/image/imgtest.png";
import imgPhone from "../../assets/image/phoneTest.png";
import imgPc from "../../assets/image/pcTest.png";

export default function Categories() {
  return (
    <div className="cagoriesContainer">
      <div>
        <div className="category-title mt-3">
          <h4>Khám phá danh mục</h4>
        </div>
        <div className="container mt-4">
          <div className="row">
            <div className="col-sm-4 text-center category-item">
              <img src={imgPhone} alt="category" />
              <h4>Điện thoại, máy tính bảng</h4>
            </div>
            <div className="col-sm-4 text-center category-item">
              <img src={imgLaptop} alt="category" />
              <h4>Laptop</h4>
            </div>
            <div className="col-sm-4 text-center category-item">
              <img src={imgPc} alt="category" />
              <h4>PC</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
