import { ALL_POST } from "../case";

const initialState = {
  all_post: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_POST:
      return {
        ...state,
        all_post: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
