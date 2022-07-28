import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import brandReducer from "./brandReducer";
import chatReducer from "./chatReducer";

export default combineReducers({
  user: userReducer,
  post: postReducer,
  brand: brandReducer,
  chat: chatReducer,
});
