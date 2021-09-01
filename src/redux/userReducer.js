export const userReducer = (state = null, action) => {
    switch (action.type) {
        case "LOG_USER_IN":
            return action.data;
        case "LOG_USER_OUT":
            return null;
        default:
            return state;
    }
}