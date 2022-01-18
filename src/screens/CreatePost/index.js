import React, { useState, useEffect } from "react";
import "./createPost.scss";
import { Grid } from "@material-ui/core";
import MetaTag from "../../components/MetaTag";
import Preloading from "../../components/Loading";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { apiCity, apiDistrict, apiWard } from "./../../constants";
import {
  isNull,
  validateNullFormPost,
  validatePrice,
} from "./../../validations";
export default function CreatePost() {
  const [preload, setPreload] = useState(false);
  const [isTrade, setIsTrade] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const [show, setShow] = useState(false);
  const [dataCity, setDataCity] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataWard, setDataWard] = useState([]);
  const [address, setAddress] = useState("");
  const [visible, setVisible] = useState(false);
  const [postInfor, setPostInfor] = useState({
    category: 0, //0:phone, 1: laptop, 2: pc
    name: "",
    brand: null,
    status: null,
    guarantee: null,
    cpu: "",
    gpu: "",
    ram: null,
    rom: null,
    storage_type: null,
    storage_capacity: null,
    address: "",
    city: "",
    district: "",
    wards: "",
    price: null,
    title: "",
    description: "",
    public_status: 0,
    trade: 0,
  });
  const [postTradeInfor, setPostTradeInfor] = useState({
    category: 0, //0:phone, 1: laptop, 2: pc
    name: "",
    brand: null,
    status: null,
    guarantee: null,
    cpu: "",
    gpu: "",
    ram: null,
    rom: null,
    storage_type: null,
    storage_capacity: null,
    description: "",
  });
  const [validatePost, setvalidatePost] = useState({
    category: "", //0:phone, 1: laptop, 2: pc
    name: "",
    brand: "",
    status: "",
    guarantee: "",
    cpu: "",
    gpu: "",
    ram: "",
    rom: "",
    storage_type: "",
    storage_capacity: "",
    address: "",
    city: "",
    district: "",
    wards: "",
    price: "",
    title: "",
    description: "",
    public_status: "",
  });
  const [validatePostTrade, setvalidatePostTrade] = useState({
    category: "", //0:phone, 1: laptop, 2: pc
    name: "",
    brand: "",
    status: "",
    guarantee: "",
    cpu: "",
    gpu: "",
    ram: "",
    rom: "",
    storage_type: "",
    storage_capacity: "",
    description: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setPostInfor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name == "city") fetchDistrict(value);
    if (name == "district") fetchWard(value);
  };

  const handleOnChangeTrade = (e) => {
    const { name, value } = e.target;
    setPostTradeInfor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    setTimeout(() => {
      setPreload(true);
    }, 500);
    return () => {};
  }, []);

  const onSubmitForm = (event) => {
    event.preventDefault();
    //validate form post
    setvalidatePost({
      name: validateNullFormPost(postInfor.name),
      brand: validateNullFormPost(postInfor.brand),
      status: validateNullFormPost(postInfor.status),
      guarantee: validateNullFormPost(postInfor.guarantee),
      price: !isFree ? validatePrice(postInfor.price) : "",
      address: validateNullFormPost(postInfor.address),
      title: validateNullFormPost(postInfor.title),
      description: validateNullFormPost(postInfor.description),
      category: "",
      cpu: "",
      gpu: "",
      ram: "",
      rom: "",
      storage_type: "",
      storage_capacity: "",
      city: "",
      district: "",
      wards: "",
      public_status: "",
    });

    if (isTrade) {
      setvalidatePostTrade({
        name: validateNullFormPost(postTradeInfor.name),
        brand: validateNullFormPost(postTradeInfor.brand),
        status: validateNullFormPost(postTradeInfor.status),
        guarantee: validateNullFormPost(postTradeInfor.guarantee),
        description: validateNullFormPost(postTradeInfor.description),
        category: "",
        cpu: "",
        gpu: "",
        ram: "",
        rom: "",
        storage_type: "",
        storage_capacity: "",
      });
    }
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
    let cityName = "city";
    let districtName = "district";
    let wardName = "wards";
    if (isNull(postInfor.city) || postInfor.city == "0")
      setvalidatePost((prevState) => ({
        ...prevState,
        [cityName]: "Bạn chưa chọn tỉnh, thành phố",
      }));
    else
      setvalidatePost((prevState) => ({
        ...prevState,
        [cityName]: "",
      }));
    if (isNull(postInfor.district) || postInfor.district == "0")
      setvalidatePost((prevState) => ({
        ...prevState,
        [districtName]: "Bạn chưa chọn quận, huyện, thị xã",
      }));
    else
      setvalidatePost((prevState) => ({
        ...prevState,
        [districtName]: "",
      }));
    if (isNull(postInfor.wards) || postInfor.wards == "0")
      setvalidatePost((prevState) => ({
        ...prevState,
        [wardName]: "Bạn chưa chọn phường, xã, thị trấn",
      }));
    else
      setvalidatePost((prevState) => ({
        ...prevState,
        [wardName]: "",
      }));
    if (
      postInfor.city !== "" &&
      postInfor.district !== "" &&
      postInfor.wards !== "" &&
      postInfor.city !== "0" &&
      postInfor.district !== "0" &&
      postInfor.wards !== "0"
    ) {
      let city, district, wards;
      for (let i = 0; i < dataCity.length; i++) {
        if (dataCity[i].code == postInfor.city) {
          city = dataCity[i].name;
        }
      }
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
    setvalidatePost({ city: "", district: "", wards: "" });
    setShow(false);
  };
  const handleShow = () => {
    fetchCity();
    setPostInfor({ city: "", district: "", wards: "" });
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

  const toPreview = (e) => {
    window.location.href = "/create-post/preview";
  };

  const onClickTrade = () => {
    setIsTrade(!isTrade);
    let trade = "trade";
    setPostInfor((prevState) => ({
      ...prevState,
      [trade]: isTrade ? 1 : 0,
    }));
    console.log(isTrade);
  };

  const onClickFree = () => {
    setIsFree(!isFree);
    let price = "preice";
    if (isFree)
      setPostInfor((prevState) => ({
        ...prevState,
        [price]: 0,
      }));
    else
      setPostInfor((prevState) => ({
        ...prevState,
        [price]: null,
      }));
  };

  //handle scroll to top
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", toggleVisible);

  return (
    <div className="createPostContainer">
      <MetaTag
        title={"Tạo bài viết"}
        description={"Đăng bán, trao đổi, tắng sản phẩm"}
      />
      {visible && (
        <div className="scroll-to-top" onClick={() => scrollToTop()}>
          <i className="fas fa-chevron-up fa-2x"></i>
        </div>
      )}
      {/* modal address */}
      <Modal show={show} onHide={() => handleClose()} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chọn địa chỉ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="form6Example4">
                <b>Tỉnh, thành phố*</b>
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
              <p className="validate-form-address">{validatePost.city}</p>
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="form6Example4">
                <b>Quận, huyện, thị xã*</b>
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
              <p className="validate-form-address">{validatePost.district}</p>
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="form6Example4">
                <b>Phường, xã, thị trấn*</b>
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
              <p className="validate-form-address">{validatePost.wards}</p>
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
                      <div className="image-selected">
                        <img src={item} alt="" width="100%" />
                        <i
                          className="fas fa-times-circle fa delete-image"
                          onClick={() => deleteFile(index)}
                        ></i>
                        {index === 0 ? (
                          <div className="title-cover-image">
                            <p>Ảnh bìa</p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
            </div>
          </Grid>
          <Grid item xs={12} md={8} className="create-post-detail">
            <form className="form-product">
              <div className="mb-3">
                <h3>Thông tin sản phẩm đăng bán</h3>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form6Example3">
                  Loại sản phẩm&nbsp;<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  className="form-select"
                  aria-label="Disabled select example"
                  required
                  name="category"
                  onChange={(e) => handleOnChange(e)}
                  placeholder="Loại sản phẩm"
                >
                  <option value="0">Điện thoại, Máy tính bảng</option>
                  <option value="1">Laptop</option>
                  <option value="2">PC</option>
                </select>
                <p className="validate-form-text">{validatePost.category}</p>
              </div>
              <div className="mb-3 mt-4">
                <h4>Thông tin chi tiết</h4>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form6Example4">
                  Tên sản phẩm&nbsp;<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="form6Example4"
                  className="form-control"
                  placeholder="Tên sản phẩm"
                  name="name"
                  onChange={(e) => handleOnChange(e)}
                />
                <p className="validate-form-text">{validatePost.name}</p>
              </div>
              {postInfor.category < 2 && (
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form6Example4">
                    Hãng sản xuất&nbsp;<span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    className="form-select"
                    aria-label="Disabled select example"
                    name="brand"
                    onChange={(e) => handleOnChange(e)}
                  >
                    <option>Hãng sản xuất</option>
                    <option value="1">Apple</option>
                    <option value="2">Samsung</option>
                    <option value="3">Xiaomi</option>
                  </select>
                  <p className="validate-form-text">{validatePost.brand}</p>
                </div>
              )}
              <div className="row mb-3">
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="form6Example1">
                      Tình trạng&nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-select"
                      aria-label="Disabled select example"
                      name="status"
                      onChange={(e) => handleOnChange(e)}
                    >
                      <option>Tình trạng</option>
                      <option value="1">Mới 100%</option>
                      <option value="2">99%</option>
                      <option value="3">95%</option>
                    </select>
                    <p className="validate-form-text">{validatePost.status}</p>
                  </div>
                </div>
                {postInfor.category < 2 && (
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="form6Example2">
                        Bảo hành&nbsp;<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="number"
                        id="form6Example4"
                        className="form-control"
                        placeholder="Thời gian bảo hành"
                        min={0}
                        defaultValue={0}
                        name="guarantee"
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                    <p className="validate-form-text">
                      {validatePost.guarantee}
                    </p>
                  </div>
                )}
              </div>
              {postInfor.category > 0 && (
                <div className="row mb-3">
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="form6Example1">
                        Bộ vi xử lý (CPU)
                      </label>
                      <select
                        className="form-select"
                        aria-label="Disabled select example"
                        name="cpu"
                        onChange={(e) => handleOnChange(e)}
                      >
                        <option>Bộ vi xử lý</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                      <p className="validate-form-text">{validatePost.cpu}</p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="form6Example2">
                        Card đồ họa (GPU)
                      </label>
                      <select
                        className="form-select"
                        aria-label="Disabled select example"
                        name="gpu"
                        onChange={(e) => handleOnChange(e)}
                      >
                        <option>Card đồ họa</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                      <p className="validate-form-text">{validatePost.gpu}</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="row mb-3">
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="form6Example1">
                      Ram
                    </label>
                    <select
                      className="form-select"
                      aria-label="Disabled select example"
                      name="ram"
                      onChange={(e) => handleOnChange(e)}
                    >
                      <option>Ram</option>
                      <option value="1">1gb</option>
                      <option value="2">2gb</option>
                      <option value="3">4gb</option>
                    </select>
                    <p className="validate-form-text">{validatePost.ram}</p>
                  </div>
                </div>
                {postInfor.category == 0 && (
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="form6Example2">
                        Bộ nhớ trong (ROM)
                      </label>
                      <select
                        className="form-select"
                        aria-label="Disabled select example"
                        name="rom"
                        onChange={(e) => handleOnChange(e)}
                      >
                        <option>Bộ nhớ trong</option>
                        <option value="1">8gb</option>
                        <option value="2">16gb</option>
                        <option value="3">64gb</option>
                      </select>
                      <p className="validate-form-text">{validatePost.rom}</p>
                    </div>
                  </div>
                )}
              </div>
              {postInfor.category > 0 && (
                <div className="row mb-3">
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="form6Example1">
                        Loại ổ cứng
                      </label>
                      <select
                        className="form-select"
                        aria-label="Disabled select example"
                        name="storage_type"
                        onChange={(e) => handleOnChange(e)}
                      >
                        <option>Loại ổ cứng</option>
                        <option value="1">HDD</option>
                        <option value="2">SDD</option>
                        <option value="3">SSHD</option>
                      </select>
                      <p className="validate-form-text">
                        {validatePost.storage_type}
                      </p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="form6Example2">
                        Dung lượng ổ cứng
                      </label>
                      <select
                        className="form-select"
                        aria-label="Disabled select example"
                        name="storage_capacity"
                        onChange={(e) => handleOnChange(e)}
                      >
                        <option>Dung lượng ổ cứng cứng</option>
                        <option value="1">128gb</option>
                        <option value="2">256gb</option>
                        <option value="3">512gb</option>
                        <option value="3">1tb</option>
                      </select>
                      <p className="validate-form-text">
                        {validatePost.storage_capacity}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form6Example5">
                  Địa chỉ&nbsp;<span style={{ color: "red" }}>*</span>
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
                <p className="validate-form-text">{validatePost.address}</p>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="freeCheckbox"
                  defaultChecked={isFree}
                  onClick={() => onClickFree()}
                />
                <label className="form-check-label" htmlFor="freeCheckbox">
                  Tặng miễn phí
                </label>
              </div>
              {!isFree && (
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form6Example6">
                    Giá bán&nbsp;<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    id="form6Example6"
                    className="form-control"
                    placeholder="Giá bán"
                    name="price"
                    onChange={(e) => handleOnChange(e)}
                  />
                  <p className="validate-form-text">{validatePost.price}</p>
                </div>
              )}
              <div className="mb-3 mt-4">
                <h4>Tiêu đề và mô tả</h4>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form6Example3">
                  Tiêu đề&nbsp;<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="form6Example3"
                  className="form-control"
                  placeholder="Tiêu đề"
                  name="title"
                  onChange={(e) => handleOnChange(e)}
                />
                <p className="validate-form-text">{validatePost.title}</p>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form6Example7">
                  Mô tả chi tiết&nbsp;<span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  className="form-control"
                  id="form6Example7"
                  rows="4"
                  placeholder="Mô tả chi tiết"
                  name="description"
                  onChange={(e) => handleOnChange(e)}
                ></textarea>
                <p className="validate-form-text">{validatePost.description}</p>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form6Example3">
                  Chế độ bài viết&nbsp;<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  className="form-select"
                  aria-label="Disabled select example"
                  required
                  name="category"
                  onChange={(e) => handleOnChange(e)}
                  placeholder="Loại sản phẩm"
                >
                  <option value="0">Công khai</option>
                  <option value="1">Riêng tư</option>
                </select>
                <p className="validate-form-text">
                  {validatePost.public_status}
                </p>
              </div>
              <div className="mb-3 mt-4">
                <h4>Bạn muốn đổi sang sản phẩm khác</h4>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="tradeCheckbox"
                  defaultChecked={isTrade}
                  onClick={() => onClickTrade()}
                />
                <label className="form-check-label" htmlFor="tradeCheckbox">
                  Đổi sản phẩm
                </label>
              </div>
              {isTrade && (
                <div className="form-trade-product">
                  {/* form trade */}
                  <div className="mb-3 mt-4">
                    <h3>Thông tin sản phẩm muốn đổi</h3>
                  </div>
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form6Example3">
                      Loại sản phẩm&nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-select"
                      aria-label="Disabled select example"
                      required
                      name="category"
                      onClick={(e) => handleOnChangeTrade(e)}
                      placeholder="Loại sản phẩm"
                    >
                      <option value="0">Điện thoại, Máy tính bảng</option>
                      <option value="1">Laptop</option>
                      <option value="2">PC</option>
                    </select>
                    <p className="validate-form-text">
                      {validatePostTrade.category}
                    </p>
                  </div>
                  <div className="mb-3 mt-4">
                    <h4>Thông tin chi tiết</h4>
                  </div>
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form6Example4">
                      Tên sản phẩm&nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="form6Example4"
                      className="form-control"
                      placeholder="Tên sản phẩm"
                    />
                    <p className="validate-form-text">
                      {validatePostTrade.name}
                    </p>
                  </div>
                  {postTradeInfor.category < 2 && (
                    <div className="form-outline mb-3">
                      <label className="form-label" htmlFor="form6Example4">
                        Hãng sản xuất&nbsp;
                        <span style={{ color: "red" }}>*</span>
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
                      <p className="validate-form-text">
                        {validatePostTrade.brand}
                      </p>
                    </div>
                  )}
                  <div className="row mb-3">
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example1">
                          Tình trạng&nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          className="form-select"
                          aria-label="Disabled select example"
                        >
                          <option>Tình trạng</option>
                          <option value="1">Mới 100%</option>
                          <option value="2">99%</option>
                          <option value="3">95%</option>
                        </select>
                        <p className="validate-form-text">
                          {validatePostTrade.status}
                        </p>
                      </div>
                    </div>
                    {postTradeInfor.category < 2 && (
                      <div className="col">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form6Example2">
                            Bảo hành (Tháng)&nbsp;
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="number"
                            id="form6Example4"
                            className="form-control"
                            placeholder="Thời gian bảo hành"
                            min={0}
                            defaultValue={0}
                          />
                          <p className="validate-form-text">
                            {validatePostTrade.guarantee}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  {postTradeInfor.category > 0 && (
                    <div className="row mb-3">
                      <div className="col">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form6Example1">
                            Bộ vi xử lý (CPU)
                          </label>
                          <select
                            className="form-select"
                            aria-label="Disabled select example"
                          >
                            <option>Bộ vi xử lý</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                          <p className="validate-form-text">
                            {validatePostTrade.cpu}
                          </p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form6Example2">
                            Card đồ họa (GPU)
                          </label>
                          <select
                            className="form-select"
                            aria-label="Disabled select example"
                          >
                            <option>Card đồ họa</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                          <p className="validate-form-text">
                            {validatePostTrade.gpu}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="row mb-3">
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example1">
                          Ram
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
                        <p className="validate-form-text">
                          {validatePostTrade.ram}
                        </p>
                      </div>
                    </div>
                    {postTradeInfor.category == 0 && (
                      <div className="col">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form6Example2">
                            Bộ nhớ trong (ROM)
                          </label>
                          <select
                            className="form-select"
                            aria-label="Disabled select example"
                          >
                            <option>Bộ nhớ trong</option>
                            <option value="1">8gb</option>
                            <option value="2">16gb</option>
                            <option value="3">64gb</option>
                          </select>
                          <p className="validate-form-text">
                            {validatePostTrade.rom}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  {postTradeInfor.category > 0 && (
                    <div className="row mb-3">
                      <div className="col">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form6Example1">
                            Loại ổ cứng
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
                          <p className="validate-form-text">
                            {validatePostTrade.storage_type}
                          </p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="form6Example2">
                            Dung lượng ổ cứng
                          </label>
                          <select
                            className="form-select"
                            aria-label="Disabled select example"
                          >
                            <option>Dung lượng ổ cứng cứng</option>
                            <option value="1">128gb</option>
                            <option value="2">256gb</option>
                            <option value="3">512gb</option>
                            <option value="3">1tb</option>
                          </select>
                          <p className="validate-form-text">
                            {validatePostTrade.storage_capacity}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="mb-3 mt-4">
                    <h4>Mô tả</h4>
                  </div>
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form6Example7">
                      Mô tả chi tiết&nbsp;
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="form6Example7"
                      rows="4"
                      placeholder="Mô tả chi tiết"
                    ></textarea>
                    <p className="validate-form-text">
                      {validatePostTrade.description}
                    </p>
                  </div>
                </div>
              )}
              <div className="row mb-3">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-primary btn-block btn-preview"
                    onClick={(e) => toPreview(e)}
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
