import { IS_LOGIN, USER_PROFILE, USER } from "../case";

const initialState = {
  isLogin: false,
  user: {},
  userProfile: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
    case USER:
      return {
        ...state,
        user: action.payload,
      };
    case USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
