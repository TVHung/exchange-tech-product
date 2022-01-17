import { IS_LOGIN, USER_PROFILE } from "../case";

const initialState = {
  isLogin: false,
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
    case USER_PROFILE:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
