import { MY_LIST_CHAT, NUM_CHAT } from "../case";

const initialState = {
  myListChat: [],
  numChat: localStorage.getItem("numChat"),
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_LIST_CHAT:
      return {
        ...state,
        myListChat: action.payload,
      };
    case NUM_CHAT:
      return {
        ...state,
        numChat: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
