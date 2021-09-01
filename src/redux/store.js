import { createStore, combineReducers } from "redux";
import { roomReducer } from "./roomReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
    roomId: roomReducer,
    user: userReducer,
});

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;