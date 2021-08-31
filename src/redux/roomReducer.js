export const roomReducer = (state = null, action) => {
    switch (action.type) {
        case "ENTER_ROOM":
            return action.data;
        default:
            return state;
    }
}