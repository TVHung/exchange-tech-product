import axios from "axios";
import {
  apiFetchMyPosts,
  apiGetAllPost,
  apiPost,
  apiSearch,
  apiWishList,
} from "../../constants";
import { ALL_POST, MY_POSTS, SEARCH_POST_RESULT, WISH_LIST } from "./../case";
import { headers } from "./../../constants";
import { toast } from "react-toastify";

export const fetchAllPost = () => async (dispatch) => {
  try {
    await axios
      .get(apiGetAllPost, {
        headers: headers,
      })
      .then((res) => {
        const posts = res.data.data;
        console.log(res.data);
        dispatch({ type: ALL_POST, payload: posts });
      });
  } catch (error) {
    dispatch({ type: ALL_POST, payload: [] });
    return { statusCode: 500, body: error.toString() };
  }
};

export const fetchMyPosts =
  (pageNumber = 1, type = "all") =>
  async (dispatch) => {
    try {
      await axios
        .get(`${apiFetchMyPosts}/?page=${pageNumber}&type=${type}`, {
          headers: headers,
        })
        .then((res) => {
          const myPosts = res.data;
          console.log(res.data);
          dispatch({ type: MY_POSTS, payload: myPosts });
        });
    } catch (error) {
      dispatch({ type: MY_POSTS, payload: [] });
      return { statusCode: 500, body: error.toString() };
    }
  };

export const deleteMyPost = (id) => async (dispatch) => {
  try {
    await axios
      .delete(`${apiPost}/${id}`, { headers: headers })
      .then((res) => {
        toast.success("Xóa bài viết thành công");
        dispatch(fetchMyPosts());
      })
      .catch((error) => {
        toast.error("Xóa bài viết không thành công");
      });
  } catch (error) {
    toast.error("Xóa bài viết không thành công");
    return { statusCode: 500, body: error.toString() };
  }
};

export const searchPostByName =
  (option, pageNumber = 1) =>
  async (dispatch) => {
    const data = {
      key: option,
    };
    try {
      await axios
        .post(`${apiSearch}?page=${pageNumber}&${option}`, data, {
          headers: headers,
        })
        .then((res) => {
          const namePosts = res.data;
          console.log(res.data);
          dispatch({ type: SEARCH_POST_RESULT, payload: namePosts });
        });
    } catch (error) {
      return { statusCode: 500, body: error.toString() };
    }
  };

export const fetchWishList =
  (pageNumber = 1) =>
  async (dispatch) => {
    try {
      await axios
        .get(`${apiWishList}/?page=${pageNumber}`, { headers: headers })
        .then((res) => {
          const wishLists = res.data.data;
          dispatch({ type: WISH_LIST, payload: wishLists });
        });
    } catch (error) {
      return { statusCode: 500, body: error.toString() };
    }
  };

export const deleteWishList = (id) => async (dispatch) => {
  try {
    await axios
      .delete(`${apiWishList}/${id}`, { headers: headers })
      .then((res) => {
        toast.success("Xóa sản phẩm quan tâm thành công");
        dispatch(fetchWishList());
      })
      .catch((error) => {
        toast.error("Xóa sản phẩm quan tâm không thành công");
      });
  } catch (error) {
    toast.error("Xóa sản phẩm quan tâm không thành công");
    return { statusCode: 500, body: error.toString() };
  }
};

export const addWishList = (post_id) => async (dispatch) => {
  const data = {
    post_id: post_id,
  };
  try {
    await axios
      .post(`${apiWishList}`, data, { headers: headers })
      .then((res) => {
        toast.success("Thêm sản phẩm quan tâm thành công");
      })
      .catch((error) => {
        toast.error("Thêm sản phẩm quan tâm không thành công");
      });
  } catch (error) {
    toast.error("Thêm sản phẩm quan tâm không thành công");
    return { statusCode: 500, body: error.toString() };
  }
};
