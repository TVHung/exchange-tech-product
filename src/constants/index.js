import { getCookie } from "../utils/cookie";
export const api = "http://127.0.0.1:8000/api";
//api user
export const apiLogin = `${api}/auth/login`;
export const apiRegister = `${api}/auth/register`;
export const apiLogout = `${api}/auth/logout`;
export const apiGetUserProfile = `${api}/auth/user-profile`;
export const apiGetAccountProfile = `${api}/auth/profile-user`;
export const apiUserProfile = `${api}/profile-user`;
export const apiGetUser = `${api}/users`;
export const apiChangePass = `${api}/auth/change-pass`;

//forgot password
export const apiResetPass = `${api}/reset-password`;

//profile
export const apiProfile = `${api}/profiles`;
export const apiChangeAvatar = `${api}/change-avatar`;

//api product
export const apiPost = `${api}/products`;
export const apiPostRecently = `${api}/products-recently`;
export const apiPostMostInterest = `${api}/products-most-interest`;
export const apiPostHasTrade = `${api}/products-has-trade`;
export const apiGetAllPost = `${api}/products`;
export const apiFetchPostDetail = `${api}/products`;
export const apiFetchPostDetailWithCheck = `${api}/get-product-edit`;
export const apiFetchMyPosts = `${api}/my-products`;
export const apiFetchUserPosts = `${api}/user-products`;
export const apiFetchRecommendPosts = `${api}/recommend-products`;
export const apiWishList = `${api}/wish-list`;
export const apiUpView = `${api}/up-view`;
export const apiProductCompare = `${api}/get-list-compare`;

//api product trade
export const apiPostTrade = `${api}/product-trades`;

//api image
export const apiImages = `${api}/product-image`;
export const apiUpload = `${api}/upload`;
export const apiUploadVideo = `${api}/upload-video`;

//api address
export const apiAddress = `https://provinces.open-api.vn/api`;
export const apiCity = `${apiAddress}/?depth=1`; //get all city
export const apiDistrict = `${apiAddress}/p`; //get district by city depth=2
export const apiWard = `${apiAddress}/d`; //get ward by district depth=2

//brand
export const apiGetBrandByCategory = `${api}/get-by-category`;

//search
export const apiSearch = `${api}/search`;

//google
export const apiGetGoogleUrl = `${api}/get-google-sign-in-url`;
export const apiLoginGoogleCallback = `${api}/callback`;

//chat
export const apiSendMessage = `${api}/send-message`;
export const apiGetMessage = `${api}/all-message`;
export const apiGetMyConversation = `${api}/my-conversations`;
export const apiDeleteConversation = `${api}/delete-conversation`;
export const apiSetIsRead = `${api}/set-is-read-last-message`;

//comment
export const apiAddComment = `${api}/comments`;
export const apiGetCommentProduct = `${api}/comments/products`;
export const apiGetCommentMyProduct = `${api}/comments/my-product-comment`;

//suggest
export const apiGetSuggest = `${api}/products-feild-suggest`;
export const apiGetNameSuggest = `${api}/products-name-suggest`;

export const apiGetCategory = `${api}/categories`;
export const apiGetFixedData = `${api}/fixed-data`;

//matching
export const apiGetProductMatching = `${api}/product-matching`;

export const headers = {
  "Content-type": "application/json",
  Authorization: `Bearer ${getCookie("access_token")}`,
};

export const headerFiles = {
  "Content-Type": "multipart/form-data",
  Authorization: `Bearer ${getCookie("access_token")}`,
};

export const maxNumImage = 6;
export const maxNumImageChat = 3;
export const maxSizeImage = 2097152; //2mb
export const maxSizeVideo = 10485760; //10mb

export const storageData = [
  { value: 8 },
  { value: 16 },
  { value: 32 },
  { value: 64 },
  { value: 128 },
  { value: 256 },
  { value: 512 },
  { value: 1024 },
  { value: 2048 },
];

