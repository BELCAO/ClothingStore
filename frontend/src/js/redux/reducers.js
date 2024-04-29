import { SAVE_TOKEN , DELETE_TOKEN } from "./actions";

const initialStare = {
    token: null,
};

const rootReducer = (state = initialStare, action) => {
    switch (action.type) {
        case SAVE_TOKEN:
            return {
                token: action.payload,
            }
        case DELETE_TOKEN:
            return {
                token: null,
            }
        default:
            return state;
    }
}
export default rootReducer;