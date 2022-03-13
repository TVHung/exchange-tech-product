import React, { useState, useEffect } from "react";
import "./_search.scss";
import { Collapse, Button } from "react-bootstrap";
import Breadcrumb from "./../../components/Breadcrumb/index";
import { searchBreadcrumb } from "../../constants/breadcrumData";
import ItemSearch from "../../components/Items/ItemSearch";
import NotFound from "../../components/NotFound";
import { useSelector, useDispatch } from "react-redux";
import { deleteParam, insertParam } from "../../utils/common";
import { searchPostByName } from "../../redux/actions/postActions";
import { useHistory } from "react-router-dom";
import { filterPriceData } from "../../constants";

export default function Search() {
  const [open, setOpen] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [openGuarantee, setOpenGuarantee] = useState(false);
  const [openStorageType, setOpenStorageType] = useState(false);
  const [openStorage, setOpenStorage] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openRam, setOpenRam] = useState(false);
  const [openDisplaySize, setOpenDisplaySize] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);
  const [searchValue, setsearchValue] = useState("");

  const history = useHistory();

  const insertParams = (key, value) => {
    let params = insertParam(key, value);
    history.push({
      pathname: "/search",
      search: `?${params}`,
    });
  };

  const showHideCollapse = (type) => {
    switch (type) {
      case "category":
        setOpenCategory(!openCategory);
        break;
      case "price":
        setOpenPrice(!openPrice);
        break;
      case "video":
        setOpenVideo(!openVideo);
        break;
      case "guarantee":
        setOpenGuarantee(!openGuarantee);
        break;
      case "storage_type":
        setOpenStorageType(!openStorageType);
        break;
      case "storage":
        setOpenStorage(!openStorage);
        break;
      case "status":
        setOpenStatus(!openStatus);
        break;
      case "ram":
        setOpenRam(!openRam);
        break;
      case "display_size":
        setOpenDisplaySize(!openDisplaySize);
        break;
      case "card":
        setOpenCard(!openCard);
        break;
      case "brand":
        setOpenBrand(!openBrand);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setsearchValue(params.get("search"));
  }, [searchValue]);

  const get_post_search = useSelector((state) => state.post.search_result);

  const onChangeCheckSort = (e) => {
    const { id } = e.target;
    if (id == "low-hight") {
      insertParams("sort", "asc");
    }
    if (id == "hight-low") {
      insertParams("sort", "desc");
    }
  };
  const onChangeCheckCategory = (e) => {
    const { name } = e.target;
    let value = "";
    if (name == "mobile") {
      value += "1";
      // insertParam("category", "1");
    }
    if (name == "laptop") {
      value += value.length > 0 ? "_2" : "2";
      // insertParam("category", "2");
    }
    if (name == "pc") {
      value += value.length > 0 ? "_3" : "3";
      // insertParam("category", "3");
    }
    insertParams("category", value);
  };

  const onChangePrice = (e) => {
    const { value, checked } = e.target;
    insertParams("price", value);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchPostByName(window.location.search));
  }, [window.location.search]);

  const deletePara = () => {
    deleteParam("price");
  };

  return (
    <div className="background-search">
      <div className="container search-container">
        <div id="content">
          <Breadcrumb arrLink={searchBreadcrumb} />
          {/* <button onClick={() => deletePara()}>delete</button> */}
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
                name="sort"
                id="low-hight"
                onChange={(e) => onChangeCheckSort(e)}
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
                name="sort"
                id="hight-low"
                onChange={(e) => onChangeCheckSort(e)}
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
                      className="btn ms-auto collapse-filter"
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
                          Mobile
                          <input
                            type="checkbox"
                            name="mobile"
                            onChange={(e) => onChangeCheckCategory(e)}
                          />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Laptop
                          <input
                            type="checkbox"
                            name="laptop"
                            onChange={(e) => onChangeCheckCategory(e)}
                          />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Pc{" "}
                          <input
                            type="checkbox"
                            name="pc"
                            onChange={(e) => onChangeCheckCategory(e)}
                          />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                    </div>
                  </Collapse>
                </div>
                <div className="box border-bottom-custom">
                  <div
                    className="box-label text-uppercase d-flex align-items-center"
                    onClick={() => showHideCollapse("price")}
                  >
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
                      {filterPriceData.map((data, index) => (
                        <div className="my-1" key={index}>
                          {" "}
                          <label className="tick">
                            {data.value}{" "}
                            <input
                              id={`price${index}`}
                              type="checkbox"
                              value={data.id}
                              onClick={(e) => onChangePrice(e)}
                            />{" "}
                            <span className="check"></span>{" "}
                          </label>{" "}
                        </div>
                      ))}
                    </div>
                  </Collapse>
                </div>
                <div className="box border-bottom-custom">
                  <div className="box-label text-uppercase d-flex align-items-center">
                    Video{" "}
                    <button
                      className="btn ms-auto  collapse-filter"
                      name="price"
                      onClick={() => showHideCollapse("video")}
                      aria-controls="collpase-category-filter"
                      aria-expanded={openVideo}
                    >
                      {" "}
                      {openVideo ? (
                        <i className="fas fa-minus"></i>
                      ) : (
                        <i className="fas fa-plus"></i>
                      )}{" "}
                    </button>
                  </div>
                  <Collapse in={openVideo}>
                    <div id="collpase-category-filter">
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Có video <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Không có video
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                    </div>
                  </Collapse>
                </div>
                <div className="box border-bottom-custom">
                  <div className="box-label text-uppercase d-flex align-items-center">
                    Bảo hành{" "}
                    <button
                      className="btn ms-auto collapse-filter"
                      name="price"
                      onClick={() => showHideCollapse("guarantee")}
                      aria-controls="collpase-price-filter"
                      aria-expanded={openGuarantee}
                    >
                      {" "}
                      {openGuarantee ? (
                        <i className="fas fa-minus"></i>
                      ) : (
                        <i className="fas fa-plus"></i>
                      )}{" "}
                    </button>
                  </div>
                  <Collapse in={openGuarantee}>
                    <div id="collpase-price-filter">
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Nhỏ hơn 3 tháng
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          3 đến 6 tháng
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          6 đến 12 tháng <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Lớn hơn 12 tháng <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                    </div>
                  </Collapse>
                </div>
                <div className="box border-bottom-custom">
                  <div className="box-label text-uppercase d-flex align-items-center">
                    Loại ổ cứng{" "}
                    <button
                      className="btn ms-auto  collapse-filter"
                      name="price"
                      onClick={() => showHideCollapse("storage_type")}
                      aria-controls="collpase-category-filter"
                      aria-expanded={openStorageType}
                    >
                      {" "}
                      {openStorageType ? (
                        <i className="fas fa-minus"></i>
                      ) : (
                        <i className="fas fa-plus"></i>
                      )}{" "}
                    </button>
                  </div>
                  <Collapse in={openStorageType}>
                    <div id="collpase-category-filter">
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          HDD
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          SDD
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          SSHD <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                    </div>
                  </Collapse>
                </div>
                <div className="box border-bottom-custom">
                  <div className="box-label text-uppercase d-flex align-items-center">
                    Bộ nhớ{" "}
                    <button
                      className="btn ms-auto collapse-filter"
                      name="price"
                      onClick={() => showHideCollapse("storage")}
                      aria-controls="collpase-price-filter"
                      aria-expanded={openStorage}
                    >
                      {" "}
                      {openStorage ? (
                        <i className="fas fa-minus"></i>
                      ) : (
                        <i className="fas fa-plus"></i>
                      )}{" "}
                    </button>
                  </div>
                  <Collapse in={openStorage}>
                    <div id="collpase-price-filter">
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Nhỏ hơn 8GB <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          8GB đến 16GB
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          16GB đến 32GB <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          32GB đến 64GB <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          64GB đến 128GB <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          128GB đến 256GB <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          256GB đến 512GB <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          512GB đến 1TB <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Lớn hơn 1TB <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                    </div>
                  </Collapse>
                </div>
                <div className="box border-bottom-custom">
                  <div className="box-label text-uppercase d-flex align-items-center">
                    Trạng thái sản phẩm{" "}
                    <button
                      className="btn ms-auto  collapse-filter"
                      name="price"
                      onClick={() => showHideCollapse("status")}
                      aria-controls="collpase-category-filter"
                      aria-expanded={openStatus}
                    >
                      {" "}
                      {openStatus ? (
                        <i className="fas fa-minus"></i>
                      ) : (
                        <i className="fas fa-plus"></i>
                      )}{" "}
                    </button>
                  </div>
                  <Collapse in={openStatus}>
                    <div id="collpase-category-filter">
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Mới
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Cũ (90 đến 99%)
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Cũ (&lt;90%) <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                    </div>
                  </Collapse>
                </div>
                <div className="box border-bottom-custom">
                  <div className="box-label text-uppercase d-flex align-items-center">
                    Ram{" "}
                    <button
                      className="btn ms-auto collapse-filter"
                      name="price"
                      onClick={() => showHideCollapse("ram")}
                      aria-controls="collpase-price-filter"
                      aria-expanded={openRam}
                    >
                      {" "}
                      {openRam ? (
                        <i className="fas fa-minus"></i>
                      ) : (
                        <i className="fas fa-plus"></i>
                      )}{" "}
                    </button>
                  </div>
                  <Collapse in={openRam}>
                    <div id="collpase-price-filter">
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Nhỏ hơn 4GB <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          4GB đến 8GB
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          8GB đến 16GB <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          16GB đến 32GB <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          32GB đến 64GB <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Lớn hơn 64GB <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                    </div>
                  </Collapse>
                </div>
                <div className="box border-bottom-custom">
                  <div className="box-label text-uppercase d-flex align-items-center">
                    Kích thước màn hình{" "}
                    <button
                      className="btn ms-auto collapse-filter"
                      name="price"
                      onClick={() => showHideCollapse("display_size")}
                      aria-controls="collpase-price-filter"
                      aria-expanded={openDisplaySize}
                    >
                      {" "}
                      {openDisplaySize ? (
                        <i className="fas fa-minus"></i>
                      ) : (
                        <i className="fas fa-plus"></i>
                      )}{" "}
                    </button>
                  </div>
                  <Collapse in={openDisplaySize}>
                    <div id="collpase-price-filter">
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          &lt;13 inch <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          13 - 13.9 inch
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          14 - 14.9 inch <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          15 - 15.9 inch <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          &gt;16 inch <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                    </div>
                  </Collapse>
                </div>
                <div className="box border-bottom-custom">
                  <div className="box-label text-uppercase d-flex align-items-center">
                    Card màn hình{" "}
                    <button
                      className="btn ms-auto collapse-filter"
                      name="price"
                      onClick={() => showHideCollapse("card")}
                      aria-controls="collpase-price-filter"
                      aria-expanded={openCard}
                    >
                      {" "}
                      {openCard ? (
                        <i className="fas fa-minus"></i>
                      ) : (
                        <i className="fas fa-plus"></i>
                      )}{" "}
                    </button>
                  </div>
                  <Collapse in={openCard}>
                    <div id="collpase-price-filter">
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Có <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Không
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                    </div>
                  </Collapse>
                </div>
                <div className="box border-bottom-custom">
                  <div className="box-label text-uppercase d-flex align-items-center">
                    Hãng{" "}
                    <button
                      className="btn ms-auto collapse-filter"
                      name="price"
                      onClick={() => showHideCollapse("brand")}
                      aria-controls="collpase-price-filter"
                      aria-expanded={openBrand}
                    >
                      {" "}
                      {openBrand ? (
                        <i className="fas fa-minus"></i>
                      ) : (
                        <i className="fas fa-plus"></i>
                      )}{" "}
                    </button>
                  </div>
                  <Collapse in={openBrand}>
                    <div id="collpase-price-filter">
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Apple <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Samsung
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Dell <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                      <div className="my-1">
                        {" "}
                        <label className="tick">
                          Asus
                          <input type="checkbox" />{" "}
                          <span className="check"></span>{" "}
                        </label>{" "}
                      </div>
                    </div>
                  </Collapse>
                </div>
              </div>
            </div>
            <div className="bg-white p-2" id="search-result">
              <div className="search-result-status">
                <div className="search-result-count">
                  {get_post_search.length > 0 ? (
                    <p>
                      Có <b>{get_post_search.length}</b> sản phẩm phù hợp với
                      tiêu chí của bản
                    </p>
                  ) : (
                    <p>Không tìm thấy kết quả phù hợp</p>
                  )}
                </div>
              </div>
              <div>
                {get_post_search.length > 0 ? (
                  <>
                    {get_post_search &&
                      get_post_search.map((data, index) => (
                        <div key={index}>
                          <ItemSearch data={data} />
                        </div>
                      ))}
                  </>
                ) : (
                  <NotFound />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
