import { ALL_POST, MY_POSTS, SEARCH_POST_RESULT, WISH_LIST } from "../case";

const initialState = {
  all_post: [],
  search_result: [],
  wish_list: [],
  my_posts: [],
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
    default:
      return state;
  }
};

export default postReducer;