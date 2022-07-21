import React, { useState, useEffect } from "react";
import "./_compare.scss";
import axios from "axios";
import { apiProductCompare } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { setListCompare } from "../../redux/actions/postActions";
import img from "../../assets/image/product-default.png";

export default function Compare() {
  const [isShow, setIsShow] = useState(false);
  const [compareProducts, setCompareProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setCompareProducts([]);
    };
  }, []);

  useEffect(() => {
    return () => {};
  }, []);
  const list_compare = useSelector((state) => state.post.list_compare);

  useEffect(() => {
    console.log("danh sach", list_compare);
    if (list_compare) {
      getAllProductCompare(list_compare);
    }
    if (list_compare === "") setCompareProducts([]);
  }, [list_compare]);

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

  const getAllProductCompare = async (list) => {
    const data = {
      array_id: list,
    };
    axios
      .post(apiProductCompare, data)
      .then((res) => {
        setCompareProducts(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const goToCompare = () => {
    window.location.href = "/compare";
  };

  const deleteAll = () => {
    localStorage.removeItem("array_id_compare");
    dispatch(setListCompare(""));
    localStorage.removeItem("current_category");
  };

  return (
    <div
      style={{
        display: window.location.pathname == "/compare" ? "none" : "block",
      }}
    >
      {isShow ? (
        <div className="compare-component row">
          <div className="col-3 compare-product">
            {console.log("Danh sach compare", compareProducts)}
            {compareProducts[0] ? (
              <div className="product-infor text-center">
                <div className="w-100 h-100 position-relative">
                  <img
                    src={compareProducts[0]?.images[0]?.image_url}
                    alt="product-compare"
                  />
                  <p>{compareProducts[0]?.name}</p>
                  <div
                    className="position-absolute delete-product"
                    onClick={() => deleteProduct(compareProducts[0]?.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </div>
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center w-100 h-100">
                <p>Không có sản phẩm so sánh</p>
              </div>
            )}
          </div>
          <div className="col-3 compare-product">
            {compareProducts[1] ? (
              <div className="product-infor text-center">
                <div className="w-100 h-100 position-relative">
                  <img
                    src={compareProducts[1]?.images[1]?.image_url}
                    alt="product-compare"
                  />
                  <p>{compareProducts[1]?.name}</p>
                  <div
                    className="position-absolute delete-product"
                    onClick={() => deleteProduct(compareProducts[1]?.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </div>
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center w-100 h-100">
                <p>Không có sản phẩm so sánh</p>
              </div>
            )}
          </div>
          <div className="col-3 compare-product">
            {compareProducts[2] ? (
              <div className="product-infor text-center">
                <div className="w-100 h-100 position-relative">
                  <img
                    src={compareProducts[2]?.images[2]?.image_url || img}
                    alt="product-compare"
                  />
                  <p>{compareProducts[2]?.name}</p>
                  <div
                    className="position-absolute delete-product"
                    onClick={() => deleteProduct(compareProducts[2]?.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </div>
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center w-100 h-100">
                <p>Không có sản phẩm so sánh</p>
              </div>
            )}
          </div>
          <div className="col-3 compare-product text-center">
            <div className="w-100">
              <div className="w-100">
                <button
                  className="compare-btn btn"
                  onClick={() => goToCompare()}
                  disabled={compareProducts?.length < 2}
                >
                  So sánh ngay
                </button>
              </div>
              <div className="w-100" onClick={() => deleteAll()}>
                <p className="delete-all">Xóa tất cả sản phẩm</p>
              </div>
            </div>
          </div>
          <div className="position-absolute" onClick={() => setIsShow(false)}>
            <button className="position-absolute zoom-out-btn">
              Thu nhỏ<i className="fas fa-chevron-down"></i>
            </button>
          </div>
        </div>
      ) : (
        <div className="compare-component-mini" onClick={() => setIsShow(true)}>
          <button>So sánh ({compareProducts?.length})</button>
        </div>
      )}
    </div>
  );
}
