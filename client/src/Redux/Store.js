import rootReducer from "./Reducers";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default Store;