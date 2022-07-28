import { MY_LIST_CHAT } from "../case";

const initialState = {
  myListChat: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_LIST_CHAT:
      return {
        ...state,
        myListChat: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
