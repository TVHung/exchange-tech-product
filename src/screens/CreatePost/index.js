import React, { useState, useEffect } from "react";
import "./createPost.scss";
import { Grid } from "@material-ui/core";
import MetaTag from "../../components/MetaTag";
import Preloading from "../../components/Loading";
import { POST_TYPES } from "../../utils/common";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { apiCity, apiDistrict, apiWard } from "./../../constants";

export default function CreatePost() {
  const [preload, setPreload] = useState(false);
  const [show, setShow] = useState(false);
  const [postTypes, setpostTypes] = useState(null);
  const [dataCity, setDataCity] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataWard, setDataWard] = useState([]);
  const [address, setAddress] = useState("");
  const [postInfor, setPostInfor] = useState({
    city: "",
    district: "",
    wards: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPostInfor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name == "city") fetchDistrict(value);
    if (name == "district") fetchWard(value);
  };

  useEffect(() => {
    setTimeout(() => {
      setPreload(true);
    }, 500);
    return () => {};
  }, []);

  const onSubmitForm = (event) => {
    event.preventDefault();
    console.log(postInfor);
  };

  const [file, setFile] = useState([]);

  const uploadSingleFile = (e) => {
    setFile([...file, URL.createObjectURL(e.target.files[0])]);
  };

  const upload = (e) => {
    e.preventDefault();
    console.log(file);
  };

  const deleteFile = (e) => {
    const s = file.filter((item, index) => index !== e);
    setFile(s);
  };

  const handleOkAddress = () => {
    if (
      postInfor.city !== "" &&
      postInfor.district !== "" &&
      postInfor.wards !== "" &&
      postInfor.city !== "0" &&
      postInfor.district !== "0" &&
      postInfor.wards !== "0"
    ) {
      let city = dataCity[Number(postInfor.city)].name;
      let district, wards;
      for (let i = 0; i < dataDistrict.length; i++) {
        if (dataDistrict[i].code == postInfor.district) {
          district = dataDistrict[i].name;
        }
      }
      for (let i = 0; i < dataWard.length; i++) {
        if (dataWard[i].code == postInfor.wards) {
          wards = dataWard[i].name;
        }
      }
      setAddress(`${wards}, ${district}, ${city}`);
      handleClose();
    } else {
      setAddress("");
    }
  };

  const handleClose = () => {
    setPostInfor({ city: "", district: "", wards: "" });
    setShow(false);
  };
  const handleShow = () => {
    fetchCity();
    setPostInfor({ city: "", district: "", wards: "" });
    // setDataCity([]);
    // setDataDistrict([]);
    // setDataWard([]);
    setShow(true);
  };

  const fetchCity = async () => {
    await axios
      .get(apiCity)
      .then((res) => {
        const data = res.data;
        setDataCity(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchDistrict = async (city_id) => {
    await axios
      .get(`${apiDistrict}/${city_id}/?depth=2`)
      .then((res) => {
        const data = res.data;
        setDataDistrict(data.districts);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchWard = async (district_id) => {
    await axios
      .get(`${apiWard}/${district_id}/?depth=2`)
      .then((res) => {
        const data = res.data;
        setDataWard(data.wards);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="createPostContainer">
      <MetaTag
        title={"Tạo bài viết"}
        description={"Đăng bán, trao đổi, tắng sản phẩm"}
      />
      {/* modal address */}
      <Modal show={show} onHide={() => handleClose()} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chọn địa chỉ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="form6Example4">
                Tỉnh, thành phố*
              </label>
              <select
                className="form-select"
                aria-label="Disabled select example"
                name="city"
                onChange={(e) => handleOnChange(e)}
                required
              >
                <option value="0">Tỉnh, thành phố</option>
                {dataCity.map((data, index) => (
                  <option key={index} value={data.code}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="form6Example4">
                Quận, huyện, thị xã*
              </label>
              <select
                className="form-select"
                aria-label="Disabled select example"
                name="district"
                onChange={(e) => handleOnChange(e)}
                required
              >
                <option value="0">Quận, huyện, thị xã</option>
                {dataDistrict.map((data, index) => (
                  <option key={index} value={data.code}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="form6Example4">
                Phường, xã, thị trấn*
              </label>
              <select
                className="form-select"
                aria-label="Disabled select example"
                name="wards"
                onChange={(e) => handleOnChange(e)}
                required
              >
                <option value="0">Phường, xã, thị trấn</option>
                {dataWard.map((data, index) => (
                  <option key={index} value={data.code}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Hủy
          </Button>
          <Button variant="primary" onClick={() => handleOkAddress()}>
            Xong
          </Button>
        </Modal.Footer>
      </Modal>
      {!preload ? (
        <Preloading />
      ) : (
        <Grid container className="form-container">
          <Grid item xs={12} md={4} className="create-post-images">
            <div className="custom-file">
              <label htmlFor="file-upload" className="custom-file-upload">
                <i className="fas fa-upload"></i> Upload Image
              </label>
              <input
                type="file"
                className="custom-file-input"
                id="file-upload"
                // multiple
                onChange={(e) => uploadSingleFile(e)}
              />
            </div>
            <div className="mt-3 view-preview row">
              {file.length > 0 &&
                file.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="col-lg-6 col-md-4 col-sm-6 image-preview mb-2 "
                    >
                      <img src={item} alt="" width="100%" />
                      <i
                        className="fas fa-times-circle fa delete-image"
                        onClick={() => deleteFile(index)}
                      ></i>
                      <div className="title-cover-image">
                        <p>Ảnh bìa</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Grid>
          <Grid item xs={12} md={8} className="create-post-detail">
            <form>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form6Example3">
                  Loại sản phẩm*
                </label>
                <select
                  className="form-select"
                  aria-label="Disabled select example"
                  required
                >
                  <option>Loại sản phẩm</option>
                  <option value="1">Điện thoại, Máy tính bảng</option>
                  <option value="2">Laptop</option>
                  <option value="3">PC</option>
                </select>
              </div>
              <div className="mb-3 mt-4">
                <h4>Thông tin chi tiết</h4>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form6Example4">
                  Tên sản phẩm*
                </label>
                <input
                  type="text"
                  id="form6Example4"
                  className="form-control"
                  placeholder="Tên sản phẩm"
                />
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form6Example4">
                  Hãng sản xuất*
                </label>
                <select
                  className="form-select"
                  aria-label="Disabled select example"
                >
                  <option>Hãng sản xuất</option>
                  <option value="1">Apple</option>
                  <option value="2">Samsung</option>
                  <option value="3">Xiaomi</option>
                </select>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="form6Example1">
                      Tình trạng*
                    </label>
                    <select
                      className="form-select"
                      aria-label="Disabled select example"
                    >
                      <option>Tình trạng</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="form6Example2">
                      Bảo hành*
                    </label>
                    <select
                      className="form-select"
                      aria-label="Disabled select example"
                    >
                      <option>Bảo hành</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="form6Example1">
                      Bộ vi xử lý (CPU)*
                    </label>
                    <select
                      className="form-select"
                      aria-label="Disabled select example"
                    >
                      <option>Tình trạng</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="form6Example2">
                      Card đồ họa (GPU)*
                    </label>
                    <select
                      className="form-select"
                      aria-label="Disabled select example"
                    >
                      <option>Bảo hành</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="form6Example1">
                      Ram*
                    </label>
                    <select
                      className="form-select"
                      aria-label="Disabled select example"
                    >
                      <option>Ram</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="form6Example2">
                      Bộ nhớ trong (ROM)*
                    </label>
                    <select
                      className="form-select"
                      aria-label="Disabled select example"
                    >
                      <option>Bộ nhớ trong</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="form6Example1">
                      Loại ổ cứng*
                    </label>
                    <select
                      className="form-select"
                      aria-label="Disabled select example"
                    >
                      <option>Loại ổ cứng</option>
                      <option value="1">HDD</option>
                      <option value="2">SDD</option>
                      <option value="3">SSHD</option>
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="form6Example2">
                      Ổ cứng*
                    </label>
                    <select
                      className="form-select"
                      aria-label="Disabled select example"
                    >
                      <option>Ổ cứng</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form6Example5">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  id="form6Example5"
                  className="form-control"
                  placeholder="Chọn địa chỉ"
                  readOnly
                  value={address}
                  onClick={() => handleShow()}
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="freeCheckbox"
                />
                <label className="form-check-label" htmlFor="freeCheckbox">
                  Tặng miễn phí
                </label>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form6Example6">
                  Giá bán*
                </label>
                <input
                  type="number"
                  id="form6Example6"
                  className="form-control"
                  placeholder="Giá bán"
                />
              </div>
              <div className="mb-3 mt-4">
                <h4>Tiêu đề và mô tả</h4>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form6Example3">
                  Tiêu đề*
                </label>
                <input
                  type="text"
                  id="form6Example3"
                  className="form-control"
                  placeholder="Tiêu đề"
                />
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form6Example7">
                  Mô tả chi tiết*
                </label>
                <textarea
                  className="form-control"
                  id="form6Example7"
                  rows="4"
                  placeholder="Mô tả chi tiết"
                ></textarea>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-primary btn-block btn-preview"
                  >
                    Xem trước
                  </button>
                </div>
                <div className="col">
                  <button
                    type="submit"
                    className="btn btn-success btn-block btn-submit"
                    onClick={(e) => onSubmitForm(e)}
                  >
                    Đăng tin
                  </button>
                </div>
              </div>
            </form>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