export const statusData = [
  { id: 1, value: "Mới" },
  { id: 2, value: "Cũ (90-99%)" },
  { id: 3, value: "Cũ (<90%)" },
];
export const typeProductData = [
  { id: 0, value: "Sản phẩm đăng bán" },
  { id: 1, value: "Sản phẩm đăng mua" },
];
export const sexData = [
  { id: 1, value: "Nam" },
  { id: 2, value: "Nữ" },
  { id: 3, value: "Khác" },
];
export const storageTypeData = [
  { id: 1, value: "HDD", type: 1 },
  { id: 2, value: "SSD", type: 2 },
  { id: 3, value: "SSHD", type: 3 },
];
export const commandData = [
  { id: 1, value: "Sử dụng cơ bản" },
  { id: 2, value: "Sử dụng giải trí nhẹ nhàng" },
  { id: 3, value: "Sử dụng để chơi game" },
  { id: 4, value: "Sử dụng để làm các tác vụ nặng" },
];
export const resolutionData = [
  { id: 1, value: "HD (1366x768) pixels" },
  { id: 2, value: "HD+ (1600x900) pixels" },
  { id: 3, value: "FullHD (1920x1080) pixels" },
  { id: 4, value: "2K (2560x1440) pixels" },
  { id: 5, value: "4K (3840x2160) pixels" },
  { id: 6, value: "5K (5120x2880) pixels" },
  { id: 7, value: "6K (6144x3456 pixels)" },
];
export const categoryData = [
  { id: 1, value: "Mobile" },
  { id: 2, value: "Laptop" },
  { id: 3, value: "Pc" },
];
export const videoData = [
  { id: 1, value: "Có video" },
  { id: 0, value: "Không có video" },
];
export const timeData = [
  { id: 0, value: "Mọi thời điểm", type: 0 },
  { id: 1, value: "Hôm nay", type: 1 },
  { id: 2, value: "1 tuần qua", type: 2 },
  { id: 3, value: "1 tháng qua", type: 3 },
];
//filter
export const priceStep = 200000;
export const marksPrice = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 10,
  },
  {
    value: 20,
  },
  {
    value: 30,
  },
  {
    value: 40,
  },
  {
    value: 50,
  },
  {
    value: 60,
  },
  {
    value: 70,
  },
  {
    value: 80,
  },
  {
    value: 90,
  },
  {
    value: 100,
    label: "20tr",
  },
];
export const pinStep = 100;
export const marksPin = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 10,
  },
  {
    value: 20,
  },
  {
    value: 30,
  },
  {
    value: 40,
  },
  {
    value: 50,
  },
  {
    value: 60,
  },
  {
    value: 70,
  },
  {
    value: 80,
  },
  {
    value: 90,
  },
  {
    value: 100,
    label: "10Kmah",
  },
];
export const guaranteeStep = 0.3;
export const marksGuarantee = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 10,
    label: "3",
  },
  {
    value: 20,
    label: "6",
  },
  {
    value: 30,
    label: "9",
  },
  {
    value: 40,
    label: "12",
  },
  {
    value: 50,
    label: "15",
  },
  {
    value: 60,
    label: "18",
  },
  {
    value: 70,
    label: "21",
  },
  {
    value: 80,
    label: "24",
  },
  {
    value: 90,
    label: "27",
  },
  {
    value: 100,
    label: "30",
  },
];
export const ramStep = 8 / 25;
export const marksRam = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 12.5,
    label: "4",
  },
  {
    value: 25,
    label: "8",
  },
  {
    value: 37.5,
    label: "12",
  },
  {
    value: 50,
    label: "16",
  },
  {
    value: 62.5,
    label: "20",
  },
  {
    value: 75,
    label: "32",
  },
  {
    value: 87.5,
    label: "64",
  },
  {
    value: 100,
    label: "128",
  },
];
export const displaySizeData = [
  { id: 1, value: "< 13 inch" },
  { id: 2, value: "13 - 13.9 inch" },
  { id: 3, value: "14 - 14.9 inch" },
  { id: 4, value: "15 - 15.9 inch" },
  { id: 5, value: "> 16 inch" },
];
export const cardData = [
  { id: 1, value: "Có GPU" },
  { id: 0, value: "Không có CPU" },
];
export const marksStorage = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 10,
    label: "",
  },
  {
    value: 20,
    label: "",
  },
  {
    value: 30,
    label: "",
  },
  {
    value: 40,
    label: "",
  },
  {
    value: 50,
    label: "",
  },
  {
    value: 60,
    label: "",
  },
  {
    value: 70,
    label: "",
  },
  {
    value: 80,
    label: "",
  },
  {
    value: 90,
    label: "",
  },
  {
    value: 100,
    label: "4TB",
  },
];
export const marksStorageData = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 10,
    label: "8",
  },
  {
    value: 20,
    label: "16",
  },
  {
    value: 30,
    label: "32",
  },
  {
    value: 40,
    label: "64",
  },
  {
    value: 50,
    label: "128",
  },
  {
    value: 60,
    label: "256",
  },
  {
    value: 70,
    label: "512",
  },
  {
    value: 80,
    label: "1024",
  },
  {
    value: 90,
    label: "2048",
  },
  {
    value: 100,
    label: "4096",
  },
];
