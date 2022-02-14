import axios from "axios";
import { apiGetAllPost } from "../../constants";
import { ALL_POST } from "./../case";
import { headers } from "./../../constants";

export const fetchAllPost = () => async (dispatch) => {
  try {
    await axios.get(apiGetAllPost).then((res) => {
      const posts = res.data.data;
      dispatch({ type: ALL_POST, payload: posts });
    });
  } catch (error) {
    dispatch({ type: ALL_POST, payload: null });
    return { statusCode: 500, body: error.toString() };
  }
};
