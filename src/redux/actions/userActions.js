import axios from "axios";
import { apiGetUserProfile } from "../../constants";
import { USER_PROFILE, IS_LOGIN } from "./../case";
import { headers } from "./../../constants";

export const fetchUser = () => async (dispatch) => {
  try {
    await axios
      .get(apiGetUserProfile, {
        headers: headers,
      })
      .then((res) => {
        const user = res.data;
        dispatch({ type: USER_PROFILE, payload: user });
        dispatch({ type: IS_LOGIN, payload: true });
      });
  } catch (error) {
    dispatch({ type: USER_PROFILE, payload: null });
    dispatch({ type: IS_LOGIN, payload: false });
    return { statusCode: 500, body: error.toString() };
  }
};
