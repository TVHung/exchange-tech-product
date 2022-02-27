import React, { useState } from "react";
import "./_search.scss";
import { Collapse, Button } from "react-bootstrap";
import Breadcrumb from "./../../components/Breadcrumb/index";
import { searchBreadcrumb } from "../../constants/breadcrumData";
import ItemSearch from "../../components/Items/ItemSearch";
import NotFound from "../../components/NotFound";

export default function Search() {
  const [open, setOpen] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const showHideCollapse = (type) => {
    switch (type) {
      case "price":
        setOpenPrice(!openPrice);
        break;
      case "category":
        setOpenCategory(!openCategory);
        break;
      default:
        break;
    }
  };

  return (
    <div className="background-search">
      <div className="container search-container">
        <div id="content">
          <Breadcrumb arrLink={searchBreadcrumb} />
          <div className="d-flex justify-content-end ms-auto py-sm-3 filter-header">
            <div className="form-check filter-header-sort">
              <span>
                <i className="fas fa-funnel-dollar"></i>
                {` Sắp xếp theo`}
              </span>
            </div>
            <div className="form-check filter-header-sort">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                <i className="fas fa-sort-amount-down-alt"></i>
                {` Giá thấp `}
                <i className="fas fa-long-arrow-alt-right"></i>
                {` cao`}
              </label>
            </div>
            <div className="form-check filter-header-sort">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                <i className="fas fa-sort-amount-up-alt"></i>
                {` Giá cao `}
                <i className="fas fa-long-arrow-alt-right"></i>
                {` thấp`}
              </label>
            </div>
          </div>
          <div className="d-sm-flex">
            <div className="me-sm-2">
              <div id="filter" className="p-2">
                <div className="border-bottom-custom h5 pb-2 text-uppercase box-label">
                  <i className="fas fa-sort"></i>
                  {` Bộ lọc`}
                </div>
                <div className="box border-bottom-custom">
                  <div className="box-label text-uppercase d-flex align-items-center">
                    Loại sản phẩm{" "}
                    <button
                      className="btn ms-auto  collapse-filter"
                      name="price"
                      onClick={() => showHideCollapse("category")}
                      aria-controls="collpase-category-filter"
                      aria-expanded={openCategory}
                    >
                      {" "}
                      {openCategory ? (
                        <i className="fas fa-minus"></i>
                      ) : (
                        <i className="fas fa-plus"></i>
                      )}{" "}
                    </button>
                  </div>
                  <Collapse in={openCategory}>
                    <div id="collpase-category-filter">
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Tất cả <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Mobile
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Laptop
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Pc <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                    </div>
                  </Collapse>
                </div>
                <div className="box border-bottom-custom">
                  <div className="box-label text-uppercase d-flex align-items-center">
                    Giá{" "}
                    <button
                      className="btn ms-auto collapse-filter"
                      name="price"
                      onClick={() => showHideCollapse("price")}
                      aria-controls="collpase-price-filter"
                      aria-expanded={openPrice}
                    >
                      {" "}
                      {openPrice ? (
                        <i className="fas fa-minus"></i>
                      ) : (
                        <i className="fas fa-plus"></i>
                      )}{" "}
                    </button>
                  </div>
                  <Collapse in={openPrice}>
                    <div id="collpase-price-filter">
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Nhỏ hơn 500.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          500.000đ - 1.000.000đ
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          1.000.000đ - 2.000.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          2.000.000đ - 4.000.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          4.000.000đ - 8.000.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          8.000.000đ - 10.000.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Lớn hơn 10.000.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                    </div>
                  </Collapse>
                </div>
                <div className="box border-bottom-custom">
                  <div className="box-label text-uppercase d-flex align-items-center">
                    Loại sản phẩm{" "}
                    <button
                      className="btn ms-auto  collapse-filter"
                      name="price"
                      onClick={() => showHideCollapse("category")}
                      aria-controls="collpase-category-filter"
                      aria-expanded={openCategory}
                    >
                      {" "}
                      {openCategory ? (
                        <i className="fas fa-minus"></i>
                      ) : (
                        <i className="fas fa-plus"></i>
                      )}{" "}
                    </button>
                  </div>
                  <Collapse in={openCategory}>
                    <div id="collpase-category-filter">
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Tất cả <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Mobile
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Laptop
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Pc <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                    </div>
                  </Collapse>
                </div>
                <div className="box border-bottom-custom">
                  <div className="box-label text-uppercase d-flex align-items-center">
                    Giá{" "}
                    <button
                      className="btn ms-auto collapse-filter"
                      name="price"
                      onClick={() => showHideCollapse("price")}
                      aria-controls="collpase-price-filter"
                      aria-expanded={openPrice}
                    >
                      {" "}
                      {openPrice ? (
                        <i className="fas fa-minus"></i>
                      ) : (
                        <i className="fas fa-plus"></i>
                      )}{" "}
                    </button>
                  </div>
                  <Collapse in={openPrice}>
                    <div id="collpase-price-filter">
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Nhỏ hơn 500.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          500.000đ - 1.000.000đ
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          1.000.000đ - 2.000.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          2.000.000đ - 4.000.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          4.000.000đ - 8.000.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          8.000.000đ - 10.000.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Lớn hơn 10.000.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                    </div>
                  </Collapse>
                </div>
                <div className="box border-bottom-custom">
                  <div className="box-label text-uppercase d-flex align-items-center">
                    Loại sản phẩm{" "}
                    <button
                      className="btn ms-auto  collapse-filter"
                      name="price"
                      onClick={() => showHideCollapse("category")}
                      aria-controls="collpase-category-filter"
                      aria-expanded={openCategory}
                    >
                      {" "}
                      {openCategory ? (
                        <i className="fas fa-minus"></i>
                      ) : (
                        <i className="fas fa-plus"></i>
                      )}{" "}
                    </button>
                  </div>
                  <Collapse in={openCategory}>
                    <div id="collpase-category-filter">
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Tất cả <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Mobile
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Laptop
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Pc <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                    </div>
                  </Collapse>
                </div>
                <div className="box border-bottom-custom">
                  <div className="box-label text-uppercase d-flex align-items-center">
                    Giá{" "}
                    <button
                      className="btn ms-auto collapse-filter"
                      name="price"
                      onClick={() => showHideCollapse("price")}
                      aria-controls="collpase-price-filter"
                      aria-expanded={openPrice}
                    >
                      {" "}
                      {openPrice ? (
                        <i className="fas fa-minus"></i>
                      ) : (
                        <i className="fas fa-plus"></i>
                      )}{" "}
                    </button>
                  </div>
                  <Collapse in={openPrice}>
                    <div id="collpase-price-filter">
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Nhỏ hơn 500.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          500.000đ - 1.000.000đ
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          1.000.000đ - 2.000.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          2.000.000đ - 4.000.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          4.000.000đ - 8.000.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          8.000.000đ - 10.000.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Lớn hơn 10.000.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                    </div>
                  </Collapse>
                </div>
                <div className="box border-bottom-custom">
                  <div className="box-label text-uppercase d-flex align-items-center">
                    Loại sản phẩm{" "}
                    <button
                      className="btn ms-auto  collapse-filter"
                      name="price"
                      onClick={() => showHideCollapse("category")}
                      aria-controls="collpase-category-filter"
                      aria-expanded={openCategory}
                    >
                      {" "}
                      {openCategory ? (
                        <i className="fas fa-minus"></i>
                      ) : (
                        <i className="fas fa-plus"></i>
                      )}{" "}
                    </button>
                  </div>
                  <Collapse in={openCategory}>
                    <div id="collpase-category-filter">
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Tất cả <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Mobile
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Laptop
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Pc <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                    </div>
                  </Collapse>
                </div>
                <div className="box border-bottom-custom">
                  <div className="box-label text-uppercase d-flex align-items-center">
                    Giá{" "}
                    <button
                      className="btn ms-auto collapse-filter"
                      name="price"
                      onClick={() => showHideCollapse("price")}
                      aria-controls="collpase-price-filter"
                      aria-expanded={openPrice}
                    >
                      {" "}
                      {openPrice ? (
                        <i className="fas fa-minus"></i>
                      ) : (
                        <i className="fas fa-plus"></i>
                      )}{" "}
                    </button>
                  </div>
                  <Collapse in={openPrice}>
                    <div id="collpase-price-filter">
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Nhỏ hơn 500.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          500.000đ - 1.000.000đ
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          1.000.000đ - 2.000.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          2.000.000đ - 4.000.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          4.000.000đ - 8.000.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          8.000.000đ - 10.000.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Lớn hơn 10.000.000đ <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                    </div>
                  </Collapse>
                </div>
              </div>
            </div>
            <div className="bg-white p-2" id="search-result">
              <ItemSearch />
              <ItemSearch />
              <ItemSearch />
              <ItemSearch />
              <ItemSearch />
              {/* <NotFound /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
