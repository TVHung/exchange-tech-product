import axios from "axios";
import {
  apiGetAccountProfile,
  apiGetUserProfile,
  apiUserProfile,
} from "../../constants";
import { USER_PROFILE, IS_LOGIN, USER } from "./../case";
import { headers } from "./../../constants";
import { toast } from "react-toastify";

export const fetchUser = () => async (dispatch) => {
  try {
    await axios
      .get(apiGetUserProfile, {
        headers: headers,
      })
      .then((res) => {
        const user = res.data;
        dispatch({ type: USER, payload: user });
        dispatch({ type: IS_LOGIN, payload: true });
      });
  } catch (error) {
    dispatch({ type: USER, payload: null });
    dispatch({ type: IS_LOGIN, payload: false });
    return { statusCode: 500, body: error.toString() };
  }
};

export const fetchUserProfile = () => async (dispatch) => {
  try {
    await axios
      .get(apiGetAccountProfile, {
        headers: headers,
      })
      .then((res) => {
        const userProfile = res.data.data;
        dispatch({ type: USER_PROFILE, payload: userProfile });
      });
  } catch (error) {
    dispatch({ type: USER_PROFILE, payload: null });
    return { statusCode: 500, body: error.toString() };
  }
};

export const updateUserProfile = (data) => async (dispatch) => {
  console.log("update profile");
  try {
    await axios
      .put(apiUserProfile, data, {
        headers: headers,
      })
      .then((res) => {
        console.log("data cap nhat", res);
        toast.success("Cập nhật thành công");
        dispatch(fetchUserProfile());
      });
  } catch (error) {
    toast.error("Cập nhật thất bại");
    return { statusCode: 500, body: error.toString() };
  }
};
