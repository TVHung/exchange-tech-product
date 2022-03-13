import { ALL_POST, SEARCH_POST_RESULT } from "../case";

const initialState = {
  all_post: [],
  search_result: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_POST:
      return {
        ...state,
        all_post: action.payload,
      };
    case SEARCH_POST_RESULT:
      return {
        ...state,
        search_result: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
