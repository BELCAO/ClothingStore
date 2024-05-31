import {
  SAVE_TOKEN,
  DELETE_TOKEN,
  SAVE_AVATAR_URL,
  DELETE_AVATAR_URL,
  SAVE_USER_NAME,
  DELETE_USER_NAME,
  SAVE_USER_INFO,
  DELETE_USER_INFO,
} from "./actions";

const initialState = {
  token: null,
  avatarUrl: null,
  userName: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case DELETE_TOKEN:
      return {
        ...state,
        token: null,
      };
    case SAVE_AVATAR_URL:
      return {
        ...state,
        avatarUrl: action.payload,
      };
    case DELETE_AVATAR_URL:
      return {
        ...state,
        avatarUrl: null,
      };
    case SAVE_USER_NAME:
      return {
        ...state,
        userName: action.payload,
      };
    case DELETE_USER_NAME:
      return {
        ...state,
        userName: null,
      };
    case SAVE_USER_INFO:
      return {
        ...state,
        userName: action.payload.userName,
        avatarUrl: action.payload.avatarUrl,
      }
    case DELETE_USER_INFO:
      return {
        ...state,
        userName: null,
        avatarUrl: null,
      }
    default:
      return state;
  }
};
export default rootReducer;
