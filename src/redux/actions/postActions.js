import axios from "axios";
import { apiGetAllPost, apiSearch } from "../../constants";
import { ALL_POST, SEARCH_POST_RESULT } from "./../case";
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

export const searchPostByName = (option) => async (dispatch) => {
  const data = {
    key: option,
  };
  try {
    await axios
      .post(`${apiSearch}?${option}`, data, { headers: headers })
      .then((res) => {
        const namePosts = res.data.data;
        console.log(res.data.data);
        dispatch({ type: SEARCH_POST_RESULT, payload: namePosts });
      });
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
