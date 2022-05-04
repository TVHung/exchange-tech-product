import { BRAND_CATEGORY } from "../case";

const initialState = {
  brand_category: [],
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case BRAND_CATEGORY:
      return {
        ...state,
        brand_category: action.payload,
      };
    default:
      return state;
  }
};

export default brandReducer;
