import { getCookie } from "../utils/cookie";
export const api = "http://127.0.0.1:8000/api";
//api user
export const apiLogin = `${api}/auth/login`;
export const apiRegister = `${api}/auth/register`;
export const apiLogout = `${api}/auth/logout`;
export const apiGetUserProfile = `${api}/auth/user-profile`;
export const apiGetUser = `${api}/users`;

//api post
export const apiPost = `${api}/posts`;
export const apiGetAllPost = `${api}/posts`;
export const apiFetchPostDetail = `${api}/posts`;
export const apiPostMobile = `${api}/post-mobile`;
export const apiPostLaptop = `${api}/post-laptop`;
export const apiPostPc = `${api}/post-pc`;

//api image
export const apiImages = `${api}/post-image`;

//api address
export const apiAddresses = `${api}/addresses`;
export const apiAddress = `https://provinces.open-api.vn/api`;
export const apiCity = `${apiAddress}/?depth=1`; //get all city
export const apiDistrict = `${apiAddress}/p`; //get district by city depth=2
export const apiWard = `${apiAddress}/d`; //get ward by district depth=2

export const headers = {
  "Content-type": "application/json",
  Authorization: `Bearer ${getCookie("access_token")}`,
};
