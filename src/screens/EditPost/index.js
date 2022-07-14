import React, { useState, useEffect } from "react";
import "./_editPost.scss";
import { Grid } from "@material-ui/core";
import MetaTag from "../../components/MetaTag";
import Preloading from "../../components/Loading";
import axios from "axios";
import {
  headers,
  apiImages,
  storageData,
  statusData,
  apiPost,
  apiGetBrandByCategory,
  apiFetchPostDetail,
  categoryData,
  storageTypeData,
  maxSizeVideo,
  headerFiles,
  maxNumImage,
  maxSizeImage,
} from "./../../constants";
import { toast } from "react-toastify";
import Breadcrumb from "../../components/Breadcrumb";
import { editPostBreadcrumb } from "../../constants/breadcrumData";
import { useParams } from "react-router-dom";
import {
  appendArrayToFormData,
  scrollToTop,
  setLinkDirect,
} from "../../utils/common";
import AddressSelect from "../../components/AddressSelect";

export default function EditPost() {
  const [preload, setPreload] = useState(true);
  const [isTrade, setIsTrade] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const [address, setAddress] = useState("");

  const [isCreatePost, setIsCreatePost] = useState(false);
  const [imageUrl, setImageUrl] = useState([]);
  const [imageUrlEdit, setImageUrlEdit] = useState([]);
  const [videoFile, setVideoFile] = useState();

  //state delete image, video
  const [deleteImageId, setDeleteImageId] = useState("");
  const [isDeleteVideo, setIsDeleteVideo] = useState(0);

  const [postInfor, setPostInfor] = useState({
    category: 1, //1:phone, 2: laptop, 3: pc
    name: "",
    status: null,
    guarantee: null,
    ram: null,
    storage: null,
    address: "",
    price: null,
    title: "",
    description: "",
    public_status: 1,
    is_trade: 0,
    video_url: "",
  });
  const [productChild, setProductChild] = useState({
    cpu: null,
    gpu: null,
    ram: null,
    storage_type: null,
    storage: null,
    display_size: null,
    color: null,
  });
  const [postTradeInfor, setPostTradeInfor] = useState({
    category: 1, //1:phone, 2: laptop, 3: pc
    name: "",
    brand_id: "",
    status: "",
    guarantee: null,
    cpu: "",
    gpu: "",
    ram: null,
    storage_type: null,
    display_size: null,
    storage: null,
    description: "",
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

    nameTrade: "",
    titleTrade: "",
    descriptionTrade: "",
    guaranteeTrade: "",
  });
  const params = useParams();
  useEffect(() => {
    setLinkDirect();
    fetchAllData(params.id);
    return () => {
      setPostInfor({});
      setPostTradeInfor({});
      setvalidatePost({});
      setVideoFile();
      setProductChild({});
    };
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPostInfor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log("change data", name, value);
  };
  const handleOnChangeChild = (e) => {
    const { name, value } = e.target;
    setProductChild((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log("change data child", name, value);
  };
  // const handleOnChangeTrade = (e) => {
  //   const { name, value } = e.target;
  //   setPostTradeInfor((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  //   console.log(name, value);
  // };
  const [file, setFile] = useState([]);
  const [fileObject, setFileOject] = useState([]);
  const uploadSingleFile = (e) => {
    let fileImage = e.target.files;
    let fileImages = "fileImages";
    let mess = "";
    if (
      file.length + imageUrlEdit.length + fileImage.length <= maxNumImage &&
      fileImage
    ) {
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
    //check size video < 30mb
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

  const deleteVideo = (e) => {
    //change state video_url
    let video_url = "video_url";
    setPostInfor((prevState) => ({
      ...prevState,
      [video_url]: null,
    }));
    setIsDeleteVideo(1);
  };

  const deleteVideoNew = () => {
    setVideoFile();
  };

  const deleteImageUrl = (id) => {
    let imgId = "";
    if (deleteImageId == "") imgId = `${id}`;
    else imgId = `${deleteImageId},${id}`;
    setDeleteImageId(imgId);
    setImageUrlEdit(imageUrlEdit.filter((item) => item.id !== id));
  };

  // const saveImages = (files, post_id) => {
  //   const uploaders = files.map((file, index) => {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("tags", `codeinfuse, medium, gist`);
  //     formData.append("upload_preset", "weedzflm"); // Replace the preset name with your own
  //     formData.append("api_key", "141866846121189"); // Replace API key with your own Cloudinary key
  //     formData.append("timestamp", (Date.now() / 1000) | 0);
  //     return axios
  //       .post(
  //         "https://api.cloudinary.com/v1_1/codeinfuse/image/upload",
  //         formData,
  //         {
  //           headers: { "X-Requested-With": "XMLHttpRequest" },
  //         }
  //       )
  //       .then((response) => {
  //         const data = response.data;
  //         const fileURL = data.secure_url;
  //         setImageUrl((imageUrl) => [...imageUrl, fileURL]);
  //         let isBanner = imageUrlEdit.length > 0 ? 0 : 1;
  //         handleSaveImage(post_id, fileURL, isBanner);
  //       });
  //   });
  //   axios.all(uploaders).then((res) => {
  //     setIsCreatePost(false);
  //     toast.success("Cập nhật sản phẩm thành công");
  //     setPreload(false);
  //     // window.location.href = "/profile?tab=my-posts";
  //   });
  // };

  // const handleSaveImage = async (post_id, url, is_banner) => {
  //   const imageData = {
  //     product_id: post_id,
  //     is_banner: is_banner,
  //     image_url: url,
  //   };
  //   await axios
  //     .post(apiImages, imageData, { headers: headers })
  //     .then((res) => {
  //       const i = res.data.data;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // const onClickTrade = (e) => {
  //   const { checked } = e.target;
  //   let is_trade = "is_trade";
  //   setPostInfor((prevState) => ({
  //     ...prevState,
  //     [is_trade]: checked ? 1 : 0,
  //   }));
  //   setIsTrade(checked);
  //   console.log(checked);
  // };

  const onClickFree = (e) => {
    const { checked } = e.target;
    setIsFree(checked);
    let price = "price";
    if (checked)
      setPostInfor((prevState) => ({
        ...prevState,
        [price]: 0,
      }));
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    // setPreload(true);
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
    });
    updatePost();
  };

  useEffect(() => {
    fetchBrand(postInfor?.category);
    return () => {};
  }, [postInfor.category]);

  const [brandCategory, setbrandCategory] = useState([]);
  const fetchBrand = async (id) => {
    if (id == "1" || id == "2")
      try {
        await axios.get(`${apiGetBrandByCategory}/${id}`).then((res) => {
          const brands = res.data.data;
          console.log("brands by category", res.data.data);
          setbrandCategory(brands);
        });
      } catch (error) {
        return { statusCode: 500, body: error.toString() };
      }
  };

  // const uploadVideo = async () => {
  //   const videoData = new FormData();
  //   videoData.append("file", videoFile, "product");
  //   console.log("update video");
  //   await axios
  //     .post(apiUploadVideo, videoData, { headers: headerFiles })
  //     .then((res) => {
  //       console.log(res.data);
  //       let data = res.data;
  //       if (data.status) {
  //         //thanh cong
  //         let video_url = "video_url";
  //         setPostInfor((prevState) => ({
  //           ...prevState,
  //           [video_url]: data.data,
  //         }));
  //         updatePost();
  //       } else {
  //         //that bai
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  //tao post
  const updatePost = async () => {
    var mergePostData = null;
    const postData = {
      is_trade: postInfor?.is_trade,
      title: postInfor?.title,
      category_id: parseInt(postInfor?.category),
      name: postInfor?.name,
      description: postInfor?.description,
      ram: parseInt(postInfor?.ram || 0),
      storage: parseInt(postInfor?.storage),
      status: parseInt(postInfor?.status),
      price: parseFloat(postInfor?.price),
      address: address,
      public_status: parseInt(postInfor?.public_status),
      guarantee: parseInt(postInfor?.guarantee || 0),
      sold: parseInt(postInfor?.sold),
      color: productChild?.color,
      brand_id: parseInt(productChild?.brand_id),
      cpu: productChild?.cpu,
      gpu: productChild?.gpu,
      storage_type: parseInt(productChild?.storage_type),
      display_size: parseFloat(productChild?.display_size || 0),
      // fileImages: fileObject,
      fileVideo: videoFile,
      video_url: postInfor?.video_url,
      is_delete_video: isDeleteVideo,
      is_delete_image: deleteImageId,
    };

    mergePostData = { ...postData };

    console.log("post", mergePostData);
    const formData = appendArrayToFormData(mergePostData);
    for (let i = 0; i < fileObject.length; i++) {
      formData.append("fileImages[]", fileObject[i]);
    }
    let fileImages = "fileImages";
    if (!((file && file.length) || imageUrlEdit.length)) {
      setvalidatePost((prevState) => ({
        ...prevState,
        [fileImages]: "Bạn cần đăng ít nhất 1 hình ảnh",
      }));
    } else {
      setPreload(true);
      await axios
        .post(`${apiPost}/${params.id}`, formData, {
          headers: headerFiles,
        })
        .then((res) => {
          const p = res.data.data;
          console.log("post success", p, res);
          if (res.data.status == 1) {
            setIsCreatePost(false);
            toast.success(res.data.message);
          } else {
            toast.error("Cập nhật bài viết không thành công");
            handleValidate(res.data);
          }
          setPreload(false);
        })
        .catch((error) => {
          console.error(error);
          setPreload(false);
          toast.error("Cập nhật bài viết không thành công");
        });
    }
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

  const fetchAllData = async (postId) => {
    let apiPostDetail = `${apiFetchPostDetail}/${postId}`;
    const requestPost = axios.get(apiPostDetail, { headers: headers });
    setPreload(true);
    await axios
      .all([requestPost])
      .then(
        axios.spread((...responses) => {
          const post = responses[0].data.data;
          console.log("post", post);
          setPreload(false);
          if (post.price == 0) setIsFree(true);
          const name = "category";
          const value = post.category_id;
          setPostInfor((prevState) => ({
            ...prevState,
            [name]: value,
          }));
          setAddress(post.address);
          if (post.postTrade != null) {
            setPostTradeInforData(post.postTrade);
            setIsTrade(true);
          }
          setPostInforData(post);
          setImageUrlEdit(post.images);
        })
      )
      .catch((errors) => {
        console.error(errors);
      });
  };

  const setPostInforData = (data) => {
    setPostInfor({
      category: data?.category_id,
      name: data?.name,
      brand_id: data?.brand_id,
      status: data?.status,
      guarantee: data?.guarantee,
      ram: data?.ram,
      storage: data?.storage,
      address: data?.address,
      price: data?.price,
      title: data?.title,
      description: data?.description,
      public_status: data?.public_status,
      is_trade: data?.is_trade,
      video_url: data?.video_url,
      sold: data?.sold,
      productChild: data?.productMobile
        ? data?.productMobile
        : data?.productLaptop
        ? data?.productLaptop
        : data.productPc
        ? data?.productPc
        : null,
    });
    setProductChild(
      data?.productMobile
        ? data?.productMobile
        : data?.productLaptop
        ? data?.productLaptop
        : data.productPc
        ? data?.productPc
        : null
    );
  };

  const setPostTradeInforData = (data) => {
    console.log("post trade", data);
    setPostTradeInfor({
      id: data.id,
      category: data.category_id,
      name: data.name,
      guarantee: data.guarantee,
      title: data.title,
      description: data.description,
    });
  };

  return (
    <div className="createPostContainer container">
      {/* <button onClick={() => testUpload(fileObject)}>upload</button> */}
      <Breadcrumb arrLink={editPostBreadcrumb} />
      <MetaTag
        title={"Chỉnh sửa bài viết"}
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
                {imageUrlEdit &&
                  imageUrlEdit.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="col-lg-6 col-md-3 col-sm-6 image-preview mb-2 "
                      >
                        <div className="image-selected">
                          <img src={item.image_url} alt="" width="100%" />
                          <i
                            className="fas fa-times-circle fa delete-image"
                            onClick={() => deleteImageUrl(item.id)}
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
                {file &&
                  file.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="col-lg-6 col-md-3 col-sm-6 image-preview mb-2 "
                      >
                        <div className="image-selected">
                          <img src={item} alt="" width="100%" />
                          <i
                            className="fas fa-times-circle fa delete-image"
                            onClick={() => deleteFile(index)}
                          ></i>
                          {index === 0 && imageUrlEdit.length === 0 ? (
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
                {postInfor?.video_url && !videoFile && (
                  <>
                    <video width="400" controls>
                      <source src={postInfor?.video_url} />
                    </video>
                    <i
                      className="fas fa-times-circle fa-2x fa delete-video-icon"
                      onClick={() => deleteVideo()}
                    ></i>
                  </>
                )}
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
                disabled={true}
                value={postInfor?.category || 0}
              >
                <option value={0}>Chọn loại sản phẩm</option>
                {categoryData &&
                  categoryData.map((data, index) => (
                    <option key={index} value={data.id}>
                      {data.value}
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
                  defaultValue={postInfor?.name}
                  onChange={(e) => handleOnChange(e)}
                />
                <p className="validate-form-text">{validatePost.name}</p>
              </div>
              {Number(postInfor?.category) < 3 && (
                <div className="row mb-3">
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="post-brand">
                        Hãng sản xuất&nbsp;
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      {console.log("sp con", productChild)}
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
                        value={productChild?.brand_id || 0}
                      >
                        <option value={0}>Hãng sản xuất</option>
                        {brandCategory &&
                          brandCategory.map((data, index) => (
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
                    <div className="form-outline">
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
                        defaultValue={
                          productChild?.color == "null"
                            ? ""
                            : productChild?.color
                        }
                        onChange={(e) => handleOnChangeChild(e)}
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
                      value={postInfor?.status || 0}
                    >
                      <option value={0}>Tình trạng</option>
                      {statusData.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.value}
                        </option>
                      ))}
                    </select>
                    <p className="validate-form-text">{validatePost.status}</p>
                  </div>
                </div>
                {Number(postInfor?.category) < 3 && (
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
                        defaultValue={postInfor?.guarantee}
                        name="guarantee"
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                  </div>
                )}
              </div>
              {Number(postInfor?.category) > 1 && (
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
                        defaultValue={
                          productChild?.cpu == "null" ? "" : productChild?.cpu
                        }
                        onChange={(e) => handleOnChangeChild(e)}
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
                        defaultValue={
                          productChild?.gpu == "null" ? "" : productChild?.gpu
                        }
                        onChange={(e) => handleOnChangeChild(e)}
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
                      defaultValue={postInfor?.ram == 0 ? null : postInfor?.ram}
                      name="ram"
                      onChange={(e) => handleOnChange(e)}
                    />
                    <p className="validate-form-text">{validatePost.ram}</p>
                  </div>
                </div>
                {Number(postInfor?.category) > 1 && (
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" htmlFor="post-display-size">
                        Kích thước màn hình
                      </label>
                      <input
                        type="number"
                        id="post-display-size"
                        className="form-control"
                        placeholder="Kích thước màn hính"
                        min={0}
                        defaultValue={productChild?.display_size}
                        name="display_size"
                        onChange={(e) => handleOnChangeChild(e)}
                      />
                      <p className="validate-form-text">
                        {validatePost.display_size}
                      </p>
                    </div>
                  </div>
                )}
                {Number(postInfor?.category) == 1 && (
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
                        value={postInfor?.storage || 0}
                      >
                        <option value={0}>Dung lượng bộ nhớ</option>
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
                )}
              </div>
              {Number(postInfor?.category) > 1 && (
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
                        value={productChild?.storage_type || 0}
                      >
                        <option value={0}>Loại ổ cứng</option>
                        {storageTypeData.map((data, index) => (
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
                        value={postInfor?.storage || 0}
                      >
                        <option value={0}>Dung lượng ổ cứng cứng</option>
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
                <AddressSelect
                  address={address}
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
                    defaultValue={postInfor?.price}
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
                  defaultValue={postInfor?.title}
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
                  defaultValue={postInfor?.description}
                  onChange={(e) => handleOnChange(e)}
                ></textarea>
                <p className="validate-form-text">{validatePost.description}</p>
              </div>
              <div className="row">
                <div className="form-outline mb-3 col-sm-6 col-xs-12">
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
                    value={postInfor?.public_status || 0}
                  >
                    <option value={1}>Công khai</option>
                    <option value={0}>Riêng tư</option>
                  </select>
                  <p className="validate-form-text">
                    {validatePost.public_status}
                  </p>
                </div>
                <div className="form-outline mb-3 col-sm-6 col-xs-12">
                  <label className="form-label" htmlFor="is-sold-product">
                    Tình trạng sản phẩm
                  </label>
                  <select
                    className="form-select"
                    aria-label="Disabled select example"
                    required
                    name="sold"
                    id="is-sold-product"
                    onChange={(e) => handleOnChange(e)}
                    placeholder="Tình trạng sản phẩm"
                    value={postInfor?.sold || 0}
                  >
                    <option value={1}>Đã bán</option>
                    <option value={0}>Chưa bán</option>
                  </select>
                </div>
              </div>
            </form>
            {/* ----------------------------------------------------------------------- */}
            {/* <div className="mb-3 mt-4">
              <h4>Bạn muốn đổi sang sản phẩm khác</h4>
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
                Đổi sản phẩm
              </label>
            </div>
            {isTrade && (
              <>
                <div className="mb-3">
                  <h3>Thông tin sản phẩm muốn đổi</h3>
                </div>
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="post-trade-category">
                    Loại sản phẩm
                  </label>
                  <select
                    className="form-select"
                    aria-label="Disabled select example"
                    required
                    id="post-trade-category"
                    name="category"
                    onChange={(e) => handleOnChangeTrade(e)}
                    placeholder="Loại sản phẩm"
                    value={postTradeInfor?.category_id}
                  >
                    {categoryData &&
                      categoryData.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.value}
                        </option>
                      ))}
                  </select>
                  <p className="validate-form-text">
                    {validatePost.category_idTrade}
                  </p>
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
                    <label className="form-label" htmlFor="post-trade-name">
                      Tên sản phẩm&nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="post-trade-name"
                      className={
                        validatePost.nameTrade
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder="Tên sản phẩm"
                      name="name"
                      defaultValue={postTradeInfor?.name}
                      onChange={(e) => handleOnChangeTrade(e)}
                    />
                    <p className="validate-form-text">
                      {validatePost.nameTrade}
                    </p>
                  </div>
                  <div className="mb-3 mt-4">
                    <h4>Tiêu đề và mô tả</h4>
                  </div>
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="post-trade-title">
                      Tiêu đề&nbsp;<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="post-trade-title"
                      className={
                        validatePost?.titleTrade
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      name="title"
                      placeholder="Tiêu đề"
                      defaultValue={postTradeInfor?.title}
                      onChange={(e) => handleOnChangeTrade(e)}
                    />
                    <p className="validate-form-text">
                      {validatePost.titleTrade}
                    </p>
                  </div>
                  <div className="form-outline  mb-3">
                    <label
                      className="form-label"
                      htmlFor="post-trade-guarantee"
                    >
                      Bảo hành
                    </label>
                    <input
                      type="number"
                      id="post-trade-guarantee"
                      className="form-control"
                      placeholder="Thời gian bảo hành"
                      min={0}
                      defaultValue={postTradeInfor?.guarantee}
                      name="guarantee"
                      onChange={(e) => handleOnChangeTrade(e)}
                    />
                  </div>
                  <div className="form-outline mb-3">
                    <label
                      className="form-label"
                      htmlFor="post-trade-description"
                    >
                      Mô tả chi tiết&nbsp;
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea
                      className={
                        validatePost?.descriptionTrade
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      id="post-trade-description"
                      rows="4"
                      placeholder="Mô tả chi tiết
                  - Sản phẩm như thế nào
                  - Chất lượng ra sao
                  - Nhu cầu cụ thể như thế nào"
                      name="description"
                      defaultValue={postTradeInfor?.description}
                      onChange={(e) => handleOnChangeTrade(e)}
                    ></textarea>
                    <p className="validate-form-text">
                      {validatePost?.descriptionTrade}
                    </p>
                  </div>
                </form>
              </>
            )} */}
            <div className="row mb-3">
              <div className="col">
                <button
                  type="button"
                  className="btn btn-primary btn-block btn-preview"
                  onClick={(e) => (window.location.href = "/profile")}
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
                  Cập nhật
                </button>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
