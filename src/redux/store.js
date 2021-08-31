import { createStore, combineReducers } from "redux";
import { roomReducer } from "./roomReducer";

const rootReducer = combineReducers({
    roomId: roomReducer,
});

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;