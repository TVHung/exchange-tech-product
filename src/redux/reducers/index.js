import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import brandReducer from "./brandReducer";

export default combineReducers({
  user: userReducer,
  post: postReducer,
  brand: brandReducer,
});
