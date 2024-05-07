import { SAVE_TOKEN , DELETE_TOKEN, SAVE_AVATAR_URL, DELETE_AVATAR_URL } from "./actions";

const initialState = {
    token: null, avatarUrl: null
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_TOKEN:
            return {
                ...state,
                token: action.payload,
            }
        case DELETE_TOKEN:
            return {
                ...state,
                token: null,
            }
        case SAVE_AVATAR_URL:
            return {
                ...state,
                avatarUrl: action.payload,
            }
        case DELETE_AVATAR_URL:
            return {
                ...state,
                avatarUrl: null,
            }
        default:
            return state;
    }
}
export default rootReducer;