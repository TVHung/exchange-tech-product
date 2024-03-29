import axios from "axios";
import {
  apiFetchMyPosts,
  apiGetAllPost,
  apiGetCommentMyProduct,
  apiGetCommentProduct,
  apiPost,
  apiSearch,
  apiWishList,
} from "../../constants";
import {
  ALL_POST,
  MY_POSTS,
  PRODUCT_COMMENTS,
  SEARCH_POST_RESULT,
  WISH_LIST,
  LIST_COMPARE,
  MY_PRODUCT_COMMENTS,
} from "./../case";
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
          dispatch({ type: MY_POSTS, payload: myPosts });
        });
    } catch (error) {
      dispatch({ type: MY_POSTS, payload: [] });
      return { statusCode: 500, body: error.toString() };
    }
  };

export const getCommentProduct =
  (productId, pageNumber = 1) =>
  async (dispatch) => {
    try {
      await axios
        .get(`${apiGetCommentProduct}/${productId}?page=${pageNumber}`)
        .then((res) => {
          const productComments = res.data;
          dispatch({ type: PRODUCT_COMMENTS, payload: productComments });
        });
    } catch (error) {
      dispatch({ type: PRODUCT_COMMENTS, payload: [] });
      return { statusCode: 500, body: error.toString() };
    }
  };
export const getCommentMyProduct =
  (pageNumber = 1) =>
  async (dispatch) => {
    try {
      await axios
        .get(`${apiGetCommentMyProduct}?page=${pageNumber}`, {
          headers: headers,
        })
        .then((res) => {
          const productComments = res.data;
          dispatch({ type: MY_PRODUCT_COMMENTS, payload: productComments });
        });
    } catch (error) {
      dispatch({ type: MY_PRODUCT_COMMENTS, payload: [] });
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

export const addWishList = (product_id) => async (dispatch) => {
  const data = {
    product_id: product_id,
  };
  try {
    await axios
      .post(`${apiWishList}`, data, { headers: headers })
      .then((res) => {
        if (res.data.status == 1) toast.success(res.data.message);
        else toast.error(res.data.message);
      })
      .catch((error) => {
        toast.error("Thêm sản phẩm quan tâm không thành công");
        window.location.href = "/login";
      });
  } catch (error) {
    toast.error("Thêm sản phẩm quan tâm không thành công");
    window.location.href = "/login";
    return { statusCode: 500, body: error.toString() };
  }
};

export const setListCompare = (arr_id) => async (dispatch) => {
  dispatch({ type: LIST_COMPARE, payload: arr_id });
};
