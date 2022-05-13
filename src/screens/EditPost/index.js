import React, { useState, useEffect } from "react";
import "./_editPost.scss";
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
  apiImages,
  storageData,
  statusData,
  apiPost,
  apiFetchPostDetailWithCheck,
} from "./../../constants";
import { toast } from "react-toastify";
import {
  isNull,
  validateNullFormPost,
  validatePrice,
} from "./../../validations";
import Breadcrumb from "../../components/Breadcrumb";
import { postBreadcrumb } from "../../constants/breadcrumData";
import { useParams, useHistory } from "react-router-dom";

export default function EditPost() {
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
    color: "",
    video_url: null,
    sold: 0,
  });
  const [postTradeInfor, setPostTradeInfor] = useState({
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
    display_size: null,
    storage: null,
    description: "",
  });
  const [validatePost, setvalidatePost] = useState({
    name: "",
    brand: "",
    status: "",
    color: "",
    address: "",
    price: "",
    title: "",
    description: "",
    image: "",
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
      setPostInfor({});
      setPostTradeInfor({});
      setvalidatePost({});
      setvalidatePostTrade({});
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
    if (name === "category") {
      setvalidatePost({
        name: "",
        brand: "",
        status: "",
        color: "",
        price: "",
        address: "",
        title: "",
        description: "",
        image: "",
      });
      //reset form post
      document.getElementById("form-create-post").reset();
      setPostInfor({
        category: value, //1:phone, 2: laptop, 3: pc
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
        color: "",
      });
    }
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

  const handleDrop = (files, post_id) => {
    const uploaders = files.map((file, index) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "weedzflm"); // Replace the preset name with your own
      formData.append("api_key", "141866846121189"); // Replace API key with your own Cloudinary key
      formData.append("timestamp", (Date.now() / 1000) | 0);
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
          const fileURL = data.secure_url;
          setImageUrl((imageUrl) => [...imageUrl, fileURL]);
          let isBanner = index == 0 ? 1 : 0;
          handleSaveImage(post_id, fileURL, isBanner);
        });
    });
    axios.all(uploaders).then((res) => {
      setIsCreatePost(false);
      toast.success("Tạo thành công");
      window.location.href = "/profile?tab=my-posts";
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
    // validate form post
    setvalidatePost({
      name: validateNullFormPost(postInfor.name),
      brand:
        Number(postInfor.category) !== 3
          ? validateNullFormPost(postInfor.brand)
          : "",
      status: validateNullFormPost(postInfor.status),
      color:
        Number(postInfor.category) !== 3
          ? validateNullFormPost(postInfor.color)
          : "",
      price: !isFree ? validatePrice(postInfor.price) : "",
      address: validateNullFormPost(address),
      title: validateNullFormPost(postInfor.title),
      description: validateNullFormPost(postInfor.description),
      image: file.length > 0 ? "" : "Bạn cần đăng ít nhất 1 hình ảnh",
    });
    let validate = true;
    if (
      validateNullFormPost(postInfor.name) !== "" &&
      validateNullFormPost(postInfor.status) !== "" &&
      validateNullFormPost(address) !== "" &&
      validateNullFormPost(postInfor.title) !== "" &&
      validateNullFormPost(postInfor.description) !== ""
    )
      validate = false;
    if (file.length <= 0) validate = false;
    if (!isFree && validatePrice(postInfor.price) !== "") validate = false;
    if (
      Number(postInfor.category) !== 3 &&
      validateNullFormPost(postInfor.brand) !== "" &&
      validateNullFormPost(postInfor.color) !== ""
    )
      validate = false;
    console.log(file.length, validate);
    if (validate) createPost();
  };

  //tao post
  const createPost = async () => {
    const postData = {
      post_trade_id: null,
      title: postInfor.title,
      category_id: Number(postInfor.category),
      name: postInfor.name,
      description: postInfor.description,
      ram: Number(postInfor.ram),
      storage: Number(postInfor.storage),
      video_url: postInfor.video_url,
      status: postInfor.status,
      price: Number(postInfor.price),
      address: address,
      public_status: Number(postInfor.public_status),
      guarantee: Number(postInfor.guarantee),
      sold: 0,
      color: postInfor.color,
      cpu: postInfor.cpu,
      gpu: postInfor.gpu,
      storage_type: postInfor.storage_type,
      brand_id: Number(postInfor.brand),
      display_size: Number(postInfor.display_size),
    };

    console.log("post", postData);
    await axios
      .post(apiPost, postData, { headers: headers })
      .then((res) => {
        const p = res.data.data;
        console.log("post success", p);
        if (res.data.status) handleDrop(fileObject, p.id);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSaveImage = async (post_id, url, is_banner) => {
    const imageData = {
      post_id: post_id,
      is_banner: is_banner,
      image_url: url,
    };
    // responses.push(
    await axios
      .post(apiImages, imageData, { headers: headers })
      .then((res) => {
        const i = res.data.data;
        console.log("imagesss", i);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const up = async (fileImage) => {
    const formData = new FormData();
    formData.append("file", fileImage);
    console.log(formData);
    await axios
      .post(apiImages, formData, { headers: headers })
      .then((res) => {
        console.log("post image", res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //get detail post
  const [postDetail, setPostDetail] = useState({});
  const params = useParams();
  const history = useHistory();
  useEffect(() => {
    fetchPostData(params.id);
    return () => {};
  }, [params.id]);
  const fetchPostData = async (postId) => {
    let apiPostDetail = `${apiFetchPostDetailWithCheck}/${postId}`;
    const requestPost = axios.get(apiPostDetail);

    await axios
      .all([requestPost])
      .then(
        axios.spread((...responses) => {
          const post = responses[0].data;
          console.log("post", post.status);
          if (post.status !== -1) setPostDetail(post);
          else window.location.href = "/profile";
        })
      )
      .catch((errors) => {
        console.error(errors);
      });
  };
  return (
    <div className="editPostContainer container">
      <Breadcrumb arrLink={postBreadcrumb} />
      <MetaTag
        title={"Chỉnh sửa bài viết"}
        description={"Chỉnh sửa bài viết để thu hút thêm nhiều người"}
      />
      {/* modal address */}
      <Modal show={show} onHide={() => handleClose()} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chọn địa chỉ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="post-city">
                <b>Tỉnh, thành phố*</b>
              </label>
              <select
                className="form-select"
                aria-label="Disabled select example"
                name="city"
                id="post-city"
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
              <label className="form-label" htmlFor="post-district">
                <b>Quận, huyện, thị xã*</b>
              </label>
              <select
                className="form-select"
                aria-label="Disabled select example"
                name="district"
                id="post-district"
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
              <label className="form-label" htmlFor="post-ward">
                <b>Phường, xã, thị trấn*</b>
              </label>
              <select
                className="form-select"
                aria-label="Disabled select example"
                name="wards"
                id="post-ward"
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
            <div className="image-post">
              <div className="image-validate">
                <p>{validatePost.image}</p>
              </div>
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
            </div>
            {/* <div className="video-post">
              <div className="custom-video">
                <label htmlFor="video-upload" className="custom-video-upload">
                  <i className="fas fa-upload"></i> Thêm video
                </label>
                <input
                  type="file"
                  className="custom-video-input"
                  id="video-upload"
                  // multiple
                  onChange={(e) => uploadSingleFile(e)}
                />
              </div>
              <div className="mt-3 view-preview row"></div>
            </div> */}
          </Grid>
          <Grid item xs={12} md={8} className="create-post-detail">
            <div className="mb-3">
              <h3>Thông tin sản phẩm đăng bán</h3>
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="post-category">
                Loại sản phẩm
              </label>
              <select
                className="form-select"
                aria-label="Disabled select example"
                required
                id="post-category"
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
            <form
              className="form-product"
              id="form-create-post"
              onSubmit={(e) => onSubmitForm(e)}
            >
              <div className="mb-3 mt-4">
                <h4>Thông tin chi tiết</h4>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="post-name">
                  Tên sản phẩm&nbsp;<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="post-name"
                  className={
                    validatePost.name
                      ? "form-control is-invalid"
                      : "form-control"
                  }
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
                      <label className="form-label" htmlFor="post-brand">
                        Hãng sản xuất&nbsp;
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        className={
                          validatePost.brand
                            ? "form-select is-invalid"
                            : "form-select"
                        }
                        aria-label="Disabled select example"
                        name="brand"
                        id="post-brand"
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
                      <label className="form-label" htmlFor="post-color">
                        Màu sắc&nbsp;
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="post-color"
                        className={
                          validatePost.color
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        placeholder="Màu sắc"
                        name="color"
                        onChange={(e) => handleOnChange(e)}
                      />
                      <p className="validate-form-text">{validatePost.color}</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="row mb-3">
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="post-status">
                      Tình trạng&nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className={
                        validatePost.status
                          ? "form-select is-invalid"
                          : "form-select"
                      }
                      aria-label="Disabled select example"
                      name="status"
                      id="post-status"
                      onChange={(e) => handleOnChange(e)}
                    >
                      <option value="0">Tình trạng</option>
                      {statusData.map((data, index) => (
                        <option key={index} value={data.id}>
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
                      <label className="form-label" htmlFor="post-guarantee">
                        Bảo hành
                      </label>
                      <input
                        type="number"
                        id="post-guarantee"
                        className="form-control"
                        placeholder="Thời gian bảo hành"
                        min={0}
                        defaultValue={0}
                        name="guarantee"
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                  </div>
                )}
              </div>
              {console.log("cate", Number(postInfor.category))}
              {Number(postInfor.category) > 1 && (
                <div className="row mb-3">
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="post-cpu">
                        Bộ vi xử lý (CPU)
                      </label>
                      <input
                        type="text"
                        id="post-cpu"
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
                      <label className="form-label" htmlFor="post-gpu">
                        Card đồ họa (GPU)
                      </label>
                      <input
                        type="text"
                        id="post-gpu"
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
                    <label className="form-label" htmlFor="post-ram">
                      Ram (GB)
                    </label>
                    <input
                      type="number"
                      id="post-ram"
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
                      <label className="form-label" htmlFor="post-display-size">
                        Kích thước màn hình
                      </label>
                      <select
                        className="form-select"
                        aria-label="Disabled select example"
                        id="post-display-size"
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
                      <label className="form-label" htmlFor="post-rom">
                        Bộ nhớ trong (ROM)
                      </label>
                      <select
                        className="form-select"
                        aria-label="Disabled select example"
                        name="rom"
                        id="post-rom"
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
                      <label className="form-label" htmlFor="post-storage-type">
                        Loại ổ cứng
                      </label>
                      <select
                        className="form-select"
                        aria-label="Disabled select example"
                        name="storage_type"
                        id="post-storage-type"
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
                      <label className="form-label" htmlFor="post-storage">
                        Dung lượng ổ cứng
                      </label>
                      <select
                        className="form-select"
                        aria-label="Disabled select example"
                        name="storage"
                        id="post-storage"
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
                <label className="form-label" htmlFor="post-address">
                  Địa chỉ&nbsp;<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="post-address"
                  className={
                    validatePost.address
                      ? "form-control is-invalid"
                      : "form-control"
                  }
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
                  <label className="form-label" htmlFor="post-price">
                    Giá bán&nbsp;<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    id="post-price"
                    className={
                      validatePost.price
                        ? "form-control is-invalid"
                        : "form-control"
                    }
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
                <label className="form-label" htmlFor="post-title">
                  Tiêu đề&nbsp;<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="post-title"
                  className={
                    validatePost.title
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  name="title"
                  placeholder="Tiêu đề"
                  onChange={(e) => handleOnChange(e)}
                />
                <p className="validate-form-text">{validatePost.title}</p>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="post-description">
                  Mô tả chi tiết&nbsp;<span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  className={
                    validatePost.description
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="post-description"
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
                <label className="form-label" htmlFor="post-public">
                  Chế độ bài viết
                </label>
                <select
                  className="form-select"
                  aria-label="Disabled select example"
                  required
                  name="category"
                  id="post-public"
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
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="soldCheckbox"
                  // defaultChecked={isSold}
                  // onClick={() => onClickSold()}
                />
                <label className="form-check-label" htmlFor="soldCheckbox">
                  Sản phẩm đã bán?
                </label>
              </div>
            </form>
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
              <>
                <div className="mb-3">
                  <h3>Thông tin sản phẩm muốn đổi</h3>
                </div>
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="post-category">
                    Loại sản phẩm
                  </label>
                  <select
                    className="form-select"
                    aria-label="Disabled select example"
                    required
                    id="post-category"
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
                <form
                  className="form-product"
                  id="form-create-post"
                  onSubmit={(e) => onSubmitForm(e)}
                >
                  <div className="mb-3 mt-4">
                    <h4>Thông tin chi tiết</h4>
                  </div>
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="post-name">
                      Tên sản phẩm&nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="post-name"
                      className={
                        validatePost.name
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="Tên sản phẩm"
                      name="name"
                      onChange={(e) => handleOnChange(e)}
                    />
                    <p className="validate-form-text">{validatePost.name}</p>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="post-status">
                          Tình trạng&nbsp;
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          className={
                            validatePost.status
                              ? "form-select is-invalid"
                              : "form-select"
                          }
                          aria-label="Disabled select example"
                          name="status"
                          id="post-status"
                          onChange={(e) => handleOnChange(e)}
                        >
                          <option value="0">Tình trạng</option>
                          {statusData.map((data, index) => (
                            <option key={index} value={data.id}>
                              {data.value}
                            </option>
                          ))}
                        </select>
                        <p className="validate-form-text">
                          {validatePost.status}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 mt-4">
                    <h4>Tiêu đề và mô tả</h4>
                  </div>
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="post-title">
                      Tiêu đề&nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="post-title"
                      className={
                        validatePost.title
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      name="title"
                      placeholder="Tiêu đề"
                      onChange={(e) => handleOnChange(e)}
                    />
                    <p className="validate-form-text">{validatePost.title}</p>
                  </div>
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="post-description">
                      Mô tả chi tiết&nbsp;
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea
                      className={
                        validatePost.description
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      id="post-description"
                      rows="4"
                      placeholder="Mô tả chi tiết
                  - Sản phẩm như thế nào
                  - Chất lượng ra sao
                  - Nhu cầu cụ thể như thế nào"
                      name="description"
                      onChange={(e) => handleOnChange(e)}
                    ></textarea>
                    <p className="validate-form-text">
                      {validatePost.description}
                    </p>
                  </div>
                </form>
              </>
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
                  type="button"
                  className="btn btn-secondary btn-block btn-preview"
                  onClick={(e) => toPreview(e)}
                >
                  Hủy
                </button>
              </div>
              <div className="col">
                <button
                  type="submit"
                  className="btn btn-success btn-block btn-submit"
                  onClick={(e) => onSubmitForm(e)}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
