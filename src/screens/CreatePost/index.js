import React, { useState, useEffect } from "react";
import "./createPost.scss";
import { Grid } from "@material-ui/core";
import MetaTag from "../../components/MetaTag";
import Preloading from "../../components/Loading";
import axios from "axios";
import {
  apiPost,
  apiGetBrandByCategory,
  headerFiles,
  maxNumImage,
  maxSizeVideo,
  apiGetSuggest,
  apiGetCategory,
  apiGetFixedData,
} from "./../../constants";
import { toast } from "react-toastify";
import Breadcrumb from "../../components/Breadcrumb";
import { postBreadcrumb } from "../../constants/breadcrumData";
import { maxSizeImage } from "./../../constants/index";
import {
  appendArrayToFormData,
  filterArrayObjectWithCategoryId,
  scrollToTop,
  setLinkDirect,
  suggest,
} from "../../utils/common";
import AddressSelect from "../../components/AddressSelect";

export default function CreatePost() {
  const [preload, setPreload] = useState(false);
  const [isTrade, setIsTrade] = useState(false);
  const [isFree, setIsFree] = useState(false);

  const [isCreatePost, setIsCreatePost] = useState(false);
  const [videoFile, setVideoFile] = useState();
  const [address, setAddress] = useState("");

  const [categoryData, setCategoryData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [storageTypeData, setStorageTypeData] = useState([]);
  const [storageData, setStorageData] = useState([]);
  const [commandData, setCommandData] = useState([]);
  const [resolutionData, setResolutionData] = useState([]);

  const [suggestName, setSuggestName] = useState([]);
  const [suggestNames, setSuggestNames] = useState([]);
  const [suggestColor, setSuggestColor] = useState([]);
  const [suggestColors, setSuggestColors] = useState([]);
  const [suggestCpu, setSuggestCpu] = useState([]);
  const [suggestCpus, setSuggestCpus] = useState([]);
  const [suggestGpu, setSuggestGpu] = useState([]);
  const [suggestGpus, setSuggestGpus] = useState([]);
  const [suggestDisplay, setSuggestDisplay] = useState([]);
  const [suggestDisplays, setSuggestDisplays] = useState([]);

  const [postInfor, setPostInfor] = useState({
    category: 1, //1:phone, 2: laptop, 3: pc
    name: "",
    status: null,
    guarantee: 0,
    ram: null,
    storage: 0,
    address: "",
    price: null,
    title: "",
    description: "",
    public_status: 1,
    is_trade: 0,
    video_url: null,
    command: null,
  });
  const [productChild, setProductChild] = useState({
    brand_id: null,
    cpu: null,
    gpu: null,
    storage_type: null,
    display_size: null,
    color: null,
    pin: null,
    resolution: null,
  });
  const [validatePost, setvalidatePost] = useState({
    name: "",
    brand_id: "",
    status: "",
    color: "",
    address: "",
    price: "",
    title: "",
    description: "",
    fileImages: "",
    fileVideo: "",
    command: "",
    pin: "",
    resolution: "",
  });
  useEffect(() => {
    setLinkDirect();
    fetchSuggest();
    fetchAllData();
    return () => {
      setPostInfor({});
      setvalidatePost({});
      setVideoFile();
      setFile();
      setFileOject();
      setVideoFile();
      setSuggestName([]);
      setSuggestNames([]);
      setSuggestColor([]);
      setSuggestColors([]);
      setSuggestCpu([]);
      setSuggestCpus([]);
      setSuggestGpu([]);
      setSuggestGpus([]);
      setSuggestDisplay([]);
      setSuggestDisplays([]);
      setCategoryData([]);
      setStatusData([]);
      setCommandData([]);
      setStorageTypeData([]);
      setStorageData([]);
      setResolutionData([]);
    };
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPostInfor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(name, value);
    if (name === "category") {
      setvalidatePost({
        name: "",
        brand_id: "",
        status: "",
        color: "",
        price: "",
        address: "",
        title: "",
        description: "",
        fileImages: "",
        fileVideo: "",
        command: "",
        resolution: "",
        pin: "",
      });
      //reset form post
      document.getElementById("form-create-post").reset();
      setPostInfor({
        category: value, //1:phone, 2: laptop, 3: pc
        name: "",
        status: null,
        guarantee: 0,
        ram: null,
        storage: null,
        address: "",
        price: null,
        title: "",
        description: "",
        public_status: 1,
        is_trade: 0,
        video_url: null,
        command: null,
      });
    }
    if (name == "name") {
      let matches = suggest(value, suggestNames);
      setSuggestName(matches);
    }
  };
  const handleOnChangeChild = (e) => {
    const { name, value } = e.target;
    setProductChild((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name == "color") {
      let matches = suggest(value, suggestColors);
      setSuggestColor(matches);
    }
    if (name == "cpu") {
      let matches = suggest(value, suggestCpus);
      setSuggestCpu(matches);
    }
    if (name == "gpu") {
      let matches = suggest(value, suggestGpus);
      setSuggestGpu(matches);
    }
    if (name == "display_size") {
      let matches = suggest(value, suggestDisplays);
      setSuggestDisplay(matches);
    }
  };

  const onClickSuggest = (type, value) => {
    if (
      type == "color" ||
      type == "cpu" ||
      type == "gpu" ||
      type == "display_size"
    )
      setProductChild((prevState) => ({
        ...prevState,
        [type]: value,
      }));
    if (type == "name")
      setPostInfor((prevState) => ({
        ...prevState,
        [type]: value,
      }));
  };

  const fetchSuggest = async () => {
    try {
      var allSuggest = JSON.parse(sessionStorage.suggestAll);
      console.log("suggest", allSuggest);
      setSuggestNames(allSuggest?.name);
      setSuggestColors(allSuggest?.color);
      setSuggestDisplays(allSuggest?.display_size);
      setSuggestCpus(allSuggest?.cpu);
      setSuggestGpus(allSuggest?.gpu);
    } catch (error) {
      await axios
        .get(apiGetSuggest)
        .then((res) => {
          console.log(res.data.data);
          const data = res.data.data;
          setSuggestNames(data?.name);
          setSuggestColors(data?.color);
          setSuggestDisplays(data?.display_size);
          setSuggestCpus(data?.cpu);
          setSuggestGpus(data?.gpu);
          sessionStorage.setItem("suggestAll", JSON.stringify(data));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const [file, setFile] = useState([]);
  const [fileObject, setFileOject] = useState([]);
  const uploadSingleFile = (e) => {
    let fileImage = e.target.files;
    let fileImages = "fileImages";
    let mess = "";
    if (file && file.length + fileImage.length <= maxNumImage && fileImage) {
      let status = true;
      for (let i = 0; i < fileImage?.length; i++) {
        if (fileImage[i].size > maxSizeImage) {
          mess = "Bạn chỉ được đăng ảnh kích thước tối đa 2mb";
          status = false;
          break;
        }
      }
      let arrShow = [];
      let arrFile = [];
      if (status) {
        for (let i = 0; i < fileImage?.length; i++) {
          arrShow.push(URL.createObjectURL(fileImage[i]));
          arrFile.push(fileImage[i]);
        }
        setFile([...file, ...arrShow]);
        setFileOject([...fileObject, ...arrFile]);
      }
    } else {
      mess = `Bạn chỉ được đăng tối đa ${maxNumImage} ảnh`;
    }
    setvalidatePost((prevState) => ({
      ...prevState,
      [fileImages]: mess,
    }));
  };
  const uploadSingleVideo = (e) => {
    let fileVideo = e.target.files[0];
    if (fileVideo) {
      let video = "fileVideo";
      let mess = "";
      if (fileVideo.size > maxSizeVideo) {
        mess = "Bạn chỉ được có thể đăng video dưới 10mb";
      } else {
        mess = "";
        setVideoFile(fileVideo);
      }
      setvalidatePost((prevState) => ({
        ...prevState,
        [video]: mess,
      }));
    }
  };
  const deleteFile = (e) => {
    const s = file.filter((item, index) => index !== e);
    const o = fileObject.filter((item, index) => index !== e);
    setFile(s);
    setFileOject(o);
  };

  const deleteVideoNew = () => {
    setVideoFile();
  };

  const onClickTrade = (e) => {
    const { checked } = e.target;
    setIsTrade(checked);
  };

  const onClickFree = (e) => {
    const { checked } = e.target;
    let price = "price";
    if (checked)
      setPostInfor((prevState) => ({
        ...prevState,
        [price]: 0,
      }));
    setIsFree(checked);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    scrollToTop();
    setvalidatePost({
      name: "",
      brand_id: "",
      status: "",
      color: "",
      address: "",
      price: "",
      title: "",
      description: "",
      fileImages: "",
      fileVideo: "",
      command: "",
      pin: "",
      resolution: "",
    });
    createPost();
  };

  useEffect(() => {
    fetchBrand(postInfor.category);
    return () => {};
  }, [postInfor.category]);

  const [brandCategory, setbrandCategory] = useState([]);
  const fetchBrand = async (id) => {
    if (id == "1" || id == "2")
      try {
        await axios.get(`${apiGetBrandByCategory}/${id}`).then((res) => {
          const brands = res.data.data;
          setbrandCategory(brands);
        });
      } catch (error) {
        return { statusCode: 500, body: error.toString() };
      }
  };
  //tao post
  const createPost = async () => {
    var mergePostData;
    const postData = {
      category_id: parseInt(postInfor?.category),
      is_trade: isTrade ? 1 : 0,
      name: postInfor?.name,
      title: postInfor?.title,
      description: postInfor?.description,
      address: address,
      price: parseInt(postInfor?.price),
      status: parseInt(postInfor?.status),
      sold: 0,
      public_status: parseInt(postInfor?.public_status),
      ram: parseInt(postInfor?.ram || 0),
      storage: parseInt(postInfor?.storage) || 0,
      guarantee: parseInt(postInfor?.guarantee || 0),
      command: parseInt(postInfor?.command || 0),
      fileVideo: videoFile,

      color: productChild?.color,
      cpu: productChild?.cpu,
      gpu: productChild?.gpu,
      storage_type: parseInt(productChild?.storage_type) || 0,
      brand_id: parseInt(productChild?.brand_id),
      display_size: parseFloat(productChild?.display_size),
      pin: parseInt(productChild?.pin),
      resolution: productChild?.resolution,
    };

    console.log(postData);
    mergePostData = { ...postData };

    const formData = appendArrayToFormData(mergePostData);
    for (let i = 0; i < fileObject.length; i++) {
      formData.append("fileImages[]", fileObject[i]);
    }
    setPreload(true);
    await axios
      .post(apiPost, formData, {
        headers: headerFiles,
      })
      .then((res) => {
        const p = res.data.data;
        if (res.data.status === 1) {
          console.log("post success", p);
          setIsCreatePost(false);
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.href = "/post-manager";
          }, 1000);
        }
        if (res.data.status === -1) toast.error(res.data.message);
        else {
          handleValidate(res.data);
        }
        setPreload(false);
      })
      .catch((error) => {
        console.error(error);
        setPreload(false);
        toast.error("Tạo bài viết không thành công");
      });
  };

  const handleValidate = (validateData) => {
    Object.keys(validateData).forEach(function (key) {
      console.log(key, validateData[key]);
      setvalidatePost((prevState) => ({
        ...prevState,
        [key]: validateData[key][0],
      }));
    });
  };

  const fetchAllData = async () => {
    const requestPost = axios.get(apiGetCategory);
    const requestView = axios.get(apiGetFixedData);
    await axios
      .all([requestPost, requestView])
      .then(
        axios.spread((...responses) => {
          const categories = responses[0].data.data;
          const fixedData = responses[1].data.data;
          console.log("post", categories);
          setCategoryData(categories);
          setStatusData(fixedData?.status);
          setCommandData(fixedData?.command);
          setStorageTypeData(fixedData?.storageType);
          setStorageData(fixedData?.storage);
          setResolutionData(fixedData?.resolution);
        })
      )
      .catch((errors) => {
        console.error(errors);
      });
  };

  return (
    <div className="createPostContainer container">
      <Breadcrumb arrLink={postBreadcrumb} />
      <MetaTag
        title={"Tạo bài viết"}
        description={"Đăng bán, trao đổi, tắng sản phẩm"}
      />
      {isCreatePost && <Preloading />}
      {preload ? (
        <Preloading />
      ) : (
        <Grid container className="form-container">
          <Grid item xs={12} md={4} className="create-post-images">
            <div className="image-post">
              <div className="custom-file">
                <label htmlFor="file-upload" className="custom-file-upload">
                  <i className="fas fa-upload"></i> Thêm ảnh
                </label>
                <input
                  type="file"
                  className="custom-file-input"
                  id="file-upload"
                  multiple
                  accept="image/*"
                  onChange={(e) => uploadSingleFile(e)}
                />
              </div>
              <div className="mt-3 view-preview row">
                {file &&
                  file?.map((item, index) => {
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
              <div className="image-validate">
                <p>{validatePost.fileImages}</p>
              </div>
            </div>
            <div className="video-post">
              <div className="custom-video">
                <label htmlFor="video-upload" className="custom-video-upload">
                  <i className="fas fa-upload"></i> Thêm video
                </label>
                <input
                  type="file"
                  className="custom-video-input"
                  id="video-upload"
                  // multiple
                  accept="video/*"
                  onChange={(e) => uploadSingleVideo(e)}
                />
              </div>
              <div className="mt-3 view-preview row">
                {videoFile && (
                  <>
                    <video width="400" controls>
                      <source src={URL.createObjectURL(videoFile)} />
                    </video>
                    <i
                      className="fas fa-times-circle fa-2x fa delete-video-icon"
                      onClick={() => deleteVideoNew()}
                    ></i>
                  </>
                )}
              </div>
              <div className="image-validate">
                <p>{validatePost.fileVideo}</p>
              </div>
            </div>
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
                {categoryData?.map((data, index) => (
                  <option key={index} value={data?.id}>
                    {data?.name}
                  </option>
                ))}
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
              <div className="mb-3 mt-4">
                <h5>Đây là sản phẩm bạn có mong muốn mua?</h5>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="tradeCheckbox"
                  checked={isTrade}
                  onChange={(e) => onClickTrade(e)}
                />
                <label className="form-check-label" htmlFor="tradeCheckbox">
                  Mua sản phẩm
                </label>
              </div>
              <div className="form-outline mb-3 position-relative">
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
                  value={postInfor?.name || ""}
                  onBlur={() =>
                    setTimeout(() => {
                      setSuggestName([]);
                    }, 100)
                  }
                />
                {suggestName?.length > 0 && (
                  <div className="suggest-component">
                    {suggestName?.map((name, index) => (
                      <div
                        key={index}
                        onClick={() => onClickSuggest("name", name)}
                      >
                        <p>{name}</p>
                      </div>
                    ))}
                  </div>
                )}
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
                          validatePost.brand_id
                            ? "form-select is-invalid"
                            : "form-select"
                        }
                        aria-label="Disabled select example"
                        name="brand_id"
                        id="post-brand"
                        onChange={(e) => handleOnChangeChild(e)}
                      >
                        <option>Hãng sản xuất</option>
                        {brandCategory &&
                          brandCategory?.map((data, index) => (
                            <option key={index} value={data.id}>
                              {data.name}
                            </option>
                          ))}
                      </select>
                      <p className="validate-form-text">
                        {validatePost.brand_id}
                      </p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline position-relative">
                      <label className="form-label" htmlFor="post-color">
                        Màu sắc
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
                        onChange={(e) => handleOnChangeChild(e)}
                        value={productChild?.color || ""}
                        onBlur={() =>
                          setTimeout(() => {
                            setSuggestColor([]);
                          }, 100)
                        }
                      />
                      {suggestColor?.length > 0 && (
                        <div className="suggest-component">
                          {suggestColor?.map((color, index) => (
                            <div
                              key={index}
                              onClick={() => onClickSuggest("color", color)}
                            >
                              <p>{color}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="validate-form-text">{validatePost.color}</p>
                    </div>
                  </div>
                </div>
              )}
              {/* -----------------new------------------ */}
              {Number(postInfor.category) == 1 && (
                <div className="col">
                  <div className="form-outline position-relative">
                    <label className="form-label" htmlFor="post-pin">
                      Dung lượng pin
                    </label>
                    <input
                      type="number"
                      id="post-pin"
                      className="form-control"
                      placeholder="Dung lượng pin"
                      min={0}
                      name="pin"
                      onChange={(e) => handleOnChangeChild(e)}
                      value={productChild?.pin || ""}
                    />
                    <p className="validate-form-text">{validatePost.pin}</p>
                  </div>
                </div>
              )}
              {Number(postInfor.category) < 3 && (
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="post-resolution">
                      Độ phân giải màn hình
                    </label>
                    <select
                      className="form-select"
                      aria-label="Disabled select example"
                      name="resolution"
                      id="post-resolution"
                      onChange={(e) => handleOnChangeChild(e)}
                    >
                      <option value={0}>Độ phân giải màn hình</option>
                      {resolutionData?.map((data, index) => (
                        <option key={index} value={data.id}>
                          {`${data.value}`}
                        </option>
                      ))}
                    </select>
                    <p className="validate-form-text">{validatePost.storage}</p>
                  </div>
                </div>
              )}
              <div className="row mb-3">
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="post-command">
                      Nhu cầu sử dụng
                    </label>
                    <select
                      className={
                        validatePost.command
                          ? "form-select is-invalid"
                          : "form-select"
                      }
                      aria-label="Disabled select example"
                      name="command"
                      id="post-command"
                      onChange={(e) => handleOnChange(e)}
                    >
                      <option>Nhu cầu sử dụng</option>
                      {commandData &&
                        filterArrayObjectWithCategoryId(
                          commandData,
                          postInfor.category
                        )?.map((data, index) => (
                          <option key={index} value={data.id}>
                            {data.value}
                          </option>
                        ))}
                    </select>
                    <p className="validate-form-text">{validatePost.command}</p>
                  </div>
                </div>
              </div>
              {/* ------------------------------------ */}
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
                      <option value={null}>Tình trạng</option>
                      {statusData?.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.value}
                        </option>
                      ))}
                    </select>
                    <p className="validate-form-text">{validatePost.status}</p>
                  </div>
                </div>
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
              </div>
              {Number(postInfor.category) > 1 && (
                <div className="row mb-3">
                  <div className="col">
                    <div className="form-outline position-relative">
                      <label className="form-label" htmlFor="post-cpu">
                        Bộ vi xử lý (CPU)
                      </label>
                      <input
                        type="text"
                        id="post-cpu"
                        className="form-control"
                        placeholder="Bộ vi xử lý"
                        name="cpu"
                        onChange={(e) => handleOnChangeChild(e)}
                        value={productChild?.cpu || ""}
                        onBlur={() =>
                          setTimeout(() => {
                            setSuggestCpu([]);
                          }, 100)
                        }
                      />
                      {suggestCpu?.length > 0 && (
                        <div className="suggest-component">
                          {suggestCpu?.map((cpu, index) => (
                            <div
                              key={index}
                              onClick={() => onClickSuggest("cpu", cpu)}
                            >
                              <p>{cpu}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="validate-form-text">{validatePost.cpu}</p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline position-relative">
                      <label className="form-label" htmlFor="post-gpu">
                        Card đồ họa (GPU)
                      </label>
                      <input
                        type="text"
                        id="post-gpu"
                        className="form-control"
                        placeholder="Card đồ họa dời"
                        name="gpu"
                        onChange={(e) => handleOnChangeChild(e)}
                        value={productChild?.gpu || ""}
                        onBlur={() =>
                          setTimeout(() => {
                            setSuggestGpu([]);
                          }, 100)
                        }
                      />
                      {suggestGpu?.length > 0 && (
                        <div className="suggest-component">
                          {suggestGpu?.map((gpu, index) => (
                            <div
                              key={index}
                              onClick={() => onClickSuggest("gpu", gpu)}
                            >
                              <p>{gpu}</p>
                            </div>
                          ))}
                        </div>
                      )}
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
                      name="ram"
                      onChange={(e) => handleOnChange(e)}
                    />
                    <p className="validate-form-text">{validatePost.ram}</p>
                  </div>
                </div>
                {Number(postInfor.category) > 1 && (
                  <div className="col">
                    <div className="form-outline position-relative">
                      <label className="form-label" htmlFor="post-display-size">
                        Kích thước màn hình
                      </label>
                      <input
                        type="number"
                        id="post-display-size"
                        className="form-control"
                        placeholder="Kích thước màn hình"
                        min={0}
                        name="display_size"
                        onChange={(e) => handleOnChangeChild(e)}
                        value={productChild?.display_size || ""}
                        onBlur={() =>
                          setTimeout(() => {
                            setSuggestDisplay([]);
                          }, 100)
                        }
                      />
                      {suggestDisplay?.length > 0 && (
                        <div className="suggest-component">
                          {suggestDisplay?.map((display_size, index) => (
                            <div
                              key={index}
                              onClick={() =>
                                onClickSuggest("display_size", display_size)
                              }
                            >
                              <p>{display_size}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="validate-form-text">
                        {validatePost.display_size}
                      </p>
                    </div>
                  </div>
                )}
                {Number(postInfor.category) == 1 && (
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="post-storage">
                        Dung lượng bộ nhớ
                      </label>
                      <select
                        className="form-select"
                        aria-label="Disabled select example"
                        name="storage"
                        id="post-storage"
                        onChange={(e) => handleOnChange(e)}
                      >
                        <option value={0}>Dung lượng bộ nhớ</option>
                        {storageData?.map((data, index) => (
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
                        onChange={(e) => handleOnChangeChild(e)}
                      >
                        <option>Loại ổ cứng</option>
                        {storageTypeData?.map((data, index) => (
                          <option key={index} value={data.id}>
                            {data.value}
                          </option>
                        ))}
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
                        <option value={0}>Dung lượng ổ cứng</option>
                        {storageData?.map((data, index) => (
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
                <AddressSelect
                  setAddress={setAddress}
                  validateAddress={validatePost.address}
                />
                <p className="validate-form-text">{validatePost.address}</p>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="freeCheckbox"
                  defaultChecked={isFree}
                  onChange={(e) => onClickFree(e)}
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
                    min={0}
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
                  name="public_status"
                  id="post-public"
                  onChange={(e) => handleOnChange(e)}
                  placeholder="Chế độ bài viết"
                >
                  <option value="1">Công khai</option>
                  <option value="0">Riêng tư</option>
                </select>
                <p className="validate-form-text">
                  {validatePost.public_status}
                </p>
              </div>
            </form>
            <div className="row mb-3">
              <div className="col"></div>
              <div className="col-lg-6 col-sm-12">
                <button
                  type="submit"
                  className="btn btn-success btn-block btn-submit"
                  onClick={(e) => onSubmitForm(e)}
                >
                  Đăng tin
                </button>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
