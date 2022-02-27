import React, { useState, useEffect } from "react";
import "./createPost.scss";
import { Grid } from "@material-ui/core";
import MetaTag from "../../components/MetaTag";
import Preloading from "../../components/Loading";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import {
  apiCity,
  apiDistrict,
  apiWard,
  headers,
  apiGetAllPost,
  apiImages,
  apiPostMobile,
  apiPostLaptop,
  apiPostPc,
  storageData,
  statusData,
} from "./../../constants";
import {
  isNull,
  validateNullFormPost,
  validatePrice,
} from "./../../validations";
import Breadcrumb from "../../components/Breadcrumb";
import { postBreadcrumb } from "../../constants/breadcrumData";
export default function CreatePost() {
  const [preload, setPreload] = useState(true);
  const [isTrade, setIsTrade] = useState(false);
  const [isFree, setIsFree] = useState(false);

  //address handle
  const [show, setShow] = useState(false);
  const [dataCity, setDataCity] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataWard, setDataWard] = useState([]);
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState({
    city: "",
    district: "",
    wards: "",
    cityName: "",
    districtName: "",
    wardName: "",
  });

  const [isCreatePost, setIsCreatePost] = useState(false);
  const [imageUrl, setImageUrl] = useState([]);
  const [postInfor, setPostInfor] = useState({
    category: 1, //1:phone, 2: laptop, 3: pc
    name: "",
    brand: "",
    status: "",
    guarantee: null,
    cpu: "",
    gpu: "",
    ram: null,
    rom: null,
    storage_type: "",
    storage: null,
    address: "",
    price: null,
    title: "",
    description: "",
    display_size: null,
    public_status: 1,
    trade: 0,
  });
  const [postTradeInfor, setPostTradeInfor] = useState({
    category: 1, //0:phone, 1: laptop, 2: pc
    name: "",
    brand: "",
    status: "",
    guarantee: null,
    cpu: "",
    gpu: "",
    ram: null,
    rom: null,
    storage_type: null,
    display_size: null,
    storage: null,
    description: "",
  });
  const [validatePost, setvalidatePost] = useState({
    category: "",
    name: "",
    brand: "",
    status: "",
    guarantee: "",
    color: "",
    cpu: "",
    gpu: "",
    ram: "",
    rom: "",
    storage_type: "",
    storage: "",
    address: "",
    city: "",
    district: "",
    wards: "",
    price: "",
    title: "",
    display_size: "",
    description: "",
    public_status: "",
  });
  const [validatePostTrade, setvalidatePostTrade] = useState({
    category: 1, //1:phone, 2: laptop, 3: pc
    name: "",
    brand: "",
    status: "",
    guarantee: "",
    cpu: "",
    gpu: "",
    ram: "",
    rom: "",
    storage_type: "",
    display_size: "",
    storage: "",
    description: "",
  });
  useEffect(() => {
    return () => {
      setPostInfor({
        category: 1, //1:phone, 2: laptop, 3: pc
        name: "",
        brand: "",
        status: "",
        guarantee: null,
        cpu: "",
        gpu: "",
        ram: null,
        rom: null,
        storage_type: null,
        storage: null,
        address: "",
        price: null,
        title: "",
        description: "",
        public_status: 1,
        trade: 0,
      });
      setPostTradeInfor({
        category: 1, //0:phone, 1: laptop, 2: pc
        name: "",
        brand: "",
        status: "",
        guarantee: null,
        cpu: "",
        gpu: "",
        ram: null,
        rom: null,
        storage_type: null,
        storage: null,
        description: "",
      });
      setvalidatePost({
        category: "",
        name: "",
        brand: "",
        status: "",
        guarantee: "",
        cpu: "",
        gpu: "",
        ram: "",
        rom: "",
        storage_type: "",
        storage: "",
        address: "",
        city: "",
        district: "",
        wards: "",
        price: "",
        title: "",
        description: "",
        public_status: "",
      });
      setvalidatePostTrade({
        category: 1, //1:phone, 2: laptop, 3: pc
        name: "",
        brand: "",
        status: "",
        guarantee: "",
        cpu: "",
        gpu: "",
        ram: "",
        rom: "",
        storage_type: "",
        storage: "",
        description: "",
      });
    };
  }, []);
  const handleOnChangeAddress = (e) => {
    const { name, value } = e.target;
    setAddressDetail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name == "city") fetchDistrict(value); //lay gia tri de render ra quan, huyen
    if (name == "district") fetchWard(value); //lay gia tri de render ra xa
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPostInfor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleOnChangeTrade = (e) => {
    const { name, value } = e.target;
    setPostTradeInfor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [file, setFile] = useState([]);
  const [fileObject, setFileOject] = useState([]);
  const uploadSingleFile = (e) => {
    if (e.target.files[0]) {
      setFile([...file, URL.createObjectURL(e.target.files[0])]);
      setFileOject([...fileObject, e.target.files[0]]);
    }
  };

  const deleteFile = (e) => {
    const s = file.filter((item, index) => index !== e);
    const o = fileObject.filter((item, index) => index !== e);
    setFile(s);
    setFileOject(o);
  };

  const handleDrop = (files) => {
    // Push all the axios request promise into a single array
    const uploaders = files.map((file) => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "weedzflm"); // Replace the preset name with your own
      formData.append("api_key", "141866846121189"); // Replace API key with your own Cloudinary key
      formData.append("timestamp", (Date.now() / 1000) | 0);
      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios
        .post(
          "https://api.cloudinary.com/v1_1/codeinfuse/image/upload",
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }
        )
        .then((response) => {
          const data = response.data;
          const fileURL = data.secure_url; // You should store this URL for future references in your app
          console.log("data", data, fileURL);
          setImageUrl((imageUrl) => [...imageUrl, fileURL]);
        });
    });
    // Once all the files are uploaded
    axios.all(uploaders).then((res) => {
      // ... perform after upload is successful operation
      console.log("upload thanh cong", res);
    });
  };

  const handleOkAddress = () => {
    let cityName = "city";
    let districtName = "district";
    let wardName = "wards";
    if (isNull(addressDetail.city) || addressDetail.city == "0")
      setvalidatePost((prevState) => ({
        ...prevState,
        [cityName]: "Bạn chưa chọn tỉnh, thành phố",
      }));
    else
      setvalidatePost((prevState) => ({
        ...prevState,
        [cityName]: "",
      }));
    if (isNull(addressDetail.district) || addressDetail.district == "0")
      setvalidatePost((prevState) => ({
        ...prevState,
        [districtName]: "Bạn chưa chọn quận, huyện, thị xã",
      }));
    else
      setvalidatePost((prevState) => ({
        ...prevState,
        [districtName]: "",
      }));
    if (isNull(addressDetail.wards) || addressDetail.wards == "0")
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
      addressDetail.city !== "" &&
      addressDetail.district !== "" &&
      addressDetail.wards !== "" &&
      addressDetail.city !== "0" &&
      addressDetail.district !== "0" &&
      addressDetail.wards !== "0"
    ) {
      let city, district, wards;
      for (let i = 0; i < dataCity.length; i++) {
        if (dataCity[i].code == addressDetail.city) {
          city = dataCity[i].name;
          let name = "cityName";
          // eslint-disable-next-line no-loop-func
          setAddressDetail((prevState) => ({
            ...prevState,
            [name]: city,
          }));
        }
      }
      for (let i = 0; i < dataDistrict.length; i++) {
        if (dataDistrict[i].code == addressDetail.district) {
          district = dataDistrict[i].name;
          let name = "districtName";
          // eslint-disable-next-line no-loop-func
          setAddressDetail((prevState) => ({
            ...prevState,
            [name]: district,
          }));
        }
      }
      for (let i = 0; i < dataWard.length; i++) {
        if (dataWard[i].code == addressDetail.wards) {
          wards = dataWard[i].name;
          let name = "wardName";
          // eslint-disable-next-line no-loop-func
          setAddressDetail((prevState) => ({
            ...prevState,
            [name]: wards,
          }));
        }
      }
      setAddress(`${wards}, ${district}, ${city}`);
      handleClose();
    } else {
      setAddress("");
    }
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    fetchCity();
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

  const onSubmitForm = (event) => {
    event.preventDefault();
    console.log(imageUrl);
    // setIsCreatePost(true);
    // handleSubmitData();
    // upload();
    //validate form post
    // setvalidatePost({
    //   name: validateNullFormPost(postInfor.name),
    //   brand: validateNullFormPost(postInfor.brand),
    //   status: validateNullFormPost(postInfor.status),
    //   guarantee: validateNullFormPost(postInfor.guarantee),
    //   price: !isFree ? validatePrice(postInfor.price) : "",
    //   address: validateNullFormPost(address),
    //   title: validateNullFormPost(postInfor.title),
    //   description: validateNullFormPost(postInfor.description),
    //   category: "",
    //   cpu: "",
    //   gpu: "",
    //   ram: "",
    //   rom: "",
    //   storage_type: "",
    //   storage: "",
    //   city: "",
    //   district: "",
    //   wards: "",
    //   public_status: "",
    // });

    // if (isTrade) {
    //   setvalidatePostTrade({
    //     name: validateNullFormPost(postTradeInfor.name),
    //     brand: validateNullFormPost(postTradeInfor.brand),
    //     status: validateNullFormPost(postTradeInfor.status),
    //     guarantee: validateNullFormPost(postTradeInfor.guarantee),
    //     description: validateNullFormPost(postTradeInfor.description),
    //     category: "",
    //     cpu: "",
    //     gpu: "",
    //     ram: "",
    //     rom: "",
    //     storage_type: "",
    //     storage: "",
    //   });
    // }
  };

  const fetchAllDataFeild = async () => {
    //data rom, category, storage
  };
  //tao post cha
  const createPost = async () => {
    const postData = {
      is_trade: 0,
      post_trade_id: 0,
      title: postInfor.title,
      category_id: Number(postInfor.category),
      name: postInfor.name,
      description: postInfor.description,
      ram: Number(postInfor.ram),
      storage: 128,
      status: "Mới",
      price: Number(postInfor.price),
      address: address,
      public_status: 1,
      video_url:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      guarantee: Number(postInfor.guarantee),
    };
    console.log(postData);
    // createPostChild(10);
    await axios
      .post(apiGetAllPost, postData, { headers: headers })
      .then((res) => {
        const p = res.data.data;
        console.log("post", p);
        createPostChild(p.id);
        // setTimeout(() => {
        handleSaveImage(p.id);
        // }, 10000);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSaveImage = async (post_id) => {
    const imageData = [];
    const responses = [];
    for (let i = 0; i < imageUrl.length; i++) {
      imageData.push({
        post_id: post_id,
        is_banner: i === 0 ? 1 : 0,
        image_url: imageUrl[i],
      });
      responses.push(
        await axios
          .post(apiImages, imageData[i], { headers: headers })
          .then((res) => {
            const i = res.data.data;
            console.log("imagesss", i);
          })
          .catch((error) => {
            console.error(error);
          })
      );
    }
    console.log(imageData);
    console.log(imageUrl);
  };

  //tao post con o day
  const createPostChild = async (post_id) => {
    if (Number(postInfor.category) == 1) {
      const postChildMobile = {
        post_id: post_id,
        color: postInfor.color,
        brand_id: Number(postInfor.brand),
      };
      await axios
        .post(apiPostMobile, postChildMobile, { headers: headers })
        .then((res) => {
          console.log("post mobile", res.data.data);
          setIsCreatePost(false);
        })
        .catch((error) => {
          console.error(error);
        });
      // console.log(postChildMobile);
    } else if (Number(postInfor.category) == 2) {
      const postChildLaptop = {
        post_id: post_id,
        color: postInfor.color,
        cpu: postInfor.cpu,
        gpu: postInfor.gpu,
        storage_type: postInfor.storage_type,
        brand_id: Number(postInfor.brand),
        display_size: Number(postInfor.display_size),
      };
      await axios
        .post(apiPostLaptop, postChildLaptop, { headers: headers })
        .then((res) => {
          console.log("post laptop", res.data.data);
          setIsCreatePost(false);
        })
        .catch((error) => {
          console.error(error);
        });
      // console.log(postChildLaptop);
    } else if (Number(postInfor.category) == 3) {
      const postChildPc = {
        post_id: post_id,
        cpu: postInfor.cpu,
        gpu: postInfor.gpu,
        storage_type: postInfor.storage_type,
      };
      await axios
        .post(apiPostPc, postChildPc, { headers: headers })
        .then((res) => {
          console.log("post pc", res.data.data);
          setIsCreatePost(false);
        })
        .catch((error) => {
          console.error(error);
        });
      // console.log(postChildPc);
    } else {
      //noting
      setIsCreatePost(false);
    }
  };

  return (
    <div className="createPostContainer container">
      {/* <button onClick={() => handleDrop(fileObject)}>upload</button> */}
      <Breadcrumb arrLink={postBreadcrumb} />
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
                <b>Tỉnh, thành phố*</b>
              </label>
              <select
                className="form-select"
                aria-label="Disabled select example"
                name="city"
                onChange={(e) => handleOnChangeAddress(e)}
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
                onChange={(e) => handleOnChangeAddress(e)}
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
                onChange={(e) => handleOnChangeAddress(e)}
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
      {isCreatePost && <Preloading />}
      {!preload ? (
        <Preloading />
      ) : (
        <Grid container className="form-container">
          <Grid item xs={12} md={4} className="create-post-images">
            <div className="custom-file">
              <label htmlFor="file-upload" className="custom-file-upload">
                <i className="fas fa-upload"></i> Thêm ảnh
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
                  Loại sản phẩm
                </label>
                <select
                  className="form-select"
                  aria-label="Disabled select example"
                  required
                  name="category"
                  onChange={(e) => handleOnChange(e)}
                  placeholder="Loại sản phẩm"
                >
                  <option value="1">Điện thoại, Máy tính bảng</option>
                  <option value="2">Laptop</option>
                  <option value="3">PC</option>
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
              {Number(postInfor.category) < 3 && (
                <div className="row mb-3">
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="form6Example4">
                        Hãng sản xuất&nbsp;
                        <span style={{ color: "red" }}>*</span>
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
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="form6Example4">
                        Màu sắc&nbsp;
                        <span style={{ color: "red" }}>*</span>s
                      </label>
                      <input
                        type="text"
                        id="form6Example4"
                        className="form-control"
                        placeholder="Màu sắc"
                        name="color"
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                  </div>
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
                      <option value="0">Tình trạng</option>
                      {statusData.map((data, index) => (
                        <option key={index} value={data.value}>
                          {data.value}
                        </option>
                      ))}
                    </select>
                    <p className="validate-form-text">{validatePost.status}</p>
                  </div>
                </div>
                {Number(postInfor.category) < 3 && (
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
              {console.log("cate", Number(postInfor.category))}
              {Number(postInfor.category) > 1 && (
                <div className="row mb-3">
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="form6Example1">
                        Bộ vi xử lý (CPU)
                      </label>
                      <input
                        type="text"
                        id="form6Example4"
                        className="form-control"
                        placeholder="Bộ vi xử lý"
                        name="cpu"
                        onChange={(e) => handleOnChange(e)}
                      />
                      <p className="validate-form-text">{validatePost.cpu}</p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="form6Example2">
                        Card đồ họa (GPU)
                      </label>
                      <input
                        type="text"
                        id="form6Example4"
                        className="form-control"
                        placeholder="Card đồ họa dời"
                        name="gpu"
                        onChange={(e) => handleOnChange(e)}
                      />
                      <p className="validate-form-text">{validatePost.gpu}</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="row mb-3">
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="form6Example1">
                      Ram (GB)
                    </label>
                    <input
                      type="number"
                      id="form6Example4"
                      className="form-control"
                      placeholder="Ram"
                      min={0}
                      defaultValue={0}
                      name="ram"
                      onChange={(e) => handleOnChange(e)}
                    />
                    <p className="validate-form-text">{validatePost.ram}</p>
                  </div>
                </div>
                {Number(postInfor.category) == 2 && (
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="form6Example2">
                        Kích thước màn hình
                      </label>
                      <select
                        className="form-select"
                        aria-label="Disabled select example"
                        name="display_size"
                        onChange={(e) => handleOnChange(e)}
                      >
                        <option>Kích thước màn hình (inch)</option>
                        <option value="12">12</option>
                        <option value="13.3">13.3</option>
                        <option value="14">14</option>
                        <option value="15.6">15.6</option>
                        <option value="16">16</option>
                        <option value="17.3">17.3</option>
                      </select>
                      <p className="validate-form-text">{validatePost.rom}</p>
                    </div>
                  </div>
                )}
                {Number(postInfor.category) == 1 && (
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
                        <option value="0">Bộ nhớ trong</option>
                        {storageData.map((data, index) => (
                          <option key={index} value={data.value}>
                            {`${data.value}GB`}
                          </option>
                        ))}
                      </select>
                      <p className="validate-form-text">{validatePost.rom}</p>
                    </div>
                  </div>
                )}
              </div>
              {Number(postInfor.category) > 1 && (
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
                        <option value="HDD">HDD</option>
                        <option value="SDD">SDD</option>
                        <option value="SSHD">SSHD</option>
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
                        name="storage"
                        onChange={(e) => handleOnChange(e)}
                      >
                        <option value="0">Dung lượng ổ cứng cứng</option>
                        {storageData.map((data, index) => (
                          <option key={index} value={data.value}>
                            {`${data.value}GB`}
                          </option>
                        ))}
                      </select>
                      <p className="validate-form-text">
                        {validatePost.storage}
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
                  placeholder="Mô tả chi tiết
                  - Mua khi nào
                  - Trải nghiệm ra sao
                  - Có vấn đề nào khi sử dụng hay không"
                  name="description"
                  onChange={(e) => handleOnChange(e)}
                ></textarea>
                <p className="validate-form-text">{validatePost.description}</p>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form6Example3">
                  Chế độ bài viết
                </label>
                <select
                  className="form-select"
                  aria-label="Disabled select example"
                  required
                  name="category"
                  onChange={(e) => handleOnChange(e)}
                  placeholder="Chế độ bài viết"
                >
                  <option value="0">Công khai</option>
                  <option value="1">Riêng tư</option>
                </select>
                <p className="validate-form-text">
                  {validatePost.public_status}
                </p>
              </div>
              {/* <div className="mb-3 mt-4">
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
              </div> */}
              {isTrade && (
                <div className="form-trade-product">
                  {/* form trade */}
                  <div className="mb-3 mt-4">
                    <h3>Thông tin sản phẩm muốn đổi</h3>
                  </div>
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form6Example3">
                      Loại sản phẩm
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
                          {statusData.map((data, index) => (
                            <option key={index} value={data.value}>
                              {data.value}
                            </option>
                          ))}
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
                            <option value="0">Bộ nhớ trong</option>
                            {storageData.map((data, index) => (
                              <option key={index} value={data.value}>
                                {`${data.value}GB`}
                              </option>
                            ))}
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
                            {validatePostTrade.storage}
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
