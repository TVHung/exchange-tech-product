import React, { useEffect, useState } from "react";
import "./_compareView.scss";
import img from "../../assets/image/product-default.png";
import {
  apiProductCompare,
  commandData,
  resolutionData,
} from "./../../constants/index";
import axios from "axios";
import { formatPrice, getValueInArrayObjectWithId } from "./../../utils/common";
import Loading from "./../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setListCompare } from "../../redux/actions/postActions";

export default function CompareView() {
  const [compareProducts, setCompareProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const list_compare = useSelector((state) => state.post.list_compare);

  useEffect(() => {
    console.log("danh sach", list_compare);
    if (list_compare) {
      getAllProductCompare();
    }
    if (list_compare === "") setCompareProducts([]);
  }, [list_compare]);

  useEffect(() => {
    return () => {
      setCompareProducts([]);
      setIsLoading();
    };
  }, []);

  const getAllProductCompare = async () => {
    const data = {
      array_id: localStorage.getItem("array_id_compare"),
    };
    axios
      .post(apiProductCompare, data)
      .then((res) => {
        console.log("data", res.data.data);
        setCompareProducts(res.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const deleteProduct = (id) => {
    let current = localStorage.getItem("array_id_compare");
    let arrId = [];
    if (current) arrId = current.split(",");
    if (arrId.includes(id.toString())) {
      arrId.pop(id);
      current = arrId.length > 1 ? arrId.join(",") : arrId.join("");
      localStorage.setItem("array_id_compare", current);
      dispatch(setListCompare(current));
      if (arrId.length === 0) localStorage.removeItem("current_category");
    }
  };

  return (
    <div className="compare-container container">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="title-detail">
            <div className="row">
              <div className="col-12">
                <h5>So sánh sản phẩm</h5>
              </div>
            </div>
          </div>
          <div className="basic-infor">
            <div className="row">
              <div className="col-4 product-header-wrap">
                {compareProducts[0] ? (
                  <div className="product-header position-relative">
                    <div className="image-selected">
                      <img
                        src={compareProducts[0]?.images[0]?.image_url || img}
                        alt=""
                        width="100%"
                      />
                    </div>
                    <h5>{compareProducts[0]?.name}</h5>
                    <p>{formatPrice(compareProducts[0]?.price)} vnđ</p>
                    <div
                      className="position-absolute delete-product"
                      title="Xóa"
                      onClick={() => deleteProduct(compareProducts[0]?.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center align-items-center w-100 h-100 min-h-200">
                    <p>Không có sản phẩm so sánh</p>
                  </div>
                )}
              </div>
              <div className="col-4 product-header-wrap col-center">
                {compareProducts[1] ? (
                  <div className="product-header position-relative">
                    <div className="image-selected">
                      <img
                        src={compareProducts[1]?.images[0]?.image_url || img}
                        alt="product-compare"
                        width="100%"
                      />
                    </div>
                    <h5>{compareProducts[1]?.name}</h5>
                    <p>{formatPrice(compareProducts[1]?.price)} vnđ</p>
                    <div
                      className="position-absolute delete-product"
                      title="Xóa"
                      onClick={() => deleteProduct(compareProducts[1]?.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center align-items-center w-100 h-100 min-h-200">
                    <p>Không có sản phẩm so sánh</p>
                  </div>
                )}
              </div>
              <div className="col-4 product-header-wrap">
                {compareProducts[2] ? (
                  <div className="product-header position-relative">
                    {/* <div className="text-center">
                      <img
                        src={compareProducts[2]?.images[0]?.image_url || img}
                        alt="product-compare"
                      />
                    </div> */}
                    <div className="image-selected">
                      <img
                        src={compareProducts[2]?.images[0]?.image_url || img}
                        alt="product-compare"
                        width="100%"
                      />
                    </div>
                    <h5>{compareProducts[2]?.name}</h5>
                    <p>{formatPrice(compareProducts[2]?.price)} vnđ</p>
                    <div
                      className="position-absolute delete-product"
                      title="Xóa"
                      onClick={() => deleteProduct(compareProducts[2]?.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center align-items-center w-100 h-100 min-h-200">
                    <p>Không có sản phẩm so sánh</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="title-detail">
            <div className="row">
              <div className="col-12">
                <h5>Thông số kỹ thuật</h5>
              </div>
            </div>
          </div>
          <div className="detail-infor">
            <div className="row">
              <div className="col-4 product-detail-wrap col-not-center">
                {compareProducts[0] && (
                  <span>
                    <b>Loại sản phẩm:</b> {compareProducts[0]?.category}
                  </span>
                )}
              </div>
              <div className="col-4 product-detail-wrap col-center">
                {compareProducts[1] && (
                  <span>
                    {" "}
                    <b>Loại sản phẩm:</b> {compareProducts[1]?.category}
                  </span>
                )}
              </div>
              <div className="col-4 product-detail-wrap col-not-center">
                {compareProducts[2] && (
                  <span>
                    {" "}
                    <b>Loại sản phẩm:</b> {compareProducts[2]?.category}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-4 product-detail-wrap col-not-center">
                {compareProducts[0] && (
                  <span>
                    <b>Ram:</b> {compareProducts[0]?.ram}GB
                  </span>
                )}
              </div>
              <div className="col-4 product-detail-wrap col-center">
                {compareProducts[1] && (
                  <span>
                    {" "}
                    <b>Ram:</b> {compareProducts[1]?.ram}GB
                  </span>
                )}
              </div>
              <div className="col-4 product-detail-wrap col-not-center">
                {compareProducts[2] && (
                  <span>
                    {" "}
                    <b>Ram:</b> {compareProducts[2]?.ram}GB
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-4 product-detail-wrap col-not-center">
                {compareProducts[0] && (
                  <span>
                    <b>Dung lượng bộ nhớ:</b> {compareProducts[0]?.storage}GB
                  </span>
                )}
              </div>
              <div className="col-4 product-detail-wrap col-center">
                {compareProducts[1] && (
                  <span>
                    {" "}
                    <b>Dung lượng bộ nhớ:</b> {compareProducts[1]?.storage}GB
                  </span>
                )}
              </div>
              <div className="col-4 product-detail-wrap col-not-center">
                {compareProducts[2] && (
                  <span>
                    {" "}
                    <b>Dung lượng bộ nhớ:</b> {compareProducts[2]?.storage}GB
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-4 product-detail-wrap col-not-center">
                {compareProducts[0] && (
                  <span>
                    <b>Tình trạng:</b> {compareProducts[0]?.status_value}
                  </span>
                )}
              </div>
              <div className="col-4 product-detail-wrap col-center">
                {compareProducts[1] && (
                  <span>
                    {" "}
                    <b>Tình trạng:</b> {compareProducts[1]?.status_value}
                  </span>
                )}
              </div>
              <div className="col-4 product-detail-wrap col-not-center">
                {compareProducts[2] && (
                  <span>
                    {" "}
                    <b>Tình trạng:</b> {compareProducts[2]?.status_value}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-4 product-detail-wrap col-not-center">
                {compareProducts[0] && (
                  <span>
                    <b>Bảo hành:</b> {compareProducts[0]?.guarantee} tháng
                  </span>
                )}
              </div>
              <div className="col-4 product-detail-wrap col-center">
                {compareProducts[1] && (
                  <span>
                    {" "}
                    <b>Bảo hành:</b> {compareProducts[1]?.guarantee} tháng
                  </span>
                )}
              </div>
              <div className="col-4 product-detail-wrap col-not-center">
                {compareProducts[2] && (
                  <span>
                    {" "}
                    <b>Bảo hành:</b> {compareProducts[2]?.guarantee} tháng
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-4 product-detail-wrap col-not-center">
                {compareProducts[0] && (
                  <span>
                    <b>Nhu cầu:</b>{" "}
                    {getValueInArrayObjectWithId(
                      commandData,
                      compareProducts[0]?.command
                    )}
                  </span>
                )}
              </div>
              <div className="col-4 product-detail-wrap col-center">
                {compareProducts[1] && (
                  <span>
                    {" "}
                    <b>Nhu cầu:</b>{" "}
                    {getValueInArrayObjectWithId(
                      commandData,
                      compareProducts[1]?.command
                    )}
                  </span>
                )}
              </div>
              <div className="col-4 product-detail-wrap col-not-center">
                {compareProducts[2] && (
                  <span>
                    {" "}
                    <b>Nhu cầu:</b>{" "}
                    {getValueInArrayObjectWithId(
                      commandData,
                      compareProducts[2]?.command
                    )}
                  </span>
                )}
              </div>
            </div>
            {parseInt(compareProducts[0]?.category_id) == 1 && (
              <>
                <div className="row">
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[0] && (
                      <span>
                        <b>Màu sắc:</b>{" "}
                        {compareProducts[0]?.productMobile?.color}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-center">
                    {compareProducts[1] && (
                      <span>
                        {" "}
                        <b>Màu sắc:</b>{" "}
                        {compareProducts[1]?.productMobile?.color}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[2] && (
                      <span>
                        {" "}
                        <b>Màu sắc:</b>{" "}
                        {compareProducts[2]?.productMobile?.color}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[0] && (
                      <span>
                        <b>Hãng sản xuất:</b>{" "}
                        {compareProducts[0]?.productMobile?.brand}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-center">
                    {compareProducts[1] && (
                      <span>
                        {" "}
                        <b>Hãng sản xuất:</b>{" "}
                        {compareProducts[1]?.productMobile?.brand}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[2] && (
                      <span>
                        {" "}
                        <b>Hãng sản xuất:</b>{" "}
                        {compareProducts[2]?.productMobile?.brand}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[0] && (
                      <span>
                        <b>Dung lượng pin:</b>{" "}
                        {compareProducts[0]?.productMobile?.pin} mah
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-center">
                    {compareProducts[1] && (
                      <span>
                        {" "}
                        <b>Dung lượng pin:</b>{" "}
                        {compareProducts[1]?.productMobile?.pin} mah
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[2] && (
                      <span>
                        {" "}
                        <b>Dung lượng pin:</b>{" "}
                        {compareProducts[2]?.productMobile?.pin} mah
                      </span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[0] && (
                      <span>
                        <b>Độ phân giải:</b>{" "}
                        {getValueInArrayObjectWithId(
                          resolutionData,
                          compareProducts[0]?.productMobile?.resolution
                        )}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-center">
                    {compareProducts[1] && (
                      <span>
                        {" "}
                        <b>Độ phân giải:</b>{" "}
                        {getValueInArrayObjectWithId(
                          resolutionData,
                          compareProducts[1]?.productMobile?.resolution
                        )}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[2] && (
                      <span>
                        {" "}
                        <b>Độ phân giải:</b>{" "}
                        {getValueInArrayObjectWithId(
                          resolutionData,
                          compareProducts[2]?.productMobile?.resolution
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </>
            )}
            {parseInt(compareProducts[0]?.category_id) == 2 && (
              <>
                <div className="row">
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[0] && (
                      <span>
                        <b>Màu sắc:</b>{" "}
                        {compareProducts[0]?.productLaptop?.color}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-center">
                    {compareProducts[1] && (
                      <span>
                        {" "}
                        <b>Màu sắc:</b>{" "}
                        {compareProducts[1]?.productLaptop?.color}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[2] && (
                      <span>
                        {" "}
                        <b>Màu sắc:</b>{" "}
                        {compareProducts[2]?.productLaptop?.color}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[0] && (
                      <span>
                        <b>Hãng sản xuất:</b>{" "}
                        {compareProducts[0]?.productLaptop?.brand}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-center">
                    {compareProducts[1] && (
                      <span>
                        {" "}
                        <b>Hãng sản xuất:</b>{" "}
                        {compareProducts[1]?.productLaptop?.brand}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[2] && (
                      <span>
                        {" "}
                        <b>Hãng sản xuất:</b>{" "}
                        {compareProducts[2]?.productLaptop?.brand}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[0] && (
                      <span>
                        <b>CPU:</b> {compareProducts[0]?.productLaptop?.cpu}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-center">
                    {compareProducts[1] && (
                      <span>
                        {" "}
                        <b>CPU:</b> {compareProducts[1]?.productLaptop?.cpu}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[2] && (
                      <span>
                        {" "}
                        <b>CPU:</b> {compareProducts[2]?.productLaptop?.cpu}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[0] && (
                      <span>
                        <b>GPU:</b> {compareProducts[0]?.productLaptop?.gpu}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-center">
                    {compareProducts[1] && (
                      <span>
                        {" "}
                        <b>GPU:</b> {compareProducts[1]?.productLaptop?.gpu}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[2] && (
                      <span>
                        {" "}
                        <b>GPU:</b> {compareProducts[2]?.productLaptop?.gpu}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[0] && (
                      <span>
                        <b>Loại ổ cứng:</b>{" "}
                        {compareProducts[0]?.productLaptop?.storage_type}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-center">
                    {compareProducts[1] && (
                      <span>
                        {" "}
                        <b>Loại ổ cứng:</b>{" "}
                        {compareProducts[1]?.productLaptop?.storage_type}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[2] && (
                      <span>
                        {" "}
                        <b>Loại ổ cứng:</b>{" "}
                        {compareProducts[2]?.productLaptop?.storage_type}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[0] && (
                      <span>
                        <b>Kích thước màn hình:</b>{" "}
                        {compareProducts[0]?.productLaptop?.display_size} inch
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-center">
                    {compareProducts[1] && (
                      <span>
                        {" "}
                        <b>Kích thước màn hình:</b>{" "}
                        {compareProducts[1]?.productLaptop?.display_size} inch
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[2] && (
                      <span>
                        {" "}
                        <b>Kích thước màn hình:</b>{" "}
                        {compareProducts[2]?.productLaptop?.display_size} inch
                      </span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[0] && (
                      <span>
                        <b>Độ phân giải:</b>{" "}
                        {getValueInArrayObjectWithId(
                          resolutionData,
                          compareProducts[0]?.productLaptop?.resolution
                        )}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-center">
                    {compareProducts[1] && (
                      <span>
                        {" "}
                        <b>Độ phân giải:</b>{" "}
                        {getValueInArrayObjectWithId(
                          resolutionData,
                          compareProducts[1]?.productLaptop?.resolution
                        )}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[2] && (
                      <span>
                        {" "}
                        <b>Độ phân giải:</b>{" "}
                        {getValueInArrayObjectWithId(
                          resolutionData,
                          compareProducts[2]?.productLaptop?.resolution
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </>
            )}
            {parseInt(compareProducts[0]?.category_id) == 3 && (
              <>
                <div className="row">
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[0] && (
                      <span>
                        <b>CPU:</b> {compareProducts[0]?.productPc?.cpu}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-center">
                    {compareProducts[1] && (
                      <span>
                        {" "}
                        <b>CPU:</b> {compareProducts[1]?.productPc?.cpu}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[2] && (
                      <span>
                        {" "}
                        <b>CPU:</b> {compareProducts[2]?.productPc?.cpu}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[0] && (
                      <span>
                        <b>GPU:</b> {compareProducts[0]?.productPc?.gpu}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-center">
                    {compareProducts[1] && (
                      <span>
                        {" "}
                        <b>GPU:</b> {compareProducts[1]?.productPc?.gpu}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[2] && (
                      <span>
                        {" "}
                        <b>GPU:</b> {compareProducts[2]?.productPc?.gpu}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[0] && (
                      <span>
                        <b>Loại ổ cứng:</b>{" "}
                        {compareProducts[0]?.productPc?.storage_type}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-center">
                    {compareProducts[1] && (
                      <span>
                        {" "}
                        <b>Loại ổ cứng:</b>{" "}
                        {compareProducts[1]?.productPc?.storage_type}
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[2] && (
                      <span>
                        {" "}
                        <b>Loại ổ cứng:</b>{" "}
                        {compareProducts[2]?.productPc?.storage_type}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[0] && (
                      <span>
                        <b>Kích thước màn hình:</b>{" "}
                        {compareProducts[0]?.productPc?.display_size} inch
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-center">
                    {compareProducts[1] && (
                      <span>
                        {" "}
                        <b>Kích thước màn hình:</b>{" "}
                        {compareProducts[1]?.productPc?.display_size} inch
                      </span>
                    )}
                  </div>
                  <div className="col-4 product-detail-wrap col-not-center">
                    {compareProducts[2] && (
                      <span>
                        {" "}
                        <b>Kích thước màn hình:</b>{" "}
                        {compareProducts[2]?.productPc?.display_size} inch
                      </span>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="title-detail">
            <div className="row">
              <div className="col-12">
                <h5>Thông tin khác</h5>
              </div>
            </div>
          </div>
          <div className="detail-infor">
            <div className="row">
              <div className="col-4 product-detail-wrap col-not-center">
                {compareProducts[0] && (
                  <span>
                    <b>Tiêu đề:</b> {compareProducts[0]?.title}
                  </span>
                )}
              </div>
              <div className="col-4 product-detail-wrap col-center">
                {compareProducts[1] && (
                  <span>
                    {" "}
                    <b>Tiêu đề:</b> {compareProducts[1]?.title}
                  </span>
                )}
              </div>
              <div className="col-4 product-detail-wrap col-not-center">
                {compareProducts[2] && (
                  <span>
                    {" "}
                    <b>Tiêu đề:</b> {compareProducts[2]?.title}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-4 product-detail-wrap col-not-center">
                {compareProducts[0] && (
                  <span>
                    {" "}
                    <b>Mô tả:</b> {compareProducts[0]?.description}
                  </span>
                )}
              </div>
              <div className="col-4 product-detail-wrap col-center">
                {compareProducts[1] && (
                  <span>
                    {" "}
                    <b>Mô tả:</b> {compareProducts[1]?.description}
                  </span>
                )}
              </div>
              <div className="col-4 product-detail-wrap col-not-center">
                {compareProducts[2] && (
                  <span>
                    {" "}
                    <b>Mô tả:</b> {compareProducts[2]?.description}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-4 product-detail-wrap col-not-center">
                {compareProducts[0] && (
                  <span>
                    {" "}
                    <b>Địa chỉ:</b> {compareProducts[0]?.address}
                  </span>
                )}
              </div>
              <div className="col-4 product-detail-wrap col-center">
                {compareProducts[1] && (
                  <span>
                    {" "}
                    <b>Địa chỉ:</b> {compareProducts[1]?.address}
                  </span>
                )}
              </div>
              <div className="col-4 product-detail-wrap col-not-center">
                {compareProducts[2] && (
                  <span>
                    {" "}
                    <b>Địa chỉ:</b> {compareProducts[2]?.address}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-4 product-detail-wrap col-not-center">
                {compareProducts[0] && (
                  <span>
                    {" "}
                    <b>Lượt truy cập:</b> {compareProducts[0]?.view}
                  </span>
                )}
              </div>
              <div className="col-4 product-detail-wrap col-center">
                {compareProducts[1] && (
                  <span>
                    {" "}
                    <b>Lượt truy cập:</b> {compareProducts[1]?.view}
                  </span>
                )}
              </div>
              <div className="col-4 product-detail-wrap col-not-center">
                {compareProducts[2] && (
                  <span>
                    {" "}
                    <b>Lượt truy cập:</b> {compareProducts[2]?.view}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
