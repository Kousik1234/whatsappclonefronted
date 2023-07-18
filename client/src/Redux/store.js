import { authReducer } from "./Auth/Reducer";
import { chatReducer } from "./Chat/Reducer";
import { messageReducer } from "./Message/Reducer";

const { combineReducers, legacy_createStore, applyMiddleware } = require("redux");
const { default: thunk } = require("redux-thunk");

const rootReducer = combineReducers({
    auth:authReducer,
    chat:chatReducer,
    message:messageReducer,
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))