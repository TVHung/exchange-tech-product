import {
  ALL_POST,
  LIST_COMPARE,
  MY_POSTS,
  MY_PRODUCT_COMMENTS,
  PRODUCT_COMMENTS,
  SEARCH_POST_RESULT,
  WISH_LIST,
} from "../case";

const initialState = {
  all_post: [],
  search_result: [],
  wish_list: [],
  my_posts: [],
  commentsOfProduct: [],
  commentsOfMyProduct: [],
  list_compare: localStorage.getItem("array_id_compare") || "",
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_POST:
      return {
        ...state,
        all_post: action.payload,
      };
    case MY_POSTS:
      return {
        ...state,
        my_posts: action.payload,
      };
    case SEARCH_POST_RESULT:
      return {
        ...state,
        search_result: action.payload,
      };
    case WISH_LIST:
      return {
        ...state,
        wish_list: action.payload,
      };
    case PRODUCT_COMMENTS:
      return {
        ...state,
        commentsOfProduct: action.payload,
      };
    case MY_PRODUCT_COMMENTS:
      return {
        ...state,
        commentsOfMyProduct: action.payload,
      };
    case LIST_COMPARE:
      return {
        ...state,
        list_compare: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
